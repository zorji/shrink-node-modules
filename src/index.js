const { resolve } = require('path')
const { rm } = require('./rm')
const { vendorShrinkList } = require('./vendor-shrink-list')

const defaultPaths = [
  // test directories
  '**/__tests__',

  // # fix for serverless-enterprise
  '^(?!@serverless/enterprise-plugin/).*test.*$',
  '**/tests',
  '**/powered-test',
  '**/*.test.js',
  '**/*.tap.js',
  '**/*.test.ts',
  '**/*tests.html',

  // asset directories
  '**/docs',
  '**/doc',
  '**/website',
  '**/images',
  '**/assets',

  // examples
  '**/example',
  '**/examples',

  // code coverage directories
  '**/coverage',
  '**/.nyc_output',

  // build scripts
  '**/Makefile',
  '**/Gulpfile.js',
  '**/Gruntfile.js',

  // configs
  '**/.github/**/*.yml',
  '**/.*ignore',
  '**/.babelrc',
  '**/.browserslistrc',
  '**/.dist.babelrc',
  '**/.dist.eslintrc',
  '**/.documentup.json',
  '**/.editorconfig',
  '**/.eslintrc',
  '**/.eslintrc.js',
  '**/.eslintrc.json',
  '**/.eslintrc.yml',
  '**/.flowconfig',
  '**/.gitattributes',
  '**/.idea',
  '**/.jshintrc',
  '**/.lib.babelrc',
  '**/.lib.eslintrc',
  '**/.tern-project',
  '**/.travis.yml',
  '**/.yarn-metadata.json',
  '**/.zuul.yml',
  '**/appveyor.yml',
  '**/bower.json',
  '**/circle.yml',
  '**/codeship-services.yml',
  '**/codeship-steps.yml',
  '**/jsdoc_conf.json',
  '**/karma-ci.conf.js',
  '**/rollup.config.js',
  '**/tsconfig.json',
  '**/wercker.yml',

  // misc
  '**/*.md',
  '**/*.markdown',
  '**/*.sh',
  '**/*.map',
  '**/*.png',
  '**/*.jpg',
  '**/*.gif',
  '**/*.sln',
  '**/*.un~',

  '**/AUTHORS',
  '**/CopyrightNotice.txt',
  '**/LICENSE-W3C.html',
  '**/LICENSE',
  '**/LICENSE.md',
  '**/LICENSE.txt',
  '**/LICENSE-MIT.txt',
  '**/MIT-LICENSE',
  '**/NOTICE.txt',
  '**/package-lock.json',
  '**/yarn-error.log',
  '**/yarn.lock',

  '**/@types/**',
  '**/*.d.ts',
  '**/.yarn-integrity',

  ...vendorShrinkList,
]

const noBinPaths = [
  '**/.bin',
]

const deletePaths = [
  ...defaultPaths
]

if (process.argv.includes('--no-bin')) {
  deletePaths.push(...noBinPaths)
}

const vars = process.argv.slice(2)
const nonFlagArgs = vars.filter(v => v.indexOf('--') !== 0)

if (nonFlagArgs.length === 0) {
  console.log('usage: npx shrink-node-modules ./node_modules')
  console.log('usage: npx shrink-node-modules --no-bin ./node_modules')
  process.exit(0)
}

Promise.all(nonFlagArgs.map(async dir => {
  for (const deletePath of deletePaths) {
    const absDir = resolve(process.cwd(), dir)
    await rm(absDir, deletePath)
  }
}))
