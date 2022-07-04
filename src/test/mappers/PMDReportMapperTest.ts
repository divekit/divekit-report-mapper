/* tslint:disable */
import {expect} from 'chai'
import {PMDReportMapperImpl} from '../../main/mappers/PMDReportMapperImpl'
import {getMapperResult} from '../../main/mappers/interface/ReportMapper'
import {RESOURCE_PATH} from '../util'
import parser from 'xml2json'
import {Testcase} from '../../main/model/Testcase'

describe('PMD Report Mapper Tests', () => {
    it('with valid input', async () => {
        const result = await getMapperResult(new PMDReportMapperImpl(),  RESOURCE_PATH + 'pmd-valid.xml')

        expect(result).to.be.an('object')
        expect(result.valid).to.be.true
        expect(result.xml).not.to.be.empty
        expect(result.source).not.to.be.empty
        expect(result.source).to.equal('PMD')

        const json = JSON.parse(parser.toJson(result.xml))
        const testsuite = json.testsuite

        expect(testsuite).to.be.an('object')
        expect(testsuite).to.have.property('name')
        expect(testsuite).to.have.property('status')
        expect(testsuite).to.have.property('type')
        expect(testsuite).to.have.property('testcase')
        expect(testsuite).not.to.be.empty

        expect(testsuite.testcase.length, 'array length not matching').to.equal(5)
        expect(testsuite.testcase.find((testcase: Testcase) => testcase.status === 'passed') !== undefined).to.be.true

        const testcaseWithError: Testcase | undefined = testsuite.testcase.find((testcase: Testcase) => testcase.status === 'failed')
        expect(testcaseWithError !== undefined).to.be.true
        expect(testcaseWithError?.error).to.have.property('type').to.equal('LocalVariableNamingConventions')
        expect(testcaseWithError?.error).to.have.property('location').to.equal('Line: 90 - 90 Column: 13 - 22')
        expect(testcaseWithError?.error).to.have.property('file').to.not.be.empty
        expect(testcaseWithError?.error).to.have.property('message').to.not.be.empty
    })

    it('with invalid input (file does not exist)', async () => {
        const result = await getMapperResult(new PMDReportMapperImpl(),  RESOURCE_PATH + 'not-a-valid-name.xml')

        expect(result).to.be.an('object')
        expect(result.valid).to.be.false
        expect(result.xml).to.be.empty
        expect(result.source).not.to.be.empty
        expect(result.source).to.equal('PMD')
    })

    it('with invalid input (empty file)', async () => {
        const result = await getMapperResult(new PMDReportMapperImpl(),  RESOURCE_PATH + 'empty.xml')

        expect(result).to.be.an('object')
        expect(result.valid, 'mapper result should not be valid').to.be.false
        expect(result.xml).to.be.empty
        expect(result.source).not.to.be.empty
        expect(result.source).to.equal('PMD')
    })

    it('with invalid input (corrupt xml)', async () => {
        const result = await getMapperResult(new PMDReportMapperImpl(),  RESOURCE_PATH + 'invalid.xml')

        expect(result).to.be.an('object')
        expect(result.valid, 'mapper result should not be valid').to.be.false
        expect(result.xml).to.be.empty
        expect(result.source).not.to.be.empty
        expect(result.source).to.equal('PMD')
    })
})
