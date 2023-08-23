const my_config = require('./config')
const ejs = require('ejs');
const fs = require('fs');
const webpack = require('webpack');
const webpack_config = require('./webpack.config.js');
const path = require('path');

// 检查build文件夹是否存在，如果不存在则创建
const buildPath = webpack_config.output.path;
if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath);
}

require('./src/processPhotos')(my_config,buildPath)

// Webpack打包
webpack(webpack_config , (err, stats) => {
    if (err || stats.hasErrors()) {
        console.error(`Webpack error:`, err);
    }
    // 成功执行完构建
});

// 拷贝public资源
// 下面这段是GPT-4写的
// Prompt: 请使用nodejs写一段代码，把a文件夹所有文件拷到b文件夹，如果存在则跳过

const srcDir = __dirname + "/src/public";
const destDir = buildPath;

fs.readdir(srcDir, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err.message}`);
    return;
  }

  files.forEach(file => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);

    fs.stat(srcFile, (err, stats) => {
      if (err) {
        console.error(`Error reading file: ${err.message}`);
        return;
      }

      if (!stats.isFile()) {
        console.log(`Skipping non-file: ${srcFile}`);
        return;
      }

      fs.access(destFile, fs.constants.F_OK, err => {
        if (!err) {
          return;
        }

        fs.copyFile(srcFile, destFile, err => {
          if (err) {
            console.error(`Error copying file: ${err.message}`);
            return;
          }
        });
      });
    });
  });
});