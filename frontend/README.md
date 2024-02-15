# frontend 
![](https://img.shields.io/npm/v/frontend.svg?style=flat-square) ![](https://img.shields.io/npm/dw/frontend.svg?style=flat-square) ![](https://img.shields.io/github/repo-size/danieljackson1983/frontend.svg?style=flat-square) ![](https://img.shields.io/github/issues/danieljackson1983/frontend.svg?style=flat-square) ![](https://img.shields.io/npm/l/frontend.svg?style=flat-square)

A boilerplate for UI/UX Developers.

![](https://nodei.co/npm/frontend.png?downloads=true&downloadRank=true)

### Getting Started
There are several ways to use Frontend. Examples can be found at [Github](https://github.com/danieljackson1983/frontend/tree/master/examples). 

##### Step One
A JSON configuration file is used to define the paths for files in order to compile them. The JSON schema should be similar to the example below.

Create a JSON configuration file in the root directory of your project. 
```sh
$ touch config.json
```
`config.json`:
```json
{
  "ts":   { "dest": "dist/dev/js", "src": "src/ts/*.ts" },
  "sass": { "dest": "dist/dev/css", "src": "src/sass/*.scss" },
  "less": { "dest": "dist/dev/css", "src": "src/less/*.less" },
  "html": { "dest": "dist/dev", "templates": "src/html", "mustache": { "base":"src/html/_tmpl/base.mustache" } }
}
```
> NOTE: It is important to use the keys as described since Frontend does not validate against a JSON schema.

##### Step Two
Create a base Mustache file in the directory defined in the `config.json`
```sh
$ mkdir -p ./src/html/_tmpl && touch ./src/html/_tmpl/base.mustache
```
`base.mustache`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>{{ pageTitle }}</title>
</head>
<body>
    {{> component }}
</body>
</html>
```

##### Step Three
Create your first HTML page and corresponding JSON file for data. 
```sh
$ touch ./src/html/index.html ./src/html/index.json
```

> Every **.html** file in the _templates_ directory will be parsed as an individual page. The contents of this will be sent through the base template and any partials created. The data comes from a corresponding **.json** file having the same base name. 

`index.html`:
```html
<h1>{{ heading }}</h1>
```
### How To Build Using Gulp
Use this package to run your Gulp tasks for compiling Sass, Less, Typescript and Mustache files. 

Create a new Gulp file in the root directory of your project.
```sh
$ touch gulpfile.js
```
`gulpfile.js`:
```javascript
const gulp = require('gulp');
const { build, html, sass, less, ts } = require('frontend');

exports.default = build;
exports["HTML"] = html;
exports["Sass"] = sass;
exports["Less"] = less;
exports["Typescript"] = ts;
```
List the Gulp tasks that are exported from gulpfile.js
```sh
$ gulp --list-tasks
```
Run a task:
```sh
$ gulp default
```
___
> Go to the  [Github repo for Mustache](https://github.com/janl/mustache.js) to read further information on its usage.
