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