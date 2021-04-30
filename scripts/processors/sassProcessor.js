const config = require('../config');
const util = require('../common');
const path = require('path');
const sass = require('sass');
const postcss  = require('postcss');
const autoprefixer = require('autoprefixer');
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

  cssFiles.forEach(async (file) => {
    let renderedCss = sass.renderSync({
      file: path.resolve(fullPath, file)
    }).css.toString('utf-8');

    postcss([ autoprefixer ]).process(renderedCss)
      .then((result) => {
        const newFileName = file.replace(path.extname(file), '.css');
        util.saveFile(
          path.join(outDir, relativePath, appendPath, newFileName),
          result.css
        );
      })
      .catch((e) => {
        console.error(e);
      });
    
  });
};

module.exports = {
  processScss
};
