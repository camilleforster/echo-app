const { src, dest } = require('gulp');
const path = require('path');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const config = getConfig.sass;

const $sass = (cb) => {
    let source = path.normalize(path.join(process.cwd(), config["src"]));
    let destination = path.normalize(path.join(process.cwd(), config["dest"]));
    src(source)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(destination));

    if (cb) cb();
};

module.exports = $sass;