var
  postcss = require('postcss'),
  _ = require('lodash'),
  Promise = require('bluebird'),

  configs = require('./configs/default.js'),
  CYSpriter = require('./models/CYSpriter.js')
;

function cyspriterPostcss(opts) {
  opts = _.merge({}, configs.default, opts);
  //console.log(0, 'options', opts);

  return function(css, result) {
//    console.log(1, 'css', css);
//    console.log(2, 'result', result);

    return CYSpriter
      .study(css, result)
      .then(sprites => {
        console.log('After Study', sprites);
      })
    ;
  };
}

module.exports = postcss.plugin('postcss-cyspriter', cyspriterPostcss);
