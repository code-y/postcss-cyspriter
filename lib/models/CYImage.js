'use strict';

import * as _ from 'lodash';
import * as p from 'path';

class CYImage {
  constructor(name, path) {
    this.name = name;
    this.path = path;
    this.absPath = p.resolve(path);
    this._position = {
      x: 0,
      y: 0
    };
    this._size = {
      width: 0,
      height: 0
    };
  }
  get size() {
    return this._size;
  }
  set size(size) {
    this._size = size;
  }
  get position() {
    console.log('getp',this._position);
    return this._position;
  }
  set position(position) {
    console.log('setp',position);
    this._position = position;
  }
  buffer() {
    return;
  }
  static Factory(name, path) {
    return new CYImage(name, path);
  }
}

export default CYImage.Factory;
