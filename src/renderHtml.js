/*
 *  渲染网页
 *      by xianfei 2023.8
 */

const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

module.exports = function (html, output, cfg, buildPath, relPath){
    ejs.renderFile(`src/views/gallery.ejs`,  { avatar: relPath + cfg.avatar.replace('./','/'), title: cfg.title, galleryHtml: html, relPath: relPath, description: cfg.description || ''}, {}, (err, str) => {
        if (err) {
            console.error(`Error rendering template ${item.template}:`, err);
        } else {
            fs.writeFileSync(`${buildPath}/${output}`, str);
            console.log(`Generated static page: ${buildPath}/${output}`);
        }
    });
}