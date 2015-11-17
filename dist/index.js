'use strict';

var postcss = require('postcss'),
    _ = require('lodash'),
    Promise = require('bluebird'),
    configs = require('./configs/default.js'),
    Cyspriter = require('./models/Cyspriter.js');

function cyspriterPostcss(opts) {
  opts = _.merge({}, configs.default, opts);
  //console.log(0, 'options', opts);

  return function (css, result) {
    //    console.log(2, 'css', css);
    //    console.log(3, 'result', result);

    return Cyspriter.study(css, result).then(function (sprites) {
      console.log('After Study', sprites);
    });
  };
}

module.exports = postcss.plugin('postcss-cyspriter', cyspriterPostcss);
//# sourceMappingURL=sourcemaps/index.js.map
