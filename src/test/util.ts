export const RESOURCE_PATH = 'src/test/resources/'

export function wrapWithUnifiedXml(xml: string): string {
    return '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<suites>\n' +
        '\n' +
        xml +
        '\n' +
        '</suites>'
}
