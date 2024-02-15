const { src, dest } = require('gulp');
const path = require('path');
const ts = require('gulp-typescript');

const config = getConfig.ts;

const $ts = (cb) => {
    let source = path.normalize(path.join(process.cwd(), config["src"]));
    let destination = path.normalize(path.join(process.cwd(), config["dest"]));
    src(source)
        .pipe(ts())
        .pipe(dest(destination));

    if (cb) cb();
};

module.exports = $ts;