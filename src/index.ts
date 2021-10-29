import globModule from 'glob'
import * as util from "util";
import {SurefireReportMapperImpl} from "./mappers/SurefireReportMapperImpl";
import * as fs from "fs";
import {CheckstyleReportMapperImpl} from "./mappers/CheckstyleReportMapperImpl";
import {PMDReportMapperImpl} from "./mappers/PMDReportMapperImpl";
const glob = util.promisify(globModule);

export async function mapToUnifiedXml() {
    let xml: string = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<suites>\n\n'

    await glob('target/surefire-reports/*.xml').then(files => {
        let surefireReportMapperImpl = new SurefireReportMapperImpl();

        surefireReportMapperImpl.read(files);
        surefireReportMapperImpl.mapToUnified();

        xml += surefireReportMapperImpl.getXml();
        xml += '\n\n';
    });

    await glob('target/checkstyle-result.xml').then(files => {

        let checkstyleReportMapperImpl = new CheckstyleReportMapperImpl();
        checkstyleReportMapperImpl.read(files);

        checkstyleReportMapperImpl.mapToUnified();
        xml += checkstyleReportMapperImpl.getXml();

        xml += '\n\n';
    });

    await glob('target/pmd.xml').then(files => {

        let pmdReportMapperImpl = new PMDReportMapperImpl();
        pmdReportMapperImpl.read(files);

        pmdReportMapperImpl.mapToUnified();
        xml += pmdReportMapperImpl.getXml();

        xml += '\n\n';
    });

    xml += '</suites>';

    fs.writeFileSync('target/unified.xml', xml);
}