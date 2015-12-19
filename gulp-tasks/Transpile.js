function taskTranspile(gulp, options) {
  'use strict';

  var
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint'),
    path = require('path'),
    colors  = require('colors'),
    plumber = require('gulp-plumber')
    ;

  return function() {

    return gulp
      .src(options.src + '**/*.{js,es6}')
      .pipe(plumber(
        { errorHandler: function(e) { console.log('Transpile:ERROR', e);} }))

      .pipe(eslint(path.join(options.root, '.eslintrc')))
      .pipe(eslint.formatEach('stylish', process.stderr))

      .pipe(sourcemaps.init())

      .pipe(babel({
        presets: ['es2015']
      }))

      .pipe(sourcemaps.write('./sourcemaps'))
      .pipe(gulp.dest(options.dest))
  };
}

module.exports = taskTranspile;
