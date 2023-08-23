const ejs = require('ejs');
const renderHtml = require('./renderHtml')
const path = require('path');

function getAlbums(albums){
    let albs = []
    for(var i of albums){
        let name = path.parse(i).name
        albs.push({name:name,url:name,})
    }
    return albs
}

module.exports = function(albums, cfg, buildPath){
    ejs.renderFile(`src/views/albums.ejs`, {albums:getAlbums(albums),photos:[],config:cfg }, {}, (err, str) => {
        if (err) {
            console.error(`Error rendering template:`, err);
        } else {
            renderHtml(str, 'index.html',cfg, buildPath, '.')
        }
    })
}


