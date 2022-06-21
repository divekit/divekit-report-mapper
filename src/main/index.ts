import {SurefireReportMapperImpl} from './mappers/SurefireReportMapperImpl'
import * as fs from 'fs'
import {CheckstyleReportMapperImpl} from './mappers/CheckstyleReportMapperImpl'
import {PMDReportMapperImpl} from './mappers/PMDReportMapperImpl'
import {MapperResult} from './model/MapperResult'
import {getMapperResult} from './mappers/interface/ReportMapper'
import {SUREFIRE_FLAG} from './const/SurefireConstants'
import {PMD_FLAG} from './const/PmdConstants'
import {CHECKSTYLE_FLAG} from './const/CheckstyleConstants'


export async function mapToUnifiedXml() {
    const args: string[] = process.argv.slice(2) // remove node + script-path arguments
    // add default behavior - for backward compatibility
    if (args.length === 0) args.push(SUREFIRE_FLAG, PMD_FLAG)

    const results: MapperResult[] = []

    if (args.includes(SUREFIRE_FLAG))
        results.push(await getMapperResult(new SurefireReportMapperImpl(), 'target/surefire-reports/*.xml'))
    if (args.includes(CHECKSTYLE_FLAG))
        results.push(await getMapperResult(new CheckstyleReportMapperImpl(), 'target/checkstyle-result.xml'))
    if (args.includes(PMD_FLAG))
        results.push(await getMapperResult(new PMDReportMapperImpl(), 'target/pmd.xml'))

    let xml = ''
    xml += '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<suites>\n\n'
    xml += MapperResult.mergeResultsToXml(results)
    xml += '</suites>'

    fs.writeFileSync('target/unified.xml', xml)
}
