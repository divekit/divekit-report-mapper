import {expect} from 'chai'
import {TestFiles} from '../config/TestFilePaths'
import {SUREFIRE_FLAG} from '../../main/const/SurefireConstants'
import {PMD_FLAG} from '../../main/const/PMDConstants'
import parser from 'xml2json'
import {Testsuite} from '../../main/model/Testsuite'
import fs from 'fs'
import {MapperService} from '../../main/mappers/MapperService'


describe('Integration Tests', () => {
    const config = TestFiles.getInstance()
    const mapperService = new MapperService()

    it('surefire+pmd with valid files (complete file)', async () => {
        config.setAllValid()
        const xmlResult = await mapperService.mapToUnifiedXml([SUREFIRE_FLAG, PMD_FLAG], config)
        const fileContent = fs.readFileSync(TestFiles.VALID_SUREFIRE_PMD_RESULT, 'utf8')

        // ignore line separators
        const updatedResult = xmlResult.replaceAll("\n", "").replaceAll("\r", "")
        const updatedContent = fileContent.replaceAll("\n", "").replaceAll("\r", "")

        expect(updatedResult, 'Blackbox test.').to.be.equal(updatedContent)
    })

    it('surefire+pmd with valid files', async () => {
        config.setAllValid()
        const xmlResult = await mapperService.mapToUnifiedXml([SUREFIRE_FLAG, PMD_FLAG], config)

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
        expect(suiteNames.includes('E1BasicTests'), 'should contain E1BasicTests testsuite').to.be.true
        expect(suiteNames.includes('E1AdvancedTests'), 'should contain E1AdvancedTests testsuite').to.be.true
        expect(suiteNames.includes('E2CleanCodeSolidManualTest'), 'should contain E2CleanCodeSolidManualTest testsuite').to.be.true
        expect(suiteNames.includes('Clean-Code-Principles by PMD'), 'should contain Clean-Code-Principles by PMD testsuite').to.be.true
    })

    it('surefire+pmd with invalid pmd', async () => {
        config.setAllValid()
        config.setPmdFile('invalid.xml')

        const xmlResult = await mapperService.mapToUnifiedXml([SUREFIRE_FLAG, PMD_FLAG], config)
        // read result
        const result = JSON.parse(parser.toJson(xmlResult))
        expect(result).to.be.an('object')
        expect(result.suites).to.be.an('object')
        expect(result.suites.testsuiteError).to.be.an('string')
        expect(result.suites.testsuite).to.be.an('array')

        // validate surefire results
        const suites: Testsuite[] = result.suites.testsuite
        const suiteNames = suites.map(suite => suite.name)
        expect(result.suites.testsuite.length, 'should contain testsuites but is empty').to.be.equal(3)
        expect(suiteNames.includes('E1BasicTests'), 'should contain E1BasicTests testsuite').to.be.true // exists 2-times
        expect(suiteNames.includes('E2CleanCodeSolidManualTest'), 'should contain E2CleanCodeSolidManualTest testsuite').to.be.true

        // validate pmd error
        const errors = result.suites.testsuiteError
        expect(errors.includes('PMD'), 'should contain pmd error').to.be.true
    })

    it('surefire+pmd with invalid surefire', async () => {
        config.setAllValid()
        config.setSurefireFile('invalid.xml')

        const xmlResult = await mapperService.mapToUnifiedXml([SUREFIRE_FLAG, PMD_FLAG], config)

        // read result
        const result = JSON.parse(parser.toJson(xmlResult))
        expect(result).to.be.an('object')
        expect(result.suites).to.be.an('object')
        expect(result.suites.testsuite).to.be.an('object', 'should only contain one testsuite')
        expect(result.suites.testsuiteError).to.be.an('string')

        // validate PMD result
        expect(result.suites.testsuite.name).to.equal('Clean-Code-Principles by PMD')

        // validate suite errors
        const error: string = result.suites.testsuiteError
        expect(error.includes('Surefire'), 'should contain surefire error').to.be.true
    })

    it('surefire+pmd with both invalid', async () => {
        config.setSurefireFile('invalid.xml')
        config.setPmdFile('invalid.xml')

        const xmlResult = await mapperService.mapToUnifiedXml([SUREFIRE_FLAG, PMD_FLAG], config)

        // read result
        const result = JSON.parse(parser.toJson(xmlResult))
        console.log(result)
        expect(result).to.be.an('object')
        expect(result.suites).to.be.an('object')
        expect(result.suites.testsuiteError).to.be.an('array')

        // no valid results
        expect(result.suites.testsuite).to.equal(undefined)

        // validate suite errors
        const errors: string[] = result.suites.testsuiteError
        expect(errors.length, 'should contain two errors').to.equal(2)
        expect(errors.includes('PMD'), 'should contain pmd error').to.be.true
        expect(errors.includes('Surefire'), 'should contain surefire error').to.be.true
    })
})


describe('Component Flags', () => {
    const config = TestFiles.getInstance()
    const mapperService = new MapperService()

    it('only PMD', async () => {
        config.setAllValid()
        const xmlResult = await mapperService.mapToUnifiedXml([PMD_FLAG], config)

        // read result
        const result = JSON.parse(parser.toJson(xmlResult))

        // should be suites/testsuite[]/testcase[] ...
        expect(result).to.be.an('object')
        expect(result.suites).to.be.an('object')
        expect(result.suites.testsuite).to.be.an('object')


        expect(result.suites.testsuite.name, 'should only contain PMD testsuite').to.equal('Clean-Code-Principles by PMD')
    })

    it('only Surefire', async () => {
        config.setAllValid()
        const xmlResult = await mapperService.mapToUnifiedXml([SUREFIRE_FLAG], config)

        // read result
        const result = JSON.parse(parser.toJson(xmlResult))


        // should be suites/testsuite[]/testcase[] ...
        expect(result).to.be.an('object')
        expect(result.suites).to.be.an('object')
        expect(result.suites.testsuite, 'should contain exactly one testsuite').to.be.an('array')

        const suites: Testsuite[] = result.suites.testsuite
        const suiteNames = suites.map(suite => suite.name)
        expect(suiteNames.includes('Clean-Code-Principles by PMD'), 'should NOT contain PMD testsuite').to.be.false
    })
})
