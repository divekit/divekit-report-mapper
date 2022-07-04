import {FilePaths} from '../../main/config/FilePaths'
import {RESOURCE_PATH} from '../util'

export class TestFileConfig implements FilePaths {
    private static instance: TestFileConfig

    private checkstyleFile = ''
    private pmdFile = ''
    private surefireFile = ''

    private constructor() {
    }

    public static getInstance(): TestFileConfig {
        if (!this.instance) TestFileConfig.instance = new TestFileConfig()
        return this.instance
    }

    checkstyle(): string {
        return this.checkstyleFile
    }

    pmd(): string {
        return this.pmdFile
    }

    surefire(): string {
        return this.surefireFile
    }


    setCheckstyleFile(fileName: string) {
        this.checkstyleFile = RESOURCE_PATH + fileName
    }

    setPmdFile(fileName: string) {
        this.pmdFile = RESOURCE_PATH + fileName
    }

    setSurefireFile(fileName: string) {
        this.surefireFile = RESOURCE_PATH + fileName
    }

    setAllValid(): void {
        this.pmdFile = RESOURCE_PATH + 'pmd-valid.xml'
        this.checkstyleFile = RESOURCE_PATH + 'checkstyle.xml'
        this.surefireFile = RESOURCE_PATH + 'surefire/*.xml'
    }
}
