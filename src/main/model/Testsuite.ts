import {Testcase} from './Testcase'

export class Testsuite {
    name: string
    status: string
    testcase: Testcase[]
    type: string

    constructor() {
        this.name = ''
        this.status = 'passed'
        this.testcase = []
        this.type = ''
    }
}
