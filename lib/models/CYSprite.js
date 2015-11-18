'use strict';

import * as _ from 'lodash';

class CYSprite {
  constructor(name, path) {
    this.name = name;
    this.path = path;
    this._padding = 5;
    this._size = {
      width: 0,
      height: 0
    };
    this._images = {
      pathList: [],
      imageList: []
    };
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

  static Factory(name, path) {
    return new CYSprite(name, path);
  }
}

export default CYSprite.Factory;
