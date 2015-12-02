'use strict';

import * as _ from 'lodash';
import * as p from 'path';
import u from 'url';
import configs from '../configs/default.js';
import { isTruthy } from '../helpers/utils.js';
import { SPRITE_LAYOUT } from '../helpers/utils.js';
const EXT = 'png';

class CYSprite {
  constructor(rule, path, options) {
    options = CYSprite.mergeOptions(rule, options);

    this.originalSelector = rule.selector;
    this.selector = rule.selector.replace(configs.NAMESPACE, '');
    this.name = this.selector.substring(1);
    this.filename = `${this.name}.${EXT}`;
    this._inputDir = path;
    this._outputDir = options.dest;
    this.output = p.resolve(this._outputDir, this.filename);
    this.url = CYSprite.makeUrl(
        this.filename, this._outputDir, options.httpDest, options.relativeTo
    );

    this._size = {
      width: 0,
      height: 0
    };

    this._images = {
      pathList: [],
      imageList: []
    };

    this.rule = rule;
    this._options = options;
    this.cacheBuster = options.lastRun.getTime()
  }

  get size() {
    return this._size;
  }

  set size(size) {
    this._size = size;
  }

  get includeSize() {
    return this._options.includeSize;
  }

  get isRetina() {
    return this._options.retina;
  }

  get padding() {
    return this._options.padding;
  }

  get layout() {
    return this._options.layout;
  }

  get imageList() {
    return this._images.imageList;
  }

  get imagePaths() {
    return this._images.pathList;
  }

  addImage(image) {
    this._images.pathList.push(image.path);

    image.sprite = this;

    this._images.imageList.push(image);
  }

  getImage(absPath) {
    for (var i = 0, l = this._images.imageList.length; i < l; i++) {
      var image = this._images.imageList[i];
      if(image.path === absPath)
        return image;
    }
    return false;
  }

  static mergeOptions(rule, options) {
    let _options = _.merge({}, options, {
      layout: SPRITE_LAYOUT.default
    });

    rule.walkDecls(new RegExp(configs.NAMESPACE), function(decl) {
      let prop = (decl.prop || '')
        .replace(/(')|(")/gi, '')
        .replace(configs.NAMESPACE, '')
        .replace(/^-/, '')
        .toLowerCase()
      ;

      let value = (decl.value || '')
        .replace(/(')|(")/gi, '')
        .toLowerCase()
      ;

      switch(prop) {
        case 'padding':
          let padding = parseFloat(value);
          isNaN(padding) || (_options.padding = padding);
          break;

        case 'retina':
          _options.retina = isTruthy(value);
          break;

        case 'layout':
          _options.layout = SPRITE_LAYOUT[value] || SPRITE_LAYOUT.default;
          console.log(value);
          break;

        case 'include-size':
        case 'includesize':
          _options.includeSize = isTruthy(value);
          break;
      }

      decl.remove();
    });

    return _options;
  }

  static makeUrl(filename, outputDir, httpDest, relativeTo) {
    let url;

    if(httpDest) {
      if(httpDest[httpDest.length - 1] !== '/')
        httpDest += '/';

      url = u.resolve(httpDest, filename);
    } else {
      url = p.join(p.relative(relativeTo, outputDir), filename);
    }

    return url;
  }

  static Factory(rule, path, options) {
    return new CYSprite(rule, path, options);
  }
}

export default CYSprite.Factory;
