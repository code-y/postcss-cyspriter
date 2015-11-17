'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Promise = require('bluebird');
var configs = require('../configs/default.js');

var NAMESPACE = configs.NAMESPACE;

var NO_SPRITES = 'No Sprites Found';

var Cyspriter = (function () {
  function Cyspriter() {
    _classCallCheck(this, Cyspriter);
  }

  _createClass(Cyspriter, [{
    key: 'isSprite',
    value: function isSprite(rule) {
      var res = new RegExp(NAMESPACE).test(rule.selector);

      return res;
    }
  }, {
    key: 'study',
    value: function study(css, result) {
      var _this = this;

      var sprites = [];

      return new Promise(function (resolve, reject) {

        css.walkRules(function (rule) {
          var isSprite = _this.isSprite(rule);
          console.log('isSprite?', isSprite, NAMESPACE, rule.selector);

          if (isSprite) {
            sprites.push(rule);
          }
        });

        return resolve(sprites);
      });
    }
  }]);

  return Cyspriter;
})();

module.exports = new Cyspriter();
//# sourceMappingURL=../sourcemaps/models/Cyspriter.js.map
