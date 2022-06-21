import {CLEAN_CODE_PRINCIPLE} from './CoreConstants'

export const CHECKSTYLE_FLAG = 'checkstyle'


// Checkstyle Checks
export const CHECKSTYLE_KISS_CHECKS = ['LineLengthCheck', 'NestedForDepthCheck', 'NestedIfDepthCheck',
    'NestedTryDepthCheck', 'InnerAssignmentCheck', 'JavaNCSSCheck', 'AnonInnerLengthCheck', 'ExecutableStatementCountCheck',
    'FileLengthCheck', 'LambdaBodyLengthCheck', 'ParameterNumberCheck', 'ClassDataAbstractionCouplingCheck',
    'CyclomaticComplexityCheck']

export const CHECKSTYLE_NAME_CHECKS = ['MethodNameCheck', 'MethodTypeParameterNameCheck', 'LocalVariableName',
    'CatchParameterNameCheck', 'ConstantNameCheck', 'LambdaParameterNameCheck', 'LocalFinalVariableName',
    'LocalVariableName', 'MemberNameCheck', 'MethodNameCheck', 'PackageNameCheck', 'ParameterNameCheck',
    'StaticVariableName', 'TypeNameCheck']

export const CHECKSTYLE_COMMENT_CHECKS = ['InvalidJavadocPositionCheck', 'JavadocBlockTagLocationCheck', 'JavadocMissingLeadingAsteriskCheck',
    'JavadocMissingLeadingAsteriskCheck', 'JavadocStyleCheck', 'JavadocTypeCheck', 'MissingJavadocMethodCheck', 'SummaryJavadocCheck',
    'MissingJavadocTypeCheck', 'TrailingCommentCheck']

export const CHECKSTYLE_YAGNI_CHECKS = ['EmptyBlockCheck', 'UnusedImports']

export const CHECKSTYLE_LEAST_ASTONISHMENT_CHECKS = []

export const CHECKSTYLE_INFORMATION_HIDING_CHECKS = []

export const CHECKSTYLE_DRY_CHECKS = []

export const CHECKSTYLE_SLA_CHECKS = []

export const CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS: { [key: string]: string[] } = {}

CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS[CLEAN_CODE_PRINCIPLE.KISS] = CHECKSTYLE_KISS_CHECKS
CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS[CLEAN_CODE_PRINCIPLE.LA] = CHECKSTYLE_LEAST_ASTONISHMENT_CHECKS
// CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS[CLEAN_CODE_PRINCIPLE.IH] = CHECKSTYLE_INFORMATION_HIDING_CHECKS;
// CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS[CLEAN_CODE_PRINCIPLE.DRY] = CHECKSTYLE_DRY_CHECKS;
// CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS[CLEAN_CODE_PRINCIPLE.SLA] = CHECKSTYLE_SLA_CHECKS;
// CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS[CLEAN_CODE_PRINCIPLE.YAGNI] = CHECKSTYLE_YAGNI_CHECKS;
CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS[CLEAN_CODE_PRINCIPLE.NAMES] = CHECKSTYLE_NAME_CHECKS
// CLEAN_CODE_PRINCIPLES_CHECKSTYLE_CHECKS[CLEAN_CODE_PRINCIPLE.COMMENTS] = CHECKSTYLE_COMMENT_CHECKS;
