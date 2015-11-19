'use strict';

import * as _ from 'lodash';
import * as p from 'path';
import * as configs from '../configs/default.js';


class CYSprite {
  constructor(name, path) {
    this.name = name;
    this.path = path;
    this.absPath = p.resolve(path);
    this.file = p.parse(this.absPath);
    this._padding = 5;
    this._size = {
      width: 0,
      height: 0
    };
    this._images = {
      pathList: [],
      imageList: []
    };

    this.selector = name.replace(configs.NAMESPACE, '');
    this.rule = null;
    this.originalRule = null;
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
    this._images.pathList.push(image.path);

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


  prepare(rule) {
    //console.log('rule', rule);
    this.originalRule = rule;

    this.rule = {

    };
  }

  static Factory(name, path) {
    return new CYSprite(name, path);
  }
}

export default CYSprite.Factory;
