'use strict';

import * as _ from 'lodash';
import * as p from 'path';
import { computeSelector } from '../helpers/utils.js';

class CYImage {
  constructor(filename, dir, sprite) {
    this.sprite = sprite;

    this.path = p.resolve(dir, filename);
    this.file = p.parse(this.path);

    this._inputDir = dir;
    this.name = this.file.name;

    this._position = {
      x: 0,
      y: 0
    };
    this._size = {
      width: 0,
      height: 0
    };

    let _selector = computeSelector(this.file.name);
    this.selector = `${sprite.selector}-${_selector}`;
    this.rule = null;
  }

  get size() {
    return this._size;
  }

  set size(size) {
    this._size = size;
  }

  get position() {
    return this._position;
  }

  set position(position) {
    this._position = position;
  }

  static Factory(name, path, sprite) {
    return new CYImage(name, path, sprite);
  }
}

export default CYImage.Factory;
