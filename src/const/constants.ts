export const SUREFIRE_FLAG = 'surefire'
export const CHECKSTYLE_FLAG = 'checkstyle'
export const PMD_FLAG = 'pmd'

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

//export const CleanCodePrinciples = [CLEAN_CODE_PRINCIPLE.KISS, CLEAN_CODE_PRINCIPLE.LA, CLEAN_CODE_PRINCIPLE.IH,
//    CLEAN_CODE_PRINCIPLE.DRY, CLEAN_CODE_PRINCIPLE.SLA, CLEAN_CODE_PRINCIPLE.YAGNI, CLEAN_CODE_PRINCIPLE.NAMES, CLEAN_CODE_PRINCIPLE.COMMENTS,
//    CLEAN_CODE_PRINCIPLE.TESTS, SOLID_PRINCIPLE.SRP];
export const CleanCodePrinciples = [
    CLEAN_CODE_PRINCIPLE.KISS, CLEAN_CODE_PRINCIPLE.LA, CLEAN_CODE_PRINCIPLE.NAMES, SOLID_PRINCIPLE.SRP, SOLID_PRINCIPLE.OCP];
    

//Checkstyle Checks

export const CHECKSTYLE_KISS_CHECKS = ['LineLengthCheck', 'NestedForDepthCheck', 'NestedIfDepthCheck',
    'NestedTryDepthCheck', 'InnerAssignmentCheck', 'JavaNCSSCheck', 'AnonInnerLengthCheck', 'ExecutableStatementCountCheck',
    'FileLengthCheck', 'LambdaBodyLengthCheck', 'ParameterNumberCheck', 'ClassDataAbstractionCouplingCheck',
    'CyclomaticComplexityCheck'];

export const CHECKSTYLE_NAME_CHECKS = ['MethodNameCheck', 'MethodTypeParameterNameCheck', 'LocalVariableName',
    'CatchParameterNameCheck', 'ConstantNameCheck', 'LambdaParameterNameCheck', 'LocalFinalVariableName',
    'LocalVariableName', 'MemberNameCheck', 'MethodNameCheck', 'PackageNameCheck', 'ParameterNameCheck',
    'StaticVariableName', 'TypeNameCheck'];

export const CHECKSTYLE_COMMENT_CHECKS = ['InvalidJavadocPositionCheck', 'JavadocBlockTagLocationCheck', 'JavadocMissingLeadingAsteriskCheck',
    'JavadocMissingLeadingAsteriskCheck', 'JavadocStyleCheck', 'JavadocTypeCheck', 'MissingJavadocMethodCheck', 'SummaryJavadocCheck',
    'MissingJavadocTypeCheck', 'TrailingCommentCheck'];

export const CHECKSTYLE_YAGNI_CHECKS = ['EmptyBlockCheck', 'UnusedImports'];

export const CHECKSTYLE_LEAST_ASTONISHMENT_CHECKS = [];

export const CHECKSTYLE_INFORMATION_HIDING_CHECKS = [];

export const CHECKSTYLE_DRY_CHECKS = [];

export const CHECKSTYLE_SLA_CHECKS = [];

export const CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS: {[key: string]: string[]} = {};

CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS[CLEAN_CODE_PRINCIPLE.KISS] = CHECKSTYLE_KISS_CHECKS;
CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS[CLEAN_CODE_PRINCIPLE.LA] = CHECKSTYLE_LEAST_ASTONISHMENT_CHECKS;
//CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS[CLEAN_CODE_PRINCIPLE.IH] = CHECKSTYLE_INFORMATION_HIDING_CHECKS;
//CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS[CLEAN_CODE_PRINCIPLE.DRY] = CHECKSTYLE_DRY_CHECKS;
//CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS[CLEAN_CODE_PRINCIPLE.SLA] = CHECKSTYLE_SLA_CHECKS;
//CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS[CLEAN_CODE_PRINCIPLE.YAGNI] = CHECKSTYLE_YAGNI_CHECKS;
CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS[CLEAN_CODE_PRINCIPLE.NAMES] = CHECKSTYLE_NAME_CHECKS;
//CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS[CLEAN_CODE_PRINCIPLE.COMMENTS] = CHECKSTYLE_COMMENT_CHECKS;

//PMD Rules

export const PMD_KISS_RULES = ['ForLoopVariableCount', 'ForLoopCanBeForeach', 'SimplifiableTestAssertion', 'WhileLoopWithLiteralBoolean',
    'ForLoopShouldBeWhileLoop', 'UnnecessaryLocalBeforeReturn', 'UseShortArrayInitializer', 'AvoidDeeplyNestedIfStmts', 'AvoidRethrowingException',
    'CognitiveComplexity', 'CollapsibleIfStatements', 'CyclomaticComplexity', 'ExcessiveParameterList', 'LogicInversion', 'NcssCount',
    'NPathComplexity', 'SimplifyBooleanExpressions', 'TooFewBranchesForASwitchStatement'];

export const PMD_NAME_RULES = ['AvoidDollarSigns', 'ClassNamingConventions', 'FieldNamingConventions', 'FormalParameterNamingConventions',
    'GenericsNaming', 'LinguisticNaming', 'LocalVariableNamingConventions', 'LongVariable', 'MethodNamingConventions', 'ShortMethodName',
    'ShortVariable'];

export const PMD_YAGNI_RULES = ['UnusedAssignment', 'UnusedFormalParameter', 'UnnecessaryImport', 'UnusedLocalVariable',
    'UnusedPrivateField', 'UnusedPrivateMethod'];

export const PMD_LEAST_ASTONISHMENT_RULES = ['AbstractClassWithoutAbstractMethod', 'ArrayIsStoredDirectly', 'AvoidReassigningCatchVariables',
    'AvoidReassigningLoopVariables', 'CheckResultSet', 'ConstantsInInterface', 'DefaultLabelNotLastInSwitchStmt', 'LiteralsFirstInComparisons',
    'LooseCoupling', 'MethodReturnsInternalArray', 'OneDeclarationPerLine', 'SwitchStmtsShouldHaveDefault', 'UseCollectionIsEmpty',
    'AvoidProtectedFieldInFinalClass', 'AvoidProtectedMethodInFinalClassNotExtending', 'FieldDeclarationsShouldBeAtStartOfClass',
    'LocalVariableCouldBeFinal', 'MethodArgumentCouldBeFinal', 'AbstractClassWithoutAnyMethod', 'SingularField', 'AvoidLiteralsInIfCondition',
    'AvoidThrowingRawExceptionTypes', 'AvoidThrowingNewInstanceOfSameException', 'AvoidThrowingNullPointerException', 'AvoidReassigningParameters'];

export const PMD_INFORMATION_HIDING_RULES = [];

export const PMD_DRY_RULES = ['IdenticalCatchBranches'];

export const PMD_SINGLE_LEVEL_OF_ABSTRACTION_RULES = ['SwitchDensity'];

export const PMD_COMMENT_RULES = [];

export const PMD_TEST_RULES = ['JUnitAssertionsShouldIncludeMessage', 'JUnitTestContainsTooManyAsserts', 'JUnitTestsShouldIncludeAssert'];

export const PMD_OCP_RULES = ['ExcessivePublicCount'];

export const PMD_SRP_RULES = ['GodClass', 'TooManyFields', 'TooManyMethods'];

export const CLEAN_CODE_PRINCIPLES_PMD_RULES: {[key:string]: string[]} = {};

CLEAN_CODE_PRINCIPLES_PMD_RULES[CLEAN_CODE_PRINCIPLE.KISS] = PMD_KISS_RULES;
CLEAN_CODE_PRINCIPLES_PMD_RULES[CLEAN_CODE_PRINCIPLE.LA] = PMD_LEAST_ASTONISHMENT_RULES;
// CLEAN_CODE_PRINCIPLES_PMD_RULES[CLEAN_CODE_PRINCIPLE.IH] = PMD_INFORMATION_HIDING_RULES;
// CLEAN_CODE_PRINCIPLES_PMD_RULES[CLEAN_CODE_PRINCIPLE.DRY] = PMD_DRY_RULES;
// CLEAN_CODE_PRINCIPLES_PMD_RULES[CLEAN_CODE_PRINCIPLE.SLA] = PMD_SINGLE_LEVEL_OF_ABSTRACTION_RULES;
// CLEAN_CODE_PRINCIPLES_PMD_RULES[CLEAN_CODE_PRINCIPLE.YAGNI] = PMD_YAGNI_RULES;
CLEAN_CODE_PRINCIPLES_PMD_RULES[SOLID_PRINCIPLE.OCP] = PMD_OCP_RULES;
CLEAN_CODE_PRINCIPLES_PMD_RULES[SOLID_PRINCIPLE.SRP] = PMD_SRP_RULES;
CLEAN_CODE_PRINCIPLES_PMD_RULES[CLEAN_CODE_PRINCIPLE.NAMES] = PMD_NAME_RULES;
// CLEAN_CODE_PRINCIPLES_PMD_RULES[CLEAN_CODE_PRINCIPLE.COMMENTS] = PMD_COMMENT_RULES;
// CLEAN_CODE_PRINCIPLES_PMD_RULES[CLEAN_CODE_PRINCIPLE.TESTS] = PMD_TEST_RULES;
