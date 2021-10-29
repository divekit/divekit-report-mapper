import {Error} from './Error';

export class Testcase {
    name: string;
    status: string;
    hidden: boolean;
    error: Error[];

    constructor() {
        this.name = '';
        this.status = 'passed';
        this.hidden = false;
        this.error = [];
    }
}