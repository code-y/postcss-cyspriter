'use strict';

var postcss = require('postcss');
var cyspriter = require('./dist/index.js');
var autoprefixer = require('autoprefixer');
var fs = require('fs');

var postcssOpts = {
};

postcss(autoprefixer, cyspriter)
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

