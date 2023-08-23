const cfg = require('./config')
const ejs = require('ejs');
const fs = require('fs');
const webpack = require('webpack');
const config = require('./webpack.config.js');


// build path
const buildPath = 'build';
if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath);
}

function getAlbums(){
    let albs = []
    for(var i of Object.keys(cfg.albums)){
        albs.push({name:i,url:i,})
    }
    return albs
}

function renderHtml(html, output){
    ejs.renderFile(`src/views/gallery.ejs`,  { avatar: cfg.avatar, title: cfg.title, galleryHtml: html}, {}, (err, str) => {
        if (err) {
            console.error(`Error rendering template ${item.template}:`, err);
        } else {
            fs.writeFileSync(`${buildPath}/${output}`, str);
            console.log(`Generated static page: ${buildPath}/${output}`);
        }
    });
}

ejs.renderFile(`src/views/album.ejs`, {albums:getAlbums(),photos:[],config:cfg }, {}, (err, str) => {
    if (err) {
        console.error(`Error rendering template:`, err);
    } else {
        renderHtml(str, 'album.html')
    }
})

webpack(config , (err, stats) => {
    if (err || stats.hasErrors()) {
        console.error(`Webpack error:`, err);
    }
    // 成功执行完构建
  });