import {ReportMapper} from './interface/ReportMapper'
import {SuiteCollection} from '../model/SuiteCollection'
import fs from 'fs-extra'
import parser from 'xml2json'
import {Testsuite} from '../model/Testsuite'
import {Testcase} from '../model/Testcase'
import {Error} from '../model/Error'
import {CLEAN_CODE_PRINCIPLES, STATUS, SUITE_TYPE} from '../const/CoreConstants'
import {CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS} from '../const/CheckstyleConstants'

export class CheckstyleReportMapperImpl implements ReportMapper {
    suites: SuiteCollection
    input: string[]

    constructor() {
        this.suites = new SuiteCollection()
        this.input = []
    }

    name(): string {
        return 'Checkstyle'
    }

    read(filePaths: string[]): void {
        filePaths.forEach(filePath => {
            this.input.push(fs.readFileSync(filePath, 'utf8'))
        })
    }

    mapToUnified(): void {
        this.input.forEach(file => {
            const json = JSON.parse(parser.toJson(file))
            const checkstyle = json.checkstyle

            this.suites.testsuite.push(this.genCleanCodeSuite(checkstyle))
        })
    }

    genCleanCodeSuite(checkstyle: any): Testsuite {
        const testsuite = new Testsuite()
        testsuite.name = 'Clean-Code-Principles by Checkstyle'
        testsuite.type = SUITE_TYPE.CLEAN_CODE

        for (const principle of CLEAN_CODE_PRINCIPLES) {
            const testcase = new Testcase()
            testcase.name = principle

            if (checkstyle.file) {
                if (!checkstyle.file.length) {
                    checkstyle.file = [checkstyle.file]
                }

                checkstyle.file.forEach((file: any) => {
                    const fileName: string = file.name

                    if (file.error) {
                        if (!file.error.length) {
                            file.error = [file.error]
                        }

                        file.error.forEach((error: any) => {
                            // source is for example in format "com.puppycrawl.tools.checkstyle.checks.sizes.MethodLengthCheck"
                            const source = error.source.split('.')[error.source.split('.').length - 1]

                            if (CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS[principle]) {
                                if (CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS[principle].includes(source)) {
                                    testcase.error.push(this.createError(error, source, fileName))
                                    testcase.status = STATUS.FAILED
                                    testsuite.status = STATUS.FAILED
                                }
                            }
                        })
                    }

                })
            }
            testsuite.testcase.push(testcase)
        }
        return testsuite
    }

    createError(error: any, source: string, fileName: string): Error {
        const newError: Error = new Error()
        newError.file = fileName

        let location = ''
        // tslint:disable-next-line:no-unused-expression
        error.line ? location = location.concat('Line: ' + error.line + ' ') : ''
        // tslint:disable-next-line:no-unused-expression
        error.column ? location = location.concat('Column: ' + error.column) : ''

        newError.location = location
        newError.message = error.message

        newError.type = source

        return newError
    }

    getXml(): string {
        return parser.toXml(JSON.stringify(this.suites))
    }

}
