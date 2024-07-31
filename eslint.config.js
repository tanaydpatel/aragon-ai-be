import globals from 'globals';
import pluginJs from '@eslint/js';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    plugins: { jsdoc: jsdocPlugin, prettier: prettierPlugin },
    rules: {
      'no-unused-vars': 'error', // Disallow unused variables
      'no-undef': 'error', // Disallow the use of undeclared variables
      eqeqeq: 'error', // Require the use of === and !==
      curly: 'error', // Require following curly brace conventions
      'no-redeclare': 'error', // Disallow variable redeclaration
      'no-console': 'error', // Warn on console.log usage
      'no-debugger': 'error', // Disallow the use of debugger
      'no-alert': 'error', // Disallow the use of alert, confirm, and prompt
      'consistent-return': 'error', // Require return statements to either always or never specify values
      'arrow-spacing': ['error', { before: true, after: true }], // Enforce consistent spacing before and after the arrow in arrow functions
      'space-infix-ops': 'error', // Require spacing around infix operators
      'keyword-spacing': ['error', { before: true, after: true }], // Enforce consistent spacing before and after keywords
      'space-before-blocks': 'error', // Enforce consistent spacing before blocks
      indent: ['error', 2], // Enforce a consistent indentation level of 2 spaces
      quotes: ['error', 'single'], // Enforce the consistent use of single quotes
      semi: ['error', 'always'], // Require or disallow semicolons instead of ASI
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: false,
            FunctionExpression: true,
          },
          contexts: [
            'FunctionDeclaration',
            'MethodDefinition:not([kind="constructor"])',
            'ClassDeclaration',
            'FunctionExpression',
          ],
        },
      ],
    },
    languageOptions: { globals: globals.node },
  },
  prettierConfig,
  pluginJs.configs.recommended,
];
