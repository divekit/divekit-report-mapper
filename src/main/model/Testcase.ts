import {Error} from './Error'

export class Testcase {
    name: string
    status: string
    hidden: boolean
    error: Error[]
    failure: Error[]
    file: string | undefined
    type: string | undefined
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'system-out': string | undefined

    constructor(name: string = '') {
        this.name = name
        this.status = 'passed'
        this.hidden = false
        this.error = []
        this.failure = []
    }

    transformErrorsToUnspecifiedObjects() {
        const transformedErrors: Error[] = []
        this.error.forEach(err => {
            transformedErrors.push(Error.transformToUnspecifiedObject(err))
        })
        this.error = transformedErrors
    }
}
