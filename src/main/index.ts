import {SurefireReportMapperImpl} from './mappers/SurefireReportMapperImpl'
import * as fs from 'fs'
import {CheckstyleReportMapperImpl} from './mappers/CheckstyleReportMapperImpl'
import {PMDReportMapperImpl} from './mappers/PMDReportMapperImpl'
import {MapperResult} from './model/MapperResult'
import {getMapperResult} from './mappers/interface/ReportMapper'
import {SUREFIRE_FLAG} from './const/SurefireConstants'
import {PMD_FLAG} from './const/PmdConstants'
import {CHECKSTYLE_FLAG} from './const/CheckstyleConstants'
import {FilePaths, ProdFilePaths} from './config/FilePaths'
import {logger} from './config/Logger'


export async function main() {
    const args: string[] = process.argv.slice(2) // remove node + script-path arguments

    // add default behavior - for backward compatibility
    if (args.length === 0) args.push(SUREFIRE_FLAG, PMD_FLAG)
    logger.debug('Arguments: ' + args)

    const xml = await mapToUnifiedXml(args)
    fs.writeFileSync('target/unified.xml', xml)
}

export async function mapToUnifiedXml(componentFlags: string[], filePaths: FilePaths = ProdFilePaths.getInstance()): Promise<string> {
    const results: MapperResult[] = []

    if (componentFlags.includes(SUREFIRE_FLAG))
        results.push(await getMapperResult(new SurefireReportMapperImpl(), filePaths.surefire()))
    if (componentFlags.includes(CHECKSTYLE_FLAG))
        results.push(await getMapperResult(new CheckstyleReportMapperImpl(), filePaths.checkstyle()))
    if (componentFlags.includes(PMD_FLAG))
        results.push(await getMapperResult(new PMDReportMapperImpl(), filePaths.pmd()))

    let xml = ''
    xml += '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<suites>\n\n'
    xml += MapperResult.mergeResultsToXml(results)
    xml += '</suites>'

    return xml
}

// TODO Refactor notes
//  Testsuite -> Testcase(s) plural!
//  tslinting errors
//  move to eslint?
