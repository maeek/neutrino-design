const path = require('path');
const config = require('../config');
const util = require('../common');
const babel = require('@babel/core');
const babelCfg = require('../../babel.config');

const processTypescript = (rootPath, files) => {
  const outDir = util.createDir(path.join(__dirname, '../..', config.outDir));

  files.forEach((file) => {
    const filePath = path.resolve(rootPath, file);
    babel.transformFileAsync(filePath, babelCfg)
      .then((res) => {
        const relativePath = util.getRelativePath(filePath);
        const filePathJs = relativePath.replace(path.extname(relativePath), '.js');
        const destFile = path.join(outDir, filePathJs);
        const transformedCode = res.code.replace(/require\("(.+)\.scss"\)/gm, 'require("$1.css")');

        util.saveFile(destFile, transformedCode);
      });
  });
};

module.exports = {
  processTypescript
};
