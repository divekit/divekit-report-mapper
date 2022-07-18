import {CLEAN_CODE_PRINCIPLE, SOLID_PRINCIPLE} from './CoreConstants'

export const PMD_FLAG = 'pmd'


// PMD Rules
export const PMD_KISS_RULES = ['ForLoopVariableCount', 'ForLoopCanBeForeach', 'SimplifiableTestAssertion', 'WhileLoopWithLiteralBoolean',
    'ForLoopShouldBeWhileLoop', 'UnnecessaryLocalBeforeReturn', 'UseShortArrayInitializer', 'AvoidDeeplyNestedIfStmts', 'AvoidRethrowingException',
    'CognitiveComplexity', 'CollapsibleIfStatements', 'CyclomaticComplexity', 'ExcessiveParameterList', 'LogicInversion', 'NcssCount',
    'NPathComplexity', 'SimplifyBooleanExpressions', 'TooFewBranchesForASwitchStatement']
export const PMD_NAME_RULES = ['AvoidDollarSigns', 'ClassNamingConventions', 'FieldNamingConventions', 'FormalParameterNamingConventions',
    'GenericsNaming', 'LinguisticNaming', 'LocalVariableNamingConventions', 'LongVariable', 'MethodNamingConventions', 'ShortMethodName',
    'ShortVariable']
export const PMD_YAGNI_RULES = ['UnusedAssignment', 'UnusedFormalParameter', 'UnnecessaryImport', 'UnusedLocalVariable',
    'UnusedPrivateField', 'UnusedPrivateMethod']

export const PMD_LEAST_ASTONISHMENT_RULES = ['AbstractClassWithoutAbstractMethod', 'ArrayIsStoredDirectly',
    'AvoidReassigningCatchVariables', 'AvoidReassigningLoopVariables', 'CheckResultSet', 'ConstantsInInterface',
    'DefaultLabelNotLastInSwitchStmt', 'LiteralsFirstInComparisons', 'LooseCoupling', 'MethodReturnsInternalArray', 'OneDeclarationPerLine',
    'SwitchStmtsShouldHaveDefault', 'UseCollectionIsEmpty', 'AvoidProtectedFieldInFinalClass',
    'AvoidProtectedMethodInFinalClassNotExtending', 'FieldDeclarationsShouldBeAtStartOfClass', 'LocalVariableCouldBeFinal',
    'MethodArgumentCouldBeFinal', 'AbstractClassWithoutAnyMethod', 'SingularField', 'AvoidLiteralsInIfCondition',
    'AvoidThrowingRawExceptionTypes', 'AvoidThrowingNewInstanceOfSameException', 'AvoidThrowingNullPointerException',
    'AvoidReassigningParameters']

export const PMD_INFORMATION_HIDING_RULES = []

export const PMD_DRY_RULES = ['IdenticalCatchBranches']
export const PMD_SINGLE_LEVEL_OF_ABSTRACTION_RULES = ['SwitchDensity']

export const PMD_COMMENT_RULES = []

export const PMD_TEST_RULES = ['JUnitAssertionsShouldIncludeMessage', 'JUnitTestContainsTooManyAsserts', 'JUnitTestsShouldIncludeAssert']

export const PMD_OCP_RULES = ['ExcessivePublicCount']

export const PMD_SRP_RULES = ['GodClass', 'TooManyFields', 'TooManyMethods']

export const PMD_RULES = [
    PMD_KISS_RULES,
    PMD_NAME_RULES,
    PMD_YAGNI_RULES,
    PMD_LEAST_ASTONISHMENT_RULES,
    PMD_INFORMATION_HIDING_RULES,
    PMD_DRY_RULES,
    PMD_SINGLE_LEVEL_OF_ABSTRACTION_RULES,
    PMD_COMMENT_RULES,
    PMD_TEST_RULES,
    PMD_OCP_RULES,
    PMD_SRP_RULES
]

export const CLEAN_CODE_PRINCIPLES_PMD_RULES: { [key: string]: string[] } = {}

CLEAN_CODE_PRINCIPLES_PMD_RULES[CLEAN_CODE_PRINCIPLE.KISS] = PMD_KISS_RULES
CLEAN_CODE_PRINCIPLES_PMD_RULES[CLEAN_CODE_PRINCIPLE.LA] = PMD_LEAST_ASTONISHMENT_RULES
CLEAN_CODE_PRINCIPLES_PMD_RULES[CLEAN_CODE_PRINCIPLE.IH] = PMD_INFORMATION_HIDING_RULES
CLEAN_CODE_PRINCIPLES_PMD_RULES[CLEAN_CODE_PRINCIPLE.DRY] = PMD_DRY_RULES
CLEAN_CODE_PRINCIPLES_PMD_RULES[CLEAN_CODE_PRINCIPLE.SLA] = PMD_SINGLE_LEVEL_OF_ABSTRACTION_RULES
CLEAN_CODE_PRINCIPLES_PMD_RULES[CLEAN_CODE_PRINCIPLE.YAGNI] = PMD_YAGNI_RULES
CLEAN_CODE_PRINCIPLES_PMD_RULES[SOLID_PRINCIPLE.OCP] = PMD_OCP_RULES
CLEAN_CODE_PRINCIPLES_PMD_RULES[SOLID_PRINCIPLE.SRP] = PMD_SRP_RULES
CLEAN_CODE_PRINCIPLES_PMD_RULES[CLEAN_CODE_PRINCIPLE.NAMES] = PMD_NAME_RULES
CLEAN_CODE_PRINCIPLES_PMD_RULES[CLEAN_CODE_PRINCIPLE.COMMENTS] = PMD_COMMENT_RULES
CLEAN_CODE_PRINCIPLES_PMD_RULES[CLEAN_CODE_PRINCIPLE.TESTS] = PMD_TEST_RULES
