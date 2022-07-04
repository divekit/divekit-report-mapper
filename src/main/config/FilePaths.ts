export interface FilePaths {
    checkstyle(): string

    surefire(): string

    pmd(): string
}

export class ProdFilePaths implements FilePaths {
    private static instance: ProdFilePaths

    private constructor() {
    }

    public static getInstance(): ProdFilePaths {
        if (!this.instance) ProdFilePaths.instance = new ProdFilePaths()
        return this.instance
    }

    checkstyle(): string {
        return 'target/checkstyle-result.xml'
    }

    surefire(): string {
        return 'target/surefire-reports/*.xml'
    }

    pmd(): string {
        return 'target/pmd.xml'
    }
}
