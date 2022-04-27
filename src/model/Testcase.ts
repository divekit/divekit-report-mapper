import {Error} from './Error';

export class Testcase {
    name: string;
    status: string;
    hidden: boolean;
    error: Error[];
    failure: Error[];
    file: string | undefined;
    type: string | undefined;
    'system-out': string | undefined;

    constructor() {
        this.name = '';
        this.status = 'passed';
        this.hidden = false;
        this.error = [];
        this.failure = [];
    }
}