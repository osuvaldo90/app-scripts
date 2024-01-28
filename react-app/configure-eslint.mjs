import { readFile, writeFile } from 'fs/promises'

const main = async () => {
  const eslintConfig = JSON.parse(await readFile('./.eslintrc.json'))
  eslintConfig.parserOptions = {
    'project': 'tsconfig.json'
  }
  eslintConfig.plugins = ['unused-imports', '@typescript-eslint']
  eslintConfig.extends = [
    eslintConfig.extends,
    'plugin:react-hooks/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/strict'
  ]
  eslintConfig.rules = {
    "no-shadow": "error",
    'react/self-closing-comp': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'unused-imports/no-unused-imports': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
      },
    ],
  }
  eslintConfig.overrides = [
    {
      "files": ["*.test.*"],
      "env": {
        "jest": true
      },
      "plugins": ["jest"],
      "rules": {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
      }
    }
  ]
  await writeFile('./.eslintrc.json', JSON.stringify(eslintConfig, null, 2))
}

main()
