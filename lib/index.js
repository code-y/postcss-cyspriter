var
  postcss = require('postcss'),
  _ = require('lodash'),
  Promise = require('bluebird'),
  path = require('path'),
  configs = require('./configs/default.js')
  ;
import CYSpriter from './helpers/CYSpriter.js';

function postcssCYSpriterInitializer(opts) {
  return function(css, result) {
    opts = _.merge({}, configs.default, opts, {
      src: path.resolve(opts.src),
      dest: path.resolve(opts.dest)
    });

    return CYSpriter
      .study(opts, css, result)
      .spread(CYSpriter.run)
      .spread(CYSpriter.mapSprite)
      .spread(CYSpriter.save)
      .then(() => {
        //console.log('After Study', arguments);
      }).catch(err => {
        console.log(err, err.stack);
      })
      ;
  };
}

module.exports = postcss.plugin('postcss-cyspriter', postcssCYSpriterInitializer);
