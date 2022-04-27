export class Error {
    type: string | undefined;
    location: string | undefined;
    file: string | undefined;
    message: string;
    $t: string; // XML Body, includes message and more 

    constructor() {
        this.message = '';
        this.$t = '';
    }

    /**
     * directly JSON.stringify [Error]-Objects transform into the following JSON-Struktur
     *  ```
     *  error: [
     *      Error {
     *        type: 'string',
     *        location: 'string',
     *        file: 'string',
     *        message: 'string',
     *        '$t': 'string'
     *      }
     *  ]
     *  ```
     * Wich is not parsed correctly into xml. The [Error]-Class-type should not be specified.
     *
     * WARNING: This implementation is very likely not ideal.
     */
    static transformToUnspecifiedObject(error: Error): any {
        return {
            type: error.type,
            location: error.location,
            file: error.file,
            message: error.message,
            $t: error.$t,
        }
    }
}