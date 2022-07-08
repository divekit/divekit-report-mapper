import {FilePaths} from '../../main/config/FilePaths'

export class TestFiles implements FilePaths {
    public static readonly RESOURCE_PATH = 'src/test/resources/'

    public static readonly VALID_PMD = TestFiles.RESOURCE_PATH + 'pmd-valid.xml'
    public static readonly VALID_SUREFIRE_PMD_RESULT = TestFiles.RESOURCE_PATH + 'results/unified-valid-surefire-pmd.xml'
    public static readonly INVALID_PATH = 'something-that-doesnt-exist.'
    public static readonly INVALID_XML = TestFiles.RESOURCE_PATH + 'invalid.xml'
    public static readonly EMPTY_XML = TestFiles.RESOURCE_PATH + 'empty.xml'
    public static readonly ALL_SUREFIRE_INPUTS = TestFiles.RESOURCE_PATH + 'surefire/*.xml'

    private static instance: TestFiles

    private checkstyleFile = ''
    private pmdFile = ''
    private surefireFile = ''

    private constructor() {
    }

    public static getInstance(): TestFiles {
        if (!this.instance) TestFiles.instance = new TestFiles()
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
        this.checkstyleFile = TestFiles.RESOURCE_PATH + fileName
    }

    setPmdFile(fileName: string) {
        this.pmdFile = TestFiles.RESOURCE_PATH + fileName
    }

    setSurefireFile(fileName: string) {
        this.surefireFile = TestFiles.RESOURCE_PATH + fileName
    }

    setAllValid(): void {
        this.pmdFile = TestFiles.RESOURCE_PATH + 'pmd-valid.xml'
        this.checkstyleFile = TestFiles.RESOURCE_PATH + 'checkstyle.xml'
        this.surefireFile = TestFiles.RESOURCE_PATH + 'surefire/*.xml'
    }
}
