'use strict';

let
  gulp = require('gulp'),
  path = require('path'),
  Promise = require('bluebird'),

  configs = {
    root: __dirname,
    src: path.join('./', 'lib', '/'),
    dest: path.join('./', 'dist', '/'),
    cyspriterES5: path.join(__dirname, 'dist', 'index.js'),

    sample: {
      src: path.join('./', 'examples', 'src', '/**/*.css'),
      dest: path.join('./', 'examples', 'dist')
    }
  }
;

let task = (task) => require(path.join(configs.root, 'gulp-tasks', task + '.js')).call(this, gulp, configs)
;

gulp
  .task('watch', task('Watch'))
  .task('transpile', task('Transpile'))
  .task('sample', task('Sample'))
;
