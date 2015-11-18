'use strict';

import CYSpriter from './helpers/CYSpriter.js';
import * as Q from 'q';
import * as _ from 'lodash';
import * as postcss from 'postcss';
import * as path from 'path';
import * as configs from './configs/default';

function postcssCYSpriterInitializer(opts) {
  return function(css, result) {
    opts = _.merge({}, configs.default, opts, {
      src: path.resolve(opts.src),
      dest: path.resolve(opts.dest)
    });

    return CYSpriter
      .study(opts, css, result)
      .spread((sprites, options) => {
        var promList = sprites.map(sprite => {
          return CYSpriter.run(sprite, options)
            .spread(CYSpriter.mapSprite)
            .spread(CYSpriter.save)
            .spread((sprite, options, sprites) => {
              return CYSpriter.writeRules(sprite, options, css)
            })
            ;
        });
        return Q.all(promList);
      })
      .then(() => {
        console.log('After Study', arguments);
      }).catch(err => {
        console.log(err, err.stack);
      })
      ;
  };
}

module.exports = postcss.plugin('postcss-cyspriter', postcssCYSpriterInitializer);
