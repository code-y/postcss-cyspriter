function taskWatch(gulp, options) {
  'use strict';

  return function() {
    gulp.watch(options.src + '**/*.{js,es6}', ['transpile']);
    gulp.watch(options.dest + '/**/*.*', ['sample']);
  }
}
module.exports = taskWatch;
