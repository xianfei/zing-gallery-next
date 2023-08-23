/*
 *  生成每个相册所对应的HTML块
 *      by xianfei 2023.8
 */

const ejs = require('ejs');
const renderHtml = require('./renderHtml')
const path = require('path');


module.exports = function(imageSizeInfo, cfg, buildPath, albumName){
    ejs.renderFile(`src/views/album.ejs`, {photos: imageSizeInfo, config:cfg, name: albumName, description: cfg.albums[albumName]?.description }, {}, (err, str) => {
        if (err) {
            console.error(`Error rendering template:`, err);
        } else {
            renderHtml(str, albumName + '/index.html', cfg, buildPath, '..')
        }
    })
}