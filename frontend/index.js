/**
 * Grab the contents of the html file(s) in the folder. Set that to be used as a partial called `component`
 * Open base.mustache
 *
 *
 **/
const { series } = require('gulp');
const { html, sass, less, ts } = require('./lib');

exports.default = series(html,sass,less,ts);
exports.html = html;
exports.sass = sass;
exports.less = less;
exports.ts = ts;
exports.build = exports.default;

// npm publish --access public