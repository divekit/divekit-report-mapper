/* tslint:disable */
import {expect} from 'chai'
import {PMDReportMapperImpl} from '../main/mappers/PMDReportMapperImpl'
import {getMapperResult} from '../main/mappers/interface/ReportMapper'

describe('PMD Mapper - Integration Test', () => { // the tests container
    it('with valid input', async () => { // the single test
        const result = await getMapperResult(new PMDReportMapperImpl(), 'target/pmd.xml')

        // TODO add basic asserts/expects

        expect(false).to.be.false // Do I need to explain anything? It's like writing in English!
        expect(30).to.equal(30) // As I said 3 lines above
        expect([]).to.be.empty // emitters property is an array and for this test must be empty, this syntax works with strings too
        expect(result).to.be.an('object')
        // expect('nope').to.be.an('object').to.have.property('value').to.equal('#fff')
        // this is a little more complex, but still really clear
    })
})
