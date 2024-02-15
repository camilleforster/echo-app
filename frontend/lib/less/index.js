const { src, dest } = require('gulp');
const less = require('gulp-less');
const path = require('path');
const config = getConfig.less;

const $less = (cb) => {
    let source = path.normalize(path.join(process.cwd(), config["src"]));
    let destination = path.normalize(path.join(process.cwd(), config["dest"]));
    src(source)
        .pipe(less())
        .pipe(dest(destination));

    if (cb) cb();
};

module.exports = $less;