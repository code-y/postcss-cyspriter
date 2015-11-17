var Promise = require('bluebird');
var configs = require('../configs/default.js');

const NAMESPACE = configs.NAMESPACE;

const NO_SPRITES = 'No Sprites Found';

class Cyspriter {
  constructor() {}

  isSprite(rule) {
    var res = (new RegExp(NAMESPACE)).test(rule.selector);

    return res;
  }

  study(css, result) {
    var sprites = [];

    return new Promise((resolve, reject) => {

      css.walkRules(rule => {
        let isSprite = this.isSprite(rule);
        console.log('isSprite?', isSprite, NAMESPACE, rule.selector);

        if(isSprite) {
          sprites.push(rule);
        }
      });

      return resolve(sprites);
    });
  }
}

module.exports = new Cyspriter();
