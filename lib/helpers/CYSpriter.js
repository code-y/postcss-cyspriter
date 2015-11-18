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

const NAMESPACE = configs.NAMESPACE;

class CYSpriter {

  /**
   * Checks if rule passed is a cy sprite rule
   *
   * @param {Object} rule
   * @returns {Boolean}
   */
  static isSpriteRule(rule) {
    var res = (new RegExp('\.' + NAMESPACE + '(.+)', 'gi')).test(rule.selector);
    if (res) {
      res = false;
      for (var i = 0, l = rule.nodes.length; i < l; i++) {
        if (rule.nodes[i].prop === configs.sourceKey) {
          res = true;
          break;
        }
      }
    }
    return res;
  }

  /**
   * Make sprite path to save
   *
   * @param {CYSprite} sprite
   * @param {String} dir
   * @returns {Boolean}
   */
  static makeSpritePath(sprite, dir) {
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
    var ext = '.png';
    return path.join(dir, sprite.name.replace(/^(\.)|(#)/, '') + ext);
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

      spritesmith(config, (err, results) => {
        if(err)
          return reject(err);

        return resolve([sprite, options, results]);
      });
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
      return Q.nfcall(fs.writeFile, CYSpriter.makeSpritePath(sprite, options.dest), new Buffer(sprites.image, 'binary'))
        .then(() => {
          log('Spritesheet '+ sprite.name +' generated.', options.verbose);

          return resolve([sprite, options, sprites]);
        }).catch((err) => reject(err));
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

      css.walkRules(rule => {
        let isSprite = CYSpriter.isSpriteRule(rule);
        //console.log('isSprite?', isSprite, NAMESPACE, rule.selector);

        if (!isSprite) {
          return;
        }

        var src = rule.nodes.filter(s => s.prop === configs.sourceKey).pop();

        src = path.normalize(src.value.replace(/(')|(")/g, ''));
        var folderPath = path.resolve(options.src, src);
        var stats;
        try {
          stats = fs.lstatSync(folderPath);
          if (!stats.isDirectory()) {
            throw 'not a directory';
          }
        } catch (e) {
          log('Skip ' + folderPath + ' - is not a directory.', options.verbose);
          return;
        }

        let sprite = CYSprite(rule.selector, options.src);

        fs.readdirSync(folderPath).forEach((v) => {
          if (!(~configs.whitelist.indexOf(path.extname(v))))
            sprite.addImage(CYImage(v, path.join(folderPath, v)));
        });

        sprites.push(sprite);
      });

      return resolve([sprites, options]);
    });
  }
}

export default CYSpriter;
