/* eslint-disable no-console */
const path = require('path');
const config = require('./config');
const util = require('./common');
const { processScss } = require('./processors/sassProcessor');
const { processTypescript } = require('./processors/tsProcessor');

const loadedModules = util.getEntries(path.resolve(__dirname, '..', config.entryFolder));

console.time('[🟢] Compilation ended successfuly in');

loadedModules.forEach((mod) => {
  try {
    console.time(`[🟢] [${mod.meta.type}][${mod.meta.name}] Compilation successful, time elapsed`);

    if (mod.meta.typescriptCount > 0) {
      console.log(`[🟡] [${mod.meta.type}][${mod.meta.name}] Compiling ${mod.meta.typescriptCount} typescript file${mod.meta.typescriptCount > 1 ? 's' : ''}`);
      processTypescript(mod.rootPath, mod.files.typescript);
    }
    
    if (mod.meta.scssCount > 0) {
      console.log(`[🟡] [${mod.meta.type}][${mod.meta.name}] Compiling ${mod.meta.scssCount} scss file${mod.meta.scssCount > 1 ? 's' : ''}`);
      processScss(mod.rootPath);
    }

    console.timeEnd(`[🟢] [${mod.meta.type}][${mod.meta.name}] Compilation successful, time elapsed`);
  } catch (e) {
    console.log(`[🔴] [${mod.meta.type}][${mod.meta.name}] Compilation failure`);
    console.log();
    console.error(e);
  }
});

console.log();
console.timeEnd('[🟢] Compilation ended successfuly in');
console.log();
