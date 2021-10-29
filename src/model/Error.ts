export class Error {
    type: string | undefined;
    location: string | undefined;
    file: string | undefined;
    message: string;

    constructor() {
        this.message = '';
    }
}