function taskWatch(gulp, options) {
  'use strict';

  var
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),

    cyspriterConfigs = {
      src: './examples/sprites',
      dest: './examples/generated'
    }
  ;


  return function() {



    return gulp
      .src(options.sample.src)
      .pipe(postcss([
        autoprefixer(),

        require(options.cyspriterES5)(cyspriterConfigs)
      ]))
      .pipe(gulp.dest(options.sample.dest))
    ;
  };
}
module.exports = taskWatch;
