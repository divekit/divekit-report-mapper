import parser from 'xml2json'
import {logger} from './config/Logger'

export const ensureArray = (object: any | any[]): any[] => {
    if (!object.length) return [object]
    return object
}

/**
 * Try to parse a xml-string to json.
 * @param xml path to json
 * @return parsed json or undefined if an exception is thrown while parsing
 */
export const parseXMLToJson = (xml: string): any | undefined => {
    let json
    try {
        json = JSON.parse(parser.toJson(xml))
    } catch (e) {
        logger.error('Could NOT parse ' + xml)
    }
    return json
}
