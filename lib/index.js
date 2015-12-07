'use strict';

import CYSpriter from './helpers/CYSpriter.js';
import * as Q from 'q';
import * as _ from 'lodash';
import * as postcss from 'postcss';
import * as path from 'path';
import configs from './configs/default';
import { logger } from './helpers/utils';

function postcssCYSpriterInitializer(opts) {
  return function(css, result) {

    opts = _.merge({}, configs.default, opts, {
      src: path.resolve(opts.src || configs.default.src),
      dest: path.resolve(opts.dest || configs.default.dest),
      relativeTo: path.resolve(opts.relativeTo || configs.default.relativeTo),
      lastRun: new Date()
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
      .then(sprites => {

        css.walkDecls(`${configs.NAMESPACE}include`, decl => {
          CYSpriter.resolveIncludes(
            decl.value.replace(/(")|(')/g, '').split(' '), decl.parent, sprites, css
          );

          decl.remove();
        });

        return sprites;
      })
      .catch(err => {
        logger.fatal(err);
      })
      ;
  };
}

module.exports = postcss.plugin('postcss-cyspriter', postcssCYSpriterInitializer);
