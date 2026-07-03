const path = require('path')

const buildEslintCommand = (filenames) => {
  const paths = filenames.map((f) => path.relative(process.cwd(), f)).join(' ')

  return [
    `eslint ${paths} --ignore-path .gitignore --max-warnings=0`,
    `prettier --write . --log-level error`,
    `tsc --project tsconfig.json --noEmit`,
    `git add .`
  ]
}

module.exports = {
  '*.{ts,tsx}': [buildEslintCommand]
}
