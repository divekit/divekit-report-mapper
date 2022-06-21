import fs from 'fs-extra'
import parser from 'xml2json'
import {SuiteCollection} from '../model/SuiteCollection'
import {ReportMapper} from './interface/ReportMapper'
import {STATUS, SUITE_TYPE} from '../const/CoreConstants'

export class SurefireReportMapperImpl implements ReportMapper {
    suites: SuiteCollection = new SuiteCollection()
    input: string[] = []

    name(): string {
        return 'Surefire'
    }

    read(filePaths: string[]): void {
        filePaths.forEach(filePath => {
            this.input.push(fs.readFileSync(filePath, 'utf8'))
        })
    }

    getXml(): string {
        return parser.toXml(JSON.stringify(this.suites))
    }

    mapToUnified(): void {
        this.input.forEach(file => {
            const json = JSON.parse(parser.toJson(file))
            const testsuite = json.testsuite

            if (json.testsuite) {
                testsuite.type = SUITE_TYPE.JUNIT
                delete testsuite.properties

                const nameSplit = testsuite.name.split('.')
                testsuite.name = nameSplit[nameSplit.length - 1]

                if (!testsuite.testcase.length) {
                    testsuite.testcase = [testsuite.testcase]
                }

                // tslint:disable-next-line:radix
                testsuite.status = parseInt(testsuite.failures) || parseInt(testsuite.errors) > 0 ? STATUS.FAILED : STATUS.PASSED
                testsuite.tests = undefined
                testsuite.skipped = undefined
                testsuite.errors = undefined
                testsuite.time = undefined

                testsuite.testcase.map((testcase: any) => {
                    testcase.status = testcase.failure || testcase.error ? STATUS.FAILED : STATUS.PASSED
                    testcase.hidden = testcase.name.toLowerCase().includes('hidden')
                    testcase.classname = undefined
                    testcase.time = undefined
                })

                testsuite.testcase.forEach((testcase: any) => {
                    if (testcase.error) {
                        if (!testcase.error.length) {
                            testcase.error = [testcase.error]
                        }

                        testcase.error.forEach((error: any) => {
                            error.message = encodeURI(error.message)
                            error.$t = this.wrapWithCDataTag(error.$t)
                        })
                    }
                    if (testcase.failure) {
                        if (!testcase.failure.length) {
                            testcase.failure = [testcase.failure]
                        }

                        testcase.failure.forEach((failure: any) => {
                            failure.message = encodeURI(failure.message)
                            failure.$t = this.wrapWithCDataTag(failure.$t)
                        })
                    }
                    delete testcase['system-out'] // delete complete stack trace
                })
                this.suites.testsuite.push(testsuite)
            }
        })
    }

    wrapWithCDataTag(text: string): string {
        return '<![CDATA[' + text + ']]>'
    }
}
