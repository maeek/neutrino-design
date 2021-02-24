const tsconfig = require('../tsconfig.json');

const config = {
  entryFolder: 'src',
  outDir: tsconfig.compilerOptions.outDir,
  stylesFolder: 'styles',
  exclude: [
    /^styles$/,
    /^stories$/,
    /^tests$/,
    /^setup-tests.ts$/,
    /.*\.d\.ts/,
    /.*\.stories\..*/,
    /.*\.test\..*/,
    /.*\.mock\..*/
  ]
};

module.exports = config;
