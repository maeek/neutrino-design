/* eslint-disable max-len */
/* eslint-disable no-console */
const path = require('path');
const chalk = require('chalk');
const config = require('./config');
const util = require('./common');
const { processScss } = require('./processors/sassProcessor');
const { processTypescript } = require('./processors/tsProcessor');

console.log();

const loadedModules = util.getEntries(path.resolve(__dirname, '..', config.entryFolder));

console.log();
console.log();
console.log(`Compiling ${loadedModules.reduce((acc, curr) => acc + curr.meta.count, 0)} files...`);
console.log();
console.time(`[${chalk.green('✓')}] Compilation ended successfuly in`);

const longestNameLength = loadedModules.reduce((acc, curr) => {
  const len = curr.meta.type.length + curr.meta.name.length + 25;
  return acc > len ? acc : len;
}, 0);

loadedModules.forEach((mod) => {
  const insertTabs = longestNameLength - `[x] [${chalk.gray(mod.meta.type)}][${mod.meta.name}]`.length;

  try {
    console.time(`[${chalk.green('✓')}] [${chalk.gray(mod.meta.type)}][${mod.meta.name}]${new Array(insertTabs).join(' ')} Compilation successful, time elapsed`);

    if (mod.meta.typescriptCount > 0) {
      processTypescript(mod.rootPath, mod.files.typescript);
    }
    
    if (mod.meta.scssCount > 0) {
      processScss(mod.rootPath);
    }

    console.timeEnd(`[${chalk.green('✓')}] [${chalk.gray(mod.meta.type)}][${mod.meta.name}]${new Array(insertTabs).join(' ')} Compilation successful, time elapsed`);
  } catch (e) {
    console.log(`[${chalk.red('✕')}] [${chalk.gray(mod.meta.type)}][${mod.meta.name}]${new Array(insertTabs).join(' ')} Compilation failure`);
    console.log();
    console.error(e);
  }
});

util.copyFiles([ path.resolve(__dirname, '..', 'src') ], path.resolve(__dirname, '..', 'dist'));

console.log();
console.timeEnd(`[${chalk.green('✓')}] Compilation ended successfuly in`);
console.log();
console.log('    Summary:');
console.log();
console.log(`        Scss files:        ${loadedModules.reduce((acc, curr) => acc + curr.meta.scssCount, 0)}`);
console.log(`        Typescript files:  ${loadedModules.reduce((acc, curr) => acc + curr.meta.typescriptCount, 0)}`);
console.log();
console.log(`        All files:         ${loadedModules.reduce((acc, curr) => acc + curr.meta.count, 0)}`);
console.log();
