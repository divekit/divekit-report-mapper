import fs from 'fs-extra'
import parser from 'xml2json'

export function wrapWithUnifiedXml(xml: string): string {
    return '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<suites>\n' +
        '\n' +
        xml +
        '\n' +
        '</suites>'
}

export function getJsonFromXmlFile(path: string): any {
    const fileContent = fs.readFileSync(path, 'utf8')
    return JSON.parse(parser.toJson(fileContent))
}
