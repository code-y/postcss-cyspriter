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
    relativeTo: './',
    includeSize: true,
    retina: false,
    verbose: false,
    // spritesmith options
    engine: 'pixelsmith',
    padding: 0,
    engineOpts: {},
    exportOpts: {},
    algorithmOpts: {
      sort: true
    }
  };

  return configs;
}();

