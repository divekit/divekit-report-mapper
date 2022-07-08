import {ReportMapper} from './interface/ReportMapper'
import {SuiteCollection} from '../model/SuiteCollection'
import fs from 'fs-extra'
import {Testsuite} from '../model/Testsuite'
import {Testcase} from '../model/Testcase'
import parser from 'xml2json'
import {Error} from '../model/Error'
import {CLEAN_CODE_PRINCIPLES, STATUS, SUITE_TYPE} from '../const/CoreConstants'
import {CLEAN_CODE_PRINCIPLES_PMD_RULES} from '../const/PmdConstants'
import {logger} from '../config/Logger'
import {ensureArray} from '../util'

const xmlEscape = require('xml-escape')

export class PMDReportMapper implements ReportMapper {
    suites: SuiteCollection
    input: any[]

    constructor() {
        this.suites = new SuiteCollection()
        this.input = []
    }

    /**
     * TODO filter principles according to current ruleset
     */
    private static filteredPrinciples(): string[] {
        return CLEAN_CODE_PRINCIPLES
    }

    // TODO filter principles according to current ruleset
    private static filteredPMDPrinciples(): { [key: string]: string[] } {
        return CLEAN_CODE_PRINCIPLES_PMD_RULES
    }

    public name(): string {
        return 'PMD'
    }

    /**
     * read the content of all given files. <br>
     * SHOULD be executed before mapToUnified
     */
    public read(filePaths: string[]): void {
        logger.debug('parsing PMD inputs. File count: ' + filePaths.length)
        filePaths.forEach(filePath => {
            this.input.push(fs.readFileSync(filePath, 'utf8'))
        })
    }

    /**
     * map all inputs to a SuiteCollection
     */
    public mapToUnified(): void {
        this.input.forEach(file => {
            let pmd
            try {
                const json = JSON.parse(parser.toJson(file))
                pmd = json.pmd // TODO define model?
            } catch (e) {
                console.log('Error while parsing pmd.xml: ' + e)
                return
            }

            if (!pmd) {
                logger.warn('could not parse pmd-file. PMD not valid.')
                return
            }

            this.suites.testsuite.push(this.generateTestsuite(pmd))
        })
    }

    /**
     * Generate a Testsuite according to the pmd json results
     */
    private generateTestsuite(pmdResults: any): Testsuite {
        const testsuite = new Testsuite('Clean-Code-Principles by PMD', SUITE_TYPE.CLEAN_CODE)

        if (pmdResults.error) {
            testsuite.testcase.push(this.handleParsingError(pmdResults.error))
            testsuite.status = STATUS.FAILED
            return testsuite
        }

        for (const principle of PMDReportMapper.filteredPrinciples()) {
            const testcase = this.generateTestcase(principle, pmdResults)

            if (testcase.status === STATUS.FAILED) testsuite.status = STATUS.FAILED

            testcase.transformErrorsToUnspecifiedObjects()
            testsuite.testcase.push(testcase)
        }

        return testsuite
    }

    private generateTestcase(principle: string, pmd: any): Testcase {
        const testcase = new Testcase(principle)

        // no errors --> passed testcase
        if (!pmd.file) return testcase

        pmd.file = ensureArray(pmd.file)
        pmd.file.forEach((file: any) => {
            const fileName: string = file.name

            if (file.violation) {
                const errors = this.createErrorList(ensureArray(file.violation), principle, fileName)
                if (errors.length) testcase.status = STATUS.FAILED
                testcase.error.push(...errors) // pushAll
            }
        })

        return testcase
    }

    private createErrorList(list: any[], principle: string, fileName: string): Error[] {
        const errors: Error[] = []
        list.forEach((violation: any) => {
            const rule = violation.rule // in format e.g. "LongVariable"
            const pmdPrinciples = PMDReportMapper.filteredPMDPrinciples()[principle]

            if (pmdPrinciples && pmdPrinciples.includes(rule)) {
                errors.push(this.createError(violation, rule, fileName))
            }
        })
        return errors
    }

    private handleParsingError(error: any): Testcase {
        const testcase = new Testcase('PMD Parsing Errors')
        testcase.error.push(this.createParsingError(error))
        testcase.status = STATUS.FAILED

        return testcase
    }

    private createParsingError(error: any): Error {
        const parsingError: Error = new Error()
        parsingError.file = error.filename
        parsingError.message = 'Consider removing all vowels and non ASCII characters from your project \n\n\n' + error.msg

        return parsingError
    }

    private createError(error: any, source: string, fileName: string): Error {
        const newError: Error = new Error()

        let location = ''
        location = error.beginline ? location.concat('Line: ' + error.beginline + ' - ' + error.endline + ' ') : ''
        location = error.begincolumn ? location.concat('Column: ' + error.begincolumn) + ' - ' + error.endcolumn : ''

        newError.file = fileName
        newError.location = location
        newError.message = xmlEscape(error.$t)
        newError.type = source

        return newError
    }

    getXml(): string {
        return parser.toXml(JSON.stringify(this.suites))
    }
}
