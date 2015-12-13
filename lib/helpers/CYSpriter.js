import * as Q from 'q';
import * as configs from '../configs/default';
import * as path from 'path';
import * as fs from 'fs';
import { SPRITE_LAYOUT, logger } from './utils';
import CYSprite from '../models/CYSprite';
import CYImage from '../models/CYImage';
import spritesmith from 'spritesmith';
import * as _ from 'lodash';
import * as mkdirp from 'mkdirp';
import * as postcss from 'postcss';

class CYSpriter {

  /**
   * Checks if rule passed is a cy sprite rule
   *
   * @param {Object} rule Postcss rule instance
   * @returns {Boolean} If is a sprite rule or not
   */
  static hasMandatoryDeclarations(rule) {
    let res = false;

    for (var i = 0; i < rule.nodes.length; i++) {
      if (rule.nodes[i].prop === configs.sourceKey) {
        res = true;
        break;
      }
    }

    return res;
  }

  /**
   * Make sprite path to save
   *
   * @param {String} dir
   * @returns {void}
   */
  static checkSpriteDir(dir) {
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
  }

  /**
   *
   *
   * @param {CYSprite} sprite
   * @param {Object} options
   * @returns {Promise}
   */
  static run(sprite, options) {
    return Q.Promise((resolve, reject) => {
      let config = _.merge({}, options);

      config.src = sprite.imagePaths;
      config.padding =
        sprite.isRetina ? sprite.padding * sprite.ratio : sprite.padding;
      config.algorithm = SPRITE_LAYOUT[sprite.layout];

      return Q.nfcall(spritesmith, config)
        .then(results => {
          return resolve([sprite, options, results]);
        })
        .catch(err => reject(err))
        ;
    });
  }

  /**
   *
   * @param {CYSprite} sprite
   * @param {Object} options
   * @param {Object} sprites
   * @returns {Promise}
   */
  static mapSprite(sprite, options, sprites) {
    return Q.Promise((resolve, reject) => {

      sprite.size = sprites.properties;

      for (let imagePath in sprites.coordinates) {
        if (!sprites.coordinates.hasOwnProperty(imagePath)) {
          continue;
        }

        let map = sprites.coordinates[imagePath];
        let image = sprite.getImage(imagePath);

        if (!image) {
          logger.warn(`${imagePath}: Not found or not readable...`);
          continue;
        }

        image.position = {x: map.x, y: map.y};
        image.size = {width: map.width, height: map.height};
      }

      return resolve([sprite, options, sprites]);
    });
  }

  /**
   *
   *
   * @param {CYSprite} sprite
   * @param {Object} options
   * @param {Object} sprites
   * @returns {Promise}
   */
  static save(sprite, options, sprites) {
    return Q.Promise(function(resolve, reject) {

      CYSpriter.checkSpriteDir(sprite._outputDir);

      return Q.nfcall(fs.writeFile, sprite.output,
        new Buffer(sprites.image, 'binary'))
        .then(() => {
          logger.generated(sprite);
          return resolve([sprite, options, sprites]);
        })
        .catch((err) => reject(err));
    });
  }

  /**
   * Write rules to css
   *
   * @param {CYSprite} sprite
   * @param {Object} options
   * @param {Object} css
   * @returns {Promise}
   */
  static writeRules(sprite, options, css) {

    let cssPosition;
    css.walkRules(sprite.originalSelector, (rule) => {
      let selector = sprite.selector;

      sprite.imageList.forEach((image) => {
        selector += `,\n${image.selector}`;

        let
          width = image.size.width,
          height = image.size.height;

        let _rule = postcss
          .rule({selector: image.selector})
          .append(postcss.decl({
            prop: 'background-position',
            value: image.cssPosition
          }));

        if (sprite.includeSize) {
          _rule.append(
            postcss.decl({
              prop: 'height',
              value: (sprite.isRetina ? height / sprite.ratio : height) + 'px'
            }),
            postcss.decl({
              prop: 'width',
              value: (sprite.isRetina ? width / sprite.ratio : width) + 'px'
            })
          );
        }

        css.insertAfter(cssPosition || rule, _rule);
        cssPosition = _rule;
      });

      rule.append(postcss.decl({
        prop: 'background-image',
        value: `url("${sprite.url}?${sprite.cacheBuster}")`
      }));

      if(sprite.isRetina) {
        rule.append(postcss.decl({
          prop: 'background-size',
          value: sprite.cssBackgroundSize
        }));
      }

      if (sprite.decorate) {
        rule.append(
          postcss.decl({
            prop: 'display',
            value: 'inline-block'
          }),
          postcss.decl({
            prop: 'overflow',
            value: 'hidden'
          })
        );
      }

      rule.selector = selector;
    });
  }

  /**
   *
   * @param {Object} options
   * @param {Object} css
   * @param {Object} result
   * @returns {Promise}
   */
  static study(options, css, result) {
    var sprites = [];

    return Q.Promise((resolve, reject) => {

      css.walkRules(configs.NAMESPACE_REGEX, rule => {
        if (!CYSpriter.hasMandatoryDeclarations(rule)) {
          logger
            .warn(`missing cys-src propery in ${rule.selector} - `,
              rule.source.start);
          return;
        }

        var dirName = rule.nodes
          .filter(s => s.prop === configs.sourceKey).pop().value;
        dirName = path.normalize(dirName.replace(/(')|(")/g, ''));
        dirName = path.resolve(options.src, dirName);

        var stats;
        try {
          stats = fs.lstatSync(dirName);
          if (!stats.isDirectory()) {
            throw 'not a directory';
          }
        } catch (e) {
          logger.warn(`${dirName}: is not a directory...`);
          return;
        }

        let sprite = CYSprite(rule, dirName, options);

        fs.readdirSync(dirName).forEach((filename) => {
          if (!(~configs.whitelist.indexOf(path.extname(filename)))) {
            sprite.addImage(
              CYImage(filename, dirName, sprite)
            );
          }

        });

        sprites.push(sprite);
      });

      return resolve([sprites, options]);
    });
  }
}

export default CYSpriter;
