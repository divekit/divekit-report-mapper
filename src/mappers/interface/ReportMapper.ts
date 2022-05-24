import {SuiteCollection} from "../../model/SuiteCollection";
import {MapperResult} from "../../model/MapperResult";
import util from "util";
import globModule from "glob";

const glob = util.promisify(globModule);

export interface ReportMapper {
    suites: SuiteCollection;
    input: any[];

    name(): string;

    read(filePaths: string[]): void;

    mapToUnified(): void;

    getXml(): string;
}

export async function getMapperResult(mapper: ReportMapper, path: string): Promise<MapperResult> {
    let xml: string | undefined = undefined;

    await glob(path).then(files => {
        xml = '';
        mapper.read(files);
        mapper.mapToUnified();
        xml += mapper.getXml();
    });

    if (!xml)
        return new MapperResult(mapper.name(), '', false)
    return new MapperResult(mapper.name(), xml, true);
}