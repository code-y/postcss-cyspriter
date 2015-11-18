'use strict';

module.exports = function() {
  var configs = {};

  configs.NAMESPACE = 'cy-';

  configs.sourceKey = configs.NAMESPACE + 'src';
  configs.whitelist = [
    'png'
  ];

  configs.default = {
    src: './',
    dest: './',
    retina: false,
    verbose: false,
    // spritesmith options
    engine: 'pixelsmith',
    algorithm: 'binary-tree',
    padding: 0,
    engineOpts: {},
    exportOpts: {}
  };

  return configs;
}();

