var Promise = require('bluebird');
var configs = require('../configs/default.js');

const NAMESPACE = configs.NAMESPACE;

class CYSpriter {
  constructor() {}

  isSpriteRule(rule) {
    var res = (new RegExp(NAMESPACE)).test(rule.selector);

    return res;
  }

  study(css, result) {
    var sprites = [];

    return new Promise((resolve, reject) => {

      css.walkRules(rule => {
        let isSprite = this.isSpriteRule(rule);
        console.log('isSprite?', isSprite, NAMESPACE, rule.selector);

        if(isSprite) {
          sprites.push(rule);
        }
      });

      return resolve(sprites);
    });
  }
}

module.exports = new CYSpriter();
