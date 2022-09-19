import {FilePaths, ProdFilePaths} from '../config/FilePaths'
import {MapperResult} from '../model/MapperResult'
import {SUREFIRE_FLAG} from '../const/SurefireConstants'
import {ReportMapper} from './interface/ReportMapper'
import {SurefireReportMapper} from './SurefireReportMapper'
import {CHECKSTYLE_FLAG} from '../const/CheckstyleConstants'
import {CheckstyleReportMapper} from './CheckstyleReportMapper'
import {PMD_FLAG} from '../const/PmdConstants'
import {PMDReportMapper} from './PMDReportMapper'
import globModule from 'glob'
import util from 'util'

export class MapperService {
    private glob = util.promisify(globModule)

    /**
     * read all files and combine all results into one xml-string
     */
    public async mapToUnifiedXml(componentFlags: string[], filePaths: FilePaths = ProdFilePaths.getInstance()): Promise<string> {
        const results: MapperResult[] = []

        if (componentFlags.includes(SUREFIRE_FLAG))
            results.push(await this.getMapperResult(new SurefireReportMapper(), filePaths.surefire()))
        if (componentFlags.includes(CHECKSTYLE_FLAG))
            results.push(await this.getMapperResult(new CheckstyleReportMapper(), filePaths.checkstyle()))
        if (componentFlags.includes(PMD_FLAG))
            results.push(await this.getMapperResult(new PMDReportMapper(), filePaths.pmd()))

        let xml = ''
        xml += '<?xml version="1.0" encoding="UTF-8"?>\n'
        xml += '<suites>\n\n'
        xml += MapperResult.mergeResultsToXml(results)
        xml += '</suites>'

        return xml
    }

    public async getMapperResult(mapper: ReportMapper, path: string): Promise<MapperResult> {
        let xml: string | undefined

        await this.glob(path).then(files => {
            xml = ''
            mapper.read(files)
            mapper.mapToUnified()
            xml += mapper.getXml()
        })

        if (!xml)
            return new MapperResult(mapper.name(), '', false)
        return new MapperResult(mapper.name(), xml, true)
    }
}
