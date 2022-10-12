import * as fs from 'fs'
import {SUREFIRE_FLAG} from './const/SurefireConstants'
import {PMD_FLAG} from './const/PmdConstants'
import {logger} from './config/Logger'
import {MapperService} from './mappers/MapperService'

export async function main() {
    const args: string[] = process.argv.slice(2) // remove node + script-path arguments

    // add default behavior - for backward compatibility
    if (args.length === 0) args.push(SUREFIRE_FLAG, PMD_FLAG)
    logger.debug('Arguments: ' + args)

    const mapperService = new MapperService()
    const xml = await mapperService.mapToUnifiedXml(args)
    
    if (!fs.existsSync('target')) fs.mkdirSync('target', 0744)
    fs.writeFileSync('target/unified.xml', xml)
}
