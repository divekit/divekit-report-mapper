import fs from 'fs-extra'
import parser from 'xml2json'
import {SuiteCollection} from '../model/SuiteCollection'
import {ReportMapper} from './interface/ReportMapper'
import {STATUS, SUITE_TYPE} from '../const/CoreConstants'
import {ensureArray, parseJsonFile} from '../util'

export class SurefireReportMapper implements ReportMapper {
    suites: SuiteCollection = new SuiteCollection()
    input: string[] = []
    private errorOccurred = false

    // CDataTag --> XML Tag which escapes all characters in it
    private static wrapWithCDataTag(text: string): string {
        return '<![CDATA[' + text + ']]>'
    }

    name(): string {
        return 'Surefire'
    }

    read(filePaths: string[]): void {
        filePaths.forEach(filePath => {
            this.input.push(fs.readFileSync(filePath, 'utf8'))
        })
    }

    getXml(): string {
        if (this.errorOccurred) return ''
        return parser.toXml(JSON.stringify(this.suites))
    }

    mapToUnified(): void {
        this.input.forEach(file => {
            const json = parseJsonFile(file)
            if (!json || !json.testsuite) {
                this.errorOccurred = true
                return
            }

            const testsuite = this.updateTestsuite(json.testsuite)
            this.suites.testsuite.push(testsuite)
        })
    }

    private updateTestsuite(testsuite: any): any {
        testsuite.type = SUITE_TYPE.JUNIT
        delete testsuite.properties

        const nameSplit = testsuite.name.split('.')
        testsuite.name = nameSplit[nameSplit.length - 1]
        testsuite.testcase = ensureArray(testsuite.testcase)

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
            this.updateTestcase(testcase)
        })

        return testsuite
    }

    private updateTestcase(testcase: any) {
        if (testcase.error) {
            testcase.error = ensureArray(testcase.error)
            testcase.error.forEach((error: any) => {
                error.message = encodeURI(error.message)
                error.$t = SurefireReportMapper.wrapWithCDataTag(error.$t)
            })
        }
        else if (testcase.failure) {
            testcase.failure = ensureArray(testcase.failure)
            testcase.failure.forEach((failure: any) => {
                failure.message = encodeURI(failure.message)
                failure.$t = SurefireReportMapper.wrapWithCDataTag(failure.$t)
            })
        }
        delete testcase['system-out'] // delete complete log output
    }
}
