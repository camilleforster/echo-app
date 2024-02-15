const fs = require('fs');
const path = require('path');
const {src, dest} = require('gulp');
const mustache = require('gulp-mustache');
const rename = require('gulp-rename');

const config = getConfig.html;

// NOTE: This is not recursive!
const getPageList = () => {
    let list = [];

    let tmpl = path.normalize(path.join(process.cwd(), config["templates"]));
    try{
        let dirs = fs.readdirSync(tmpl);
        for (let file of dirs){
            // We don't need any files or directories prefixed with underscore.
            let isHtml = file.indexOf('.html') > -1;
            if (isHtml){
                let obj = Object.assign(
                    {},
                    { data: (require(path.normalize(path.join(process.cwd(), config["templates"], file.replace('.html', '.json')))) || {}) },
                    { component: fs.readFileSync(path.normalize(path.join(tmpl, file)), {encoding: 'utf8'}) },
                    { file: file }
                );

                list.push(obj);
            }
        }
    }catch (e){
        // Some error occurred
        console.log(e.code === "ENOENT" ? 'File not found: ' + e.path : e);
    }

    return list;
};

const $html = (cb) => {
    if (config === undefined) return cb();

    let pages = getPageList();
    for (let page of pages){
        src(path.normalize(path.join(process.cwd(), config["mustache"].base)))
            .pipe(mustache(page.data, {}, {component: page.component}  ))
            .pipe(rename(page.file))
            .pipe(dest(path.normalize(path.join(process.cwd(), config["dest"]))));
    }

    if (cb) return cb();
};

module.exports = $html;
