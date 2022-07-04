/* tslint:disable */
import {expect} from 'chai'
import {TestFileConfig} from './config/TestFilePaths'
import {SUREFIRE_FLAG} from '../main/const/SurefireConstants'
import {PMD_FLAG} from '../main/const/PMDConstants'
import {mapToUnifiedXml} from '../main'
import parser from 'xml2json'
import {Testsuite} from '../main/model/Testsuite'


describe('Integration Tests', () => {
    const config = TestFileConfig.getInstance()

    it('surefire+pmd with valid files', async () => {
        config.setAllValid()
        const xmlResult = await mapToUnifiedXml([SUREFIRE_FLAG, PMD_FLAG], config)

        // read result
        const result = JSON.parse(parser.toJson(xmlResult))

        // should be suites/testsuite[]/testcase[] ...
        expect(result).to.be.an('object')
        expect(result.suites).to.be.an('object')
        expect(result.suites.testsuite).to.be.an('array')
        expect(result.suites.testsuite.length, 'should contain testsuites but is empty').to.be.equal(4)

        const suites: Testsuite[] = result.suites.testsuite
        const suiteNames = suites.map(suite => suite.name)
        // should contain: E1BasicTests, E1BasicTests, E2CleanCodeSolidManualTest, Clean-Code-Principles by PMD
        expect(suiteNames.includes('E1BasicTests'), 'should contain E1BasicTests testsuite').to.be.true // exists 2-times
        expect(suiteNames.includes('E2CleanCodeSolidManualTest'), 'should contain E2CleanCodeSolidManualTest testsuite').to.be.true
        expect(suiteNames.includes('Clean-Code-Principles by PMD'), 'should contain Clean-Code-Principles by PMD testsuite').to.be.true
    })

    it('surefire+pmd with invalid pmd', async () => {
        config.setAllValid()
    })

    it('surefire+pmd with invalid surefire', async () => {
        config.setAllValid()
    })

    it('surefire+pmd with both invalid', async () => {
        config.setAllValid()
    })

    it('component flag test...', async () => {
        config.setAllValid()
    })
})
