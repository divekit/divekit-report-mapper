import {ReportMapper} from "./interface/ReportMapper";
import {SuiteCollection} from "../model/SuiteCollection";
import fs from "fs-extra";
import {Testsuite} from "../model/Testsuite";
import {
    CLEAN_CODE_PRINCIPLES_PMD_RULES,
    CleanCodePrinciples,
    STATUS, SUITE_TYPE
} from "../const/constants";
import {Testcase} from "../model/Testcase";
import parser from "xml2json";
import {Error} from "../model/Error";
var xmlescape = require('xml-escape');

export class PMDReportMapperImpl implements ReportMapper{
    suites: SuiteCollection;
    input: any[];

    constructor() {
        this.suites = new SuiteCollection();
        this.input = [];
    }

    read(filePaths: string[]): void {
        filePaths.forEach(filePath => {
            this.input.push(fs.readFileSync(filePath, 'utf8'));
        });
    }

    mapToUnified(): void {
        this.input.forEach(file => {
            let json = JSON.parse(parser.toJson(file));
            let pmd = json.pmd;

            this.suites.testsuite.push(this.genCleanCodeSuite(pmd));
        });
    }

    genCleanCodeSuite(pmd: any): Testsuite {
        let testsuite = new Testsuite();
        testsuite.name = 'Clean-Code-Principles by PMD';
        testsuite.type = SUITE_TYPE.CLEAN_CODE;

        if(pmd.error) {
            testsuite.testcase.push(this.handleParsingError(testsuite, pmd.error));
            testsuite.status = STATUS.FAILED;
        } else {
            for (let principle of CleanCodePrinciples) {
                let testcase = this.genTestCase(principle, pmd);

                testcase.status === STATUS.FAILED ? testsuite.status = STATUS.FAILED : '';
                testsuite.testcase.push(testcase);
            }
        }

        return testsuite;
    }

    genTestCase(principle: string, pmd: any): Testcase {
        let testcase = new Testcase();
        testcase.name = principle;

        if (pmd.file) {
            if (!pmd.file.length) {
                pmd.file = [pmd.file];
            }

            pmd.file.forEach((file: any) => {
                let fileName: string = file.name;

                if (file.violation) {
                    if (!file.violation.length) {
                        file.violation = [file.violation];
                    }

                    file.violation.forEach((violation: any) => {
                        // in format e.g. "LongVariable"
                        let rule = violation.rule;

                        if(CLEAN_CODE_PRINCIPLES_PMD_RULES[principle]) {
                            if(CLEAN_CODE_PRINCIPLES_PMD_RULES[principle].includes(rule)) {
                                testcase.error.push(this.createError(violation, rule, fileName));
                                testcase.status = STATUS.FAILED;
                            }
                        }
                    });
                }
            });
        }
        return testcase;
    }

    handleParsingError(testsuite: Testsuite, error: any): Testcase {
        let testcase = new Testcase();
        testcase.name = 'PMD Parsing Errors';
        testcase.error.push(this.createParsingError(error));
        testcase.status = STATUS.FAILED;

        return testcase;
    }

    createParsingError(error: any): Error {
        let parsingError: Error = new Error();
        parsingError.file = error.filename;
        parsingError.message = 'Consider removing all vowels and non ASCII characters from your project \n\n\n' + error.msg;

        return parsingError;
    }

    createError(error: any, source: string, fileName: string): Error {
        let newError: Error = new Error();
        newError.file = fileName;

        let location: string = '';

        error.beginline ? location = location.concat('Line: ' + error.beginline + ' - ' + error.endline + ' ') : '';
        error.begincolumn ? location = location.concat('Column: ' + error.begincolumn) + ' - ' + error.endcolumn : '';

        newError.location = location;
        // $t is the text content of the xml element
        newError.message = xmlescape(error['$t']);

        newError.type = source;

        return newError;
    }

    getXml(): string {
        return parser.toXml(JSON.stringify(this.suites));
    }

}