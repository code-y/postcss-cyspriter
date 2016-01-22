'use strict';

var postcss = require('postcss');
var cyspriter = require('./dist/index.js');
var autoprefixer = require('autoprefixer');
var fs = require('fs');

var postcssOpts = {
};

postcss(autoprefixer, cyspriter({
  src: './examples/images',
  dest: './examples/sprites',
  relativeTo: './examples/dist', // full or relative path to the css output
  padding: 10, // spacing around each sprite
  includeSize: true, // include or not size in output css
  verbose: true,
  retina: false
}))
  .process(fs.readFileSync('./examples/src/test.css'), postcssOpts)
  .then(function(result) {
    if(!fs.existsSync('./examples/dist/')) {
      fs.mkdirSync('./examples/dist');
    }

    return result;
  })
  .then(function(result) {
    return fs.writeFileSync('./examples/dist/test.css', result.css.toString());
  })
  .catch(function(error) {
    console.log('ERROR: index.js:19', error);
  })
;

