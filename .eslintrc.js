module.exports = {
    env: {
        "browser": true,
        "es6": true,
        "node": true
    },
    extends: [
        "plugin:@typescript-eslint/recommended",

        "prettier"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    plugins: [
        "eslint-plugin-import",
        "eslint-plugin-jsdoc",
        "eslint-plugin-prefer-arrow",
        "@typescript-eslint",
        "@typescript-eslint/tslint"
    ],
    root: true,
    rules: {
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/ban-ts-comment": "error",
        "@typescript-eslint/ban-types": [
            "error",
            {
                "types": {
                    "Object": {
                        "message": "Avoid using the `Object` type. Did you mean `object`?"
                    },
                    "Function": {
                        "message": "Avoid using the `Function` type. Prefer a specific function type, like `() => void`."
                    },
                    "Boolean": {
                        "message": "Avoid using the `Boolean` type. Did you mean `boolean`?"
                    },
                    "Number": {
                        "message": "Avoid using the `Number` type. Did you mean `number`?"
                    },
                    "String": {
                        "message": "Avoid using the `String` type. Did you mean `string`?"
                    },
                    "Symbol": {
                        "message": "Avoid using the `Symbol` type. Did you mean `symbol`?"
                    }
                }
            }
        ],
        "@typescript-eslint/consistent-type-assertions": "error",
        "@typescript-eslint/dot-notation": "error",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/indent": [
            "error",
            4,
            {
                "FunctionDeclaration": {
                    "parameters": "first"
                },
                "FunctionExpression": {
                    "parameters": "first"
                }
            }
        ],
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                "multiline": {
                    "delimiter": "none",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
        "@typescript-eslint/member-ordering": "error",
        "@typescript-eslint/naming-convention": "error",
        "@typescript-eslint/no-array-constructor": "error",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-extra-non-null-assertion": "error",
        "@typescript-eslint/no-extra-semi": "error",
        "@typescript-eslint/no-inferrable-types": [
            "error",
            {
                "ignoreParameters": true
            }
        ],
        "@typescript-eslint/no-loss-of-precision": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-shadow": [
            "error",
            {
                "hoist": "all"
            }
        ],
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/no-unnecessary-type-constraint": "error",
        "@typescript-eslint/no-unused-expressions": "error",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/prefer-as-const": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/quotes": [
            2,
            "single",
            "avoid-escape"
        ],
        "@typescript-eslint/semi": [
            "error",
            "never"
        ],
        "@typescript-eslint/triple-slash-reference": [
            "error",
            {
                "path": "always",
                "types": "prefer-import",
                "lib": "always"
            }
        ],
        "@typescript-eslint/type-annotation-spacing": "error",
        "@typescript-eslint/typedef": "off",
        "@typescript-eslint/unified-signatures": "error",
        "arrow-body-style": "error",
        "complexity": "off",
        "constructor-super": "error",
        "curly": [
            "off",
            "multi-line"
        ],
        "dot-notation": "error",
        "eol-last": "error",
        "eqeqeq": [
            "error",
            "smart"
        ],
        "for-direction": "error",
        "getter-return": "error",
        "guard-for-in": "error",
        "id-denylist": [
            "error",
            "any",
            "Number",
            "number",
            "String",
            "string",
            "Boolean",
            "boolean",
            "Undefined",
            "undefined"
        ],
        "id-match": "error",
        "import/no-deprecated": "warn",
        "indent": "error",
        "jsdoc/check-alignment": "error",
        "jsdoc/check-indentation": "error",
        "jsdoc/no-types": "error",
        "max-classes-per-file": "off",
        "max-len": [
            "error",
            {
                "code": 140
            }
        ],
        "new-parens": "error",
        "no-array-constructor": "off",
        "no-async-promise-executor": "error",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-case-declarations": "error",
        "no-class-assign": "error",
        "no-compare-neg-zero": "error",
        "no-cond-assign": "error",
        "no-console": [
            "error",
            {
                "allow": [
                    "log",
                    "warn",
                    "dir",
                    "timeLog",
                    "assert",
                    "clear",
                    "count",
                    "countReset",
                    "group",
                    "groupEnd",
                    "table",
                    "dirxml",
                    "error",
                    "groupCollapsed",
                    "Console",
                    "profile",
                    "profileEnd",
                    "timeStamp",
                    "context"
                ]
            }
        ],
        "no-const-assign": "error",
        "no-constant-condition": "error",
        "no-control-regex": "error",
        "no-debugger": "error",
        "no-delete-var": "error",
        "no-dupe-args": "error",
        "no-dupe-class-members": "error",
        "no-dupe-else-if": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-empty": "off",
        "no-empty-character-class": "error",
        "no-empty-function": "off",
        "no-empty-pattern": "error",
        "no-eval": "error",
        "no-ex-assign": "error",
        "no-extra-boolean-cast": "error",
        "no-extra-semi": "off",
        "no-fallthrough": "error",
        "no-func-assign": "error",
        "no-global-assign": "error",
        "no-import-assign": "error",
        "no-inner-declarations": "error",
        "no-invalid-regexp": "error",
        "no-invalid-this": "off",
        "no-irregular-whitespace": "error",
        "no-loss-of-precision": "off",
        "no-misleading-character-class": "error",
        "no-mixed-spaces-and-tabs": "error",
        "no-new-symbol": "error",
        "no-new-wrappers": "error",
        "no-nonoctal-decimal-escape": "error",
        "no-obj-calls": "error",
        "no-octal": "error",
        "no-prototype-builtins": "error",
        "no-redeclare": "error",
        "no-regex-spaces": "error",
        "no-restricted-imports": [
            "error",
            "rxjs/Rx"
        ],
        "no-self-assign": "error",
        "no-setter-return": "error",
        "no-shadow": "error",
        "no-shadow-restricted-names": "error",
        "no-sparse-arrays": "error",
        "no-this-before-super": "error",
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-undef": "error",
        "no-undef-init": "error",
        "no-underscore-dangle": "error",
        "no-unexpected-multiline": "error",
        "no-unreachable": "error",
        "no-unsafe-finally": "off",
        "no-unsafe-negation": "off",
        "no-unsafe-optional-chaining": "off",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
        "no-unused-vars": "off",
        "no-use-before-define": "off",
        "no-useless-backreference": "error",
        "no-useless-catch": "error",
        "no-useless-escape": "error",
        "no-var": "error",
        "no-with": "error",
        "object-shorthand": "error",
        "one-var": [
            "error",
            "never"
        ],
        "prefer-arrow/prefer-arrow-functions": "warn",
        "prefer-const": "error",
        "quote-props": [
            "error",
            "as-needed"
        ],
        "radix": "error",
        "require-yield": "error",
        "semi": "off",
        "space-before-function-paren": [
            "error",
            {
                "anonymous": "never",
                "asyncArrow": "always",
                "named": "never"
            }
        ],
        "spaced-comment": [
            "error",
            "always",
            {
                "markers": [
                    "/"
                ]
            }
        ],
        "use-isnan": "error",
        "valid-typeof": "off",
        "@typescript-eslint/tslint/config": [
            "error",
            {
                "rules": {
                    "import-spacing": true,
                    "whitespace": [
                        true,
                        "check-branch",
                        "check-decl",
                        "check-operator",
                        "check-separator",
                        "check-type",
                        "check-typecast"
                    ]
                }
            }
        ]
    }
}
