import { readFile, writeFile } from 'fs/promises'

const main = async () => {
  const tsConfig = JSON.parse(await readFile('./tsconfig.json'))
  tsConfig.compilerOptions.noUncheckedIndexedAccess = true
  tsConfig.compilerOptions.noFallthroughCasesInSwitch = true
  tsConfig.include.push('**/*.js', '**/*.jsx')
  await writeFile('./tsconfig.json', JSON.stringify(tsConfig, null, 2))
}

main()
