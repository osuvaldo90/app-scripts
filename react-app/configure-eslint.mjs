import { readFile, writeFile } from 'fs/promises'

const main = async () => {
  const eslintConfig = JSON.parse(await readFile('./.eslintrc.json'))
  eslintConfig.parserOptions = {
    'project': 'tsconfig.json'
  }
  eslintConfig.plugins = ['unused-imports']
  eslintConfig.extends = [
    eslintConfig.extends,
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/strict'
  ]
  eslintConfig.rules = {
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
  await writeFile('./.eslintrc.json', JSON.stringify(eslintConfig, null, 2))
}

main()
