import {CLEAN_CODE_PRINCIPLES_PMD_RULES} from '../const/PMDConstants'
import fs from 'fs'
import {parseXMLToJson} from '../util'
import {logger} from './Logger'

export class PMDPrinciples {
    private static instance: PMDPrinciples
    private static pmdFilePath = 'pmd-ruleset.xml'
    private codePrinciples: string[] = []
    private codePrinciplesPMDRules: { [key: string]: string[] } = {}
    private configuredPMDRules: string[] = []


    constructor() {
        this.loadConfig()
    }

    public static getInstance(): PMDPrinciples {
        if (!this.instance) PMDPrinciples.instance = new PMDPrinciples()
        return this.instance
    }

    public getCleanCodePrinciples(): string[] {
        return this.codePrinciples
    }

    public getCleanCodePrinciplesPmdRules(): { [key: string]: string[] } {
        return this.codePrinciplesPMDRules
    }

    private loadConfig() {
        this.configuredPMDRules = this.loadConfiguredPMDRules()

        // get all code-rules according to configured pmd rules
        for (const key of Object.keys(CLEAN_CODE_PRINCIPLES_PMD_RULES)) {
            const rules = CLEAN_CODE_PRINCIPLES_PMD_RULES[key]
            this.configuredPMDRules.forEach((rule: string) => {
                if (rules.includes(rule)) this.codePrinciplesPMDRules[key] = rules
            })
        }

        for (const key of Object.keys(this.codePrinciplesPMDRules)) {
            this.codePrinciples.push(key)
        }
    }

    private loadConfiguredPMDRules(): string[] {
        const content = fs.readFileSync(PMDPrinciples.pmdFilePath, 'utf8')
        const json = parseXMLToJson(content)
        if (!json) logger.error('Could NOT parse PMD-Ruleset')

        const rulePaths = json.ruleset.rule.map((it: any) => it.ref)
        return rulePaths.map((it: string) => {
            const split = it.split('/')
            return split[split.length - 1]
        })
    }
}
