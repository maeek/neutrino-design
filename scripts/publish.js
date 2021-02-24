/* eslint-disable no-console */
const path = require('path');
const util = require('./common');
const childProc = require('child_process');
const pkgPath = path.resolve(__dirname, '..', 'package.json');

util.copyFiles([pkgPath]);

console.log(
  childProc.execSync('npm publish', {
    cwd: path.resolve(__dirname, '..', 'dist')
  }).toString()
);
