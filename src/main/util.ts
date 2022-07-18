import parser from 'xml2json'
import {logger} from './config/Logger'

export function ensureArray(object: any | any[]): any[] {
    if (!object.length) return [object]
    return object
}

/**
 * Try to parse the content of a given file to json.
 * @param path path to a json file
 * @return parsed json or undefined if an exception is thrown while parsing
 */
export function parseJsonFile(path: string): any | undefined {
    let json
    try {
        json = JSON.parse(parser.toJson(path))
    } catch (e) {
        logger.error('Could NOT parse ' + path)
    }
    return json
}
