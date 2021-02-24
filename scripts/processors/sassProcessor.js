const config = require('../config');
const util = require('../common');
const path = require('path');
const sass = require('node-sass');
const fs = require('fs');

const processScss = (rootPath) => {
  let cssFiles = util.getScssFiles(rootPath);
  let fullPath = rootPath;
  const altPath = path.resolve(rootPath, config.stylesFolder);
  let appendPath = '';

  if (cssFiles.length === 0 && fs.existsSync(altPath)) {
    cssFiles = util.getScssFiles(altPath);
    appendPath = config.stylesFolder;
    fullPath = path.join(rootPath, appendPath);
  }
  const outDir = util.createDir(path.join(__dirname, '../..', config.outDir));
  const relativePath = util.getRelativePath(rootPath);

  cssFiles.forEach((file) => {
    const postCss = sass.renderSync({
      file: path.resolve(fullPath, file)
    }).css.toString('utf-8');
    
    const newFileName = file.replace(path.extname(file), '.css');
    util.saveFile(
      path.join(outDir, relativePath, appendPath, newFileName),
      postCss
    );
  });
};

module.exports = {
  processScss
};
