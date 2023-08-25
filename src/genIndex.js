/*
 *  生成首页（所有相册）
 *      by xianfei 2023.8
 */

const ejs = require('ejs');
const renderHtml = require('./renderHtml')
const path = require('path');

function getAlbums(albums, cfg){
    let albs = []
    for(var i of albums){
        let name = path.parse(i).name
        albs.push({name:cfg.albums[name]?.name ||name,url:name,type:cfg.albums[name]?.type||null,date:cfg.albums[name]?.date||null})
    }
    return albs
}

module.exports = function(albums, cfg, buildPath){
    ejs.renderFile(`src/views/albums.ejs`, {albums:getAlbums(albums, cfg),photos:[],config:cfg }, {}, (err, str) => {
        if (err) {
            console.error(`Error rendering template:`, err);
        } else {
            renderHtml(str, 'index.html',cfg, buildPath, '.')
        }
    })
}


