'use strict';

module.exports = function() {
  var configs = {};

  configs.NAMESPACE = 'cys-';
  configs.NAMESPACE_REGEX = new RegExp(configs.NAMESPACE);
  configs.CLASSNAME_REGEX = /[^-_:\d\w]/gi;
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
    cacheBuster: true,
    ratio: 2,
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

