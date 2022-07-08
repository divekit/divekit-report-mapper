import {Testcase} from './Testcase'
import {STATUS} from '../const/CoreConstants'

export class Testsuite {
    name: string
    status: string
    testcase: Testcase[]
    type: string

    constructor(name: string = '', type: string = '', status: string = STATUS.PASSED, testcase: Testcase[] = []) {
        this.name = name
        this.status = status
        this.testcase = testcase
        this.type = type
    }
}
