export class MapperResult {
    source: string
    valid: boolean
    xml: string

    constructor(source: string, xml: string, valid: boolean) {
        this.source = source
        this.xml = xml
        this.valid = valid
    }

    public static mergeResultsToXml(results: MapperResult[]): string {
        let xml = ''

        results.forEach(it => {
            if (it.xml) xml += it.xml
            if (!it.valid) xml += `<testsuiteError>${it.source}</testsuiteError>`
            xml += '\n\n'
        })

        return xml
    }
}
