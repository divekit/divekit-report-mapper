import {SuiteCollection} from "../../model/SuiteCollection";

export interface ReportMapper {
    suites: SuiteCollection;
    input: any[];

    read(filePaths: string[]): void;

    mapToUnified(): void;

    getXml(): string;
}