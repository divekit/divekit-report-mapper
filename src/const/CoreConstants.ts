export const STATUS = {
    FAILED: 'failed',
    PASSED: 'passed'
}

export const SUITE_TYPE = {
    JUNIT: 'JUnit',
    CLEAN_CODE: 'CleanCode'
}

export const CLEAN_CODE_PRINCIPLE = {
    KISS: 'Keep it simple, stupid',
    LA: 'Principle of Least Astonishment',
//    IH: 'Information Hiding Principle',
//    DRY: 'Don\'t repeat yourself',
//    SLA: 'Single Level of Abstraction',
//    YAGNI: 'You ain\'t gonna need it',
    NAMES: 'Meaningful names',
//    COMMENTS: 'Comments only where necessary',
//    TESTS: 'Test Design'
}

export const SOLID_PRINCIPLE = {
    SRP: 'Single Responsibility Principle',
    OCP: 'Open Closed Principle',
//    LS: 'Liskovsches Substitution Principle',
//    ISP: 'Interface Segregation Principle',
//    DIP: 'Dependency Inversion Principle'
}

// export const CleanCodePrinciples = [CLEAN_CODE_PRINCIPLE.KISS, CLEAN_CODE_PRINCIPLE.LA, CLEAN_CODE_PRINCIPLE.IH,
//   CLEAN_CODE_PRINCIPLE.DRY, CLEAN_CODE_PRINCIPLE.SLA, CLEAN_CODE_PRINCIPLE.YAGNI, CLEAN_CODE_PRINCIPLE.NAMES,
//   CLEAN_CODE_PRINCIPLE.COMMENTS, CLEAN_CODE_PRINCIPLE.TESTS, SOLID_PRINCIPLE.SRP];
export const CLEAN_CODE_PRINCIPLES = [
    CLEAN_CODE_PRINCIPLE.KISS,
    CLEAN_CODE_PRINCIPLE.LA,
    CLEAN_CODE_PRINCIPLE.NAMES,
    SOLID_PRINCIPLE.SRP,
    SOLID_PRINCIPLE.OCP
]

