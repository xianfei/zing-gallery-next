const my_config = require('./config')
const fs = require('fs-extra');
const webpack = require('webpack');
const webpack_config = require('./webpack.config.js');

// 检查build文件夹是否存在，如果不存在则创建
const buildPath = webpack_config.output.path;
if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath);
}

// 处理图片并生成相册
require('./src/processPhotos')(my_config,buildPath)

// Webpack打包static中的js
webpack(webpack_config , (err, stats) => {
    if (err || stats.hasErrors()) {
        console.error(`Webpack error:`, err);
    }
});

// 拷贝public资源
fs.copy(__dirname + "/src/public", buildPath, err => {
  if (err) console.error(err)
})

