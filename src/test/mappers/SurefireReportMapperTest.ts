/* tslint:disable */
import {getMapperResult} from '../../main/mappers/interface/ReportMapper'
import {RESOURCE_PATH, wrapWithUnifiedXml} from '../util'
import {expect} from 'chai'
import {SurefireReportMapperImpl} from '../../main/mappers/SurefireReportMapperImpl'
import {MapperResult} from '../../main/model/MapperResult'
import parser from 'xml2json'
import {Testsuite} from '../../main/model/Testsuite'

function expectInValidSurefireMapperResult(result: MapperResult) {
    expect(result).to.be.an('object')
    expect(result.valid, 'mapper result should not be valid').to.be.false
    expect(result.xml).to.be.empty
    expect(result.source).not.to.be.empty
    expect(result.source).to.equal('Surefire')
}

describe('Surefire Report Mapper Tests', () => {
    it('with valid input', async () => {
        const result = await getMapperResult(new SurefireReportMapperImpl(), RESOURCE_PATH + 'surefire/*.xml')

        // validate MapperResult
        expect(result).to.be.an('object')
        expect(result.valid).to.be.true
        expect(result.xml).not.to.be.empty
        expect(result.source).not.to.be.empty
        expect(result.source).to.equal('Surefire')

        // validate json
        const xml = wrapWithUnifiedXml(result.xml)
        const json = JSON.parse(parser.toJson(xml))
        expect(json.suites.testsuite).to.be.an('array')

        // validate testsuites
        const testsuites: Testsuite[] = json.suites.testsuite
        const basic = testsuites.find(suite => suite.name === 'E1BasicTests')
        const advanced = testsuites.find(suite => suite.name === 'E1AdvancedTests')
        const manual = testsuites.find(suite => suite.name === 'E2CleanCodeSolidManualTest')
        expect(testsuites.length, 'Testsuite count').to.equal(3)
        expect(basic, 'Must contain E1BasicTests').to.not.be.undefined
        expect(advanced, 'Must contain E1AdvancedTests').to.not.be.undefined
        expect(manual, 'Must contain E2CleanCodeSolidManualTest').to.not.be.undefined

        // validate BasicTests (1 error / 3 failures)
        expect(basic?.testcase.length).equal(4)
        let failureCount = 0
        let errorCount = 0
        basic?.testcase.forEach(testcase => {
            if (testcase.failure !== undefined) failureCount++
            if (testcase.error !== undefined) errorCount++
        })
        expect(failureCount, 'Should contain two failures').to.equal(3)
        expect(errorCount, 'Should contain two errors').to.equal(1)

        const noDoubleCollectTest = basic?.testcase.find(testcase => testcase.name === 'testNoDoubleCollect')
        expect(noDoubleCollectTest?.failure).to.be.undefined
        expect(noDoubleCollectTest?.error).to.not.be.undefined
        // @ts-ignore // error is an object not an array
        expect(noDoubleCollectTest?.error['type']).to.equal('java.lang.IndexOutOfBoundsException')

        // validate Advanced
        expect(advanced?.testcase.length).to.equal(4)
        advanced?.testcase.forEach(testcase => {
            expect(testcase.error).not.to.be.undefined
        })

        // validate manual
        console.log(manual?.testcase)
        // @ts-ignore // error is an object not an array
        expect(manual?.testcase.error.$t).to.include('break pipeline')
    })


    it('with invalid input (file does not exist)', async () => {
        const result = await getMapperResult(new SurefireReportMapperImpl(), RESOURCE_PATH + 'no-valid-name.xml')
        expectInValidSurefireMapperResult(result)
    })

    it('with invalid input (empty file)', async () => {
        const result = await getMapperResult(new SurefireReportMapperImpl(), RESOURCE_PATH + 'empty.xml')
        expectInValidSurefireMapperResult(result)
    })

    it('with invalid input (corrupt xml)', async () => {
        const result = await getMapperResult(new SurefireReportMapperImpl(), RESOURCE_PATH + 'invalid.xml')
        expectInValidSurefireMapperResult(result)
    })
})
