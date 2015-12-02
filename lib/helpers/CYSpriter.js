import * as Q from 'q';
import * as configs from '../configs/default';
import * as path from 'path';
import * as fs from 'fs';
import log from './utils';
import CYSprite from '../models/CYSprite';
import CYImage from '../models/CYImage';
import spritesmith from 'spritesmith';
import * as _ from 'lodash';
import * as mkdirp from 'mkdirp';
import * as postcss from 'postcss';

const SELECTOR_REGEX = new RegExp('\.' + configs.NAMESPACE + '(.+)', 'gi');

class CYSpriter {

  /**
   * Checks if rule passed is a cy sprite rule
   *
   * @param {Object} rule Postcss rule instance
   * @returns {Boolean} If is a sprite rule or not
   */
  static hasMandatoryDeclarations(rule) {
    let res = false;

    for(var i = 0; i < rule.nodes.length; i++) {
      if(rule.nodes[i].prop === configs.sourceKey) {
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
    if(!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
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

      sprite.size.width = sprites.properties.width;
      sprite.size.height = sprites.properties.height;

      for(let k in sprites.coordinates) {
        if(!sprites.coordinates.hasOwnProperty(k)) {
          continue;
        }

        let map = sprites.coordinates[k];
        let image = sprite.getImage(k);

        if(!image) {
          log('Skip. Image ' + k + ' not found!', options.verbose);
          continue;
        }

        image.position.x = map.x;
        image.position.y = map.y;

        image.size.width = map.width;
        image.size.height = map.height;
      }

      return resolve([sprite, options, sprites]);
    });
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
      config.padding = sprite.padding;
      config.algorithm = sprite.layout;

      console.log('smith configs1', config.algorithm, '\n\n\n\n');

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
   *
   * @param {CYSprite} sprite
   * @param {Object} options
   * @param {Object} sprites
   * @returns {Promise}
   */
  static save(sprite, options, sprites) {
    //console.log('sprite',sprite.imageList);
    return Q.Promise(function(resolve, reject) {
      //console.log('sprites',sprites);

      CYSpriter.checkSpriteDir(sprite._outputDir);

      return Q.nfcall(fs.writeFile, sprite.output,
        new Buffer(sprites.image, 'binary'))
        .then(() => {
          log('Spritesheet ' + sprite.selector + ' generated.', options.verbose);
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

    let position;
    css.walkRules(sprite.originalSelector, (rule) => {
      let selector = sprite.selector;

      sprite.imageList.forEach((image) => {
        selector += `,\n${image.selector}`;

        let
          width = image.size.width,
          height = image.size.height,
          posX = image.position.x,
          posY = image.position.y
          ;

          let _rule = postcss
            .rule({selector: image.selector})
            .append(postcss.decl({
                prop: 'background-position',
                value: (posX !== 0 ? `${posX}px` : posX) + ' ' +
                (posY !== 0 ? `${posY}px` : posY)
              }))
            ;

        if(sprite.includeSize) {
          _rule.append(
            postcss.decl({
              prop: 'height',
              value: height !== 0 ? `${height}px` : height
            }),
            postcss.decl({
              prop: 'width',
              value: width !== 0 ? `${width}px` : width
            })
          );
        }

        css.insertAfter(position || rule, _rule);
        position = _rule;
      });

      rule
        .append(
          postcss.decl({
            prop: 'display',
            value: 'inline-block'
          }),
          postcss.decl({
            prop: 'overflow',
            value: 'hidden'
          }),
          postcss.decl({
            prop: 'background-image',
            value: 'url("' + sprite.url + '")'
          })
        )
      ;

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

      css.walkRules(new RegExp(configs.NAMESPACE), rule => {

        if(!CYSpriter.hasMandatoryDeclarations(rule)) {
          log('Skip missed property "cy-src".', options.verbose);
          return;
        }

        var dirName = rule.nodes
          .filter(s => s.prop === configs.sourceKey).pop().value;
        dirName = path.normalize(dirName.replace(/(')|(")/g, ''));
        dirName = path.resolve(options.src, dirName);

        var stats;
        try {
          stats = fs.lstatSync(dirName);
          if(!stats.isDirectory()) {
            throw 'not a directory';
          }
        } catch(e) {
          log('Skip ' + dirName + ' - is not a directory.', options.verbose);
          return;
        }

        let sprite = CYSprite(rule, dirName, options);

        fs.readdirSync(dirName).forEach((filename) => {
          if(!(~configs.whitelist.indexOf(path.extname(filename)))) {
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
