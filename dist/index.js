'use strict';

var postcss = require('postcss'),
    configs = require('./configs/default.js'),
    _ = require('lodash'),
    Promise = require('bluebird');

module.exports = postcss.plugin('postcss-cyspriter', function (opts) {
  opts = _.merge({}, configs.default, opts);

  console.log(0, 'options', opts);

  return function (css, result) {};
});
//# sourceMappingURL=sourcemaps/index.js.map
