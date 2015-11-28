'use strict';

import * as _ from 'lodash';
import * as p from 'path';
import u from 'url';
import configs from '../configs/default.js';
const EXT = 'png';

class CYSprite {
  constructor(rule, path, options) {
    this.originalSelector = rule.selector;
    this.selector = rule.selector.replace(configs.NAMESPACE, '');
    this.name = this.selector.substring(1);
    this._inputDir = path;
    this._outputDir = options.dest;
    this.filename = `${this.name}.${EXT}`;
    this.output = p.resolve(this._outputDir, this.filename);
    this.url = CYSprite.makeUrl(
        this.filename, this._outputDir, options.httpDest, options.relativeTo
    );

    this._padding = options.padding;

    this._size = {
      width: 0,
      height: 0
    };

    this._images = {
      pathList: [],
      imageList: []
    };

    this.rule = rule;
  }

  get size() {
    return this._size;
  }

  set size(size) {
    this._size = size;
  }

  get padding() {
    return this._padding;
  }

  set padding(padding) {
    this._padding = padding;
  }

  get imageList() {
    return this._images.imageList;
  }

  get imagePaths() {
    return this._images.pathList;
  }

  addImage(image) {
    this._images.pathList.push(image._inputDir);

    image.selector = this.selector + '-' + image.file.name;
    image.sprite = this;

    this._images.imageList.push(image);
  }

  getImage(absPath) {
    for (var i = 0, l = this._images.imageList.length; i < l; i++) {
      var obj = this._images.imageList[i];
      if(obj.absPath === absPath)
        return obj;
    }
    return false;
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
