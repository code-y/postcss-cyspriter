'use strict';

module.exports = function() {
  var configs = {};

  configs.NAMESPACE = 'cy-';
  configs.NAMESPACE_REGEX = new RegExp(configs.NAMESPACE);
  configs.sourceKey = configs.NAMESPACE + 'src';

  configs.whitelist = [
    'png'
  ];

  configs.default = {
    src: './',
    dest: './',
    relativeTo: './',
    httpDest: false,
    decorate: true,
    includeSize: true,
    retina: false,
    verbose: false,
    // spritesmith options
    engine: 'pixelsmith',
    padding: 0,
    engineOpts: {},
    exportOpts: {},
    algorithmOpts: {}
  };

  return configs;
}();

