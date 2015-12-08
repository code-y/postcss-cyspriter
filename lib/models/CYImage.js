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
    this._cssPosition = '';
    this._cssBackgroundSize = '';

    let _selector = computeSelector(this.file.name);
    this.selector = `${sprite.selector}-${_selector}`;
  }

  get size() {
    return this._size;
  }

  set size(size) {
    this._size = size;

    let {width, height} = size;

    width = this.sprite.isRetina ? width / this.sprite.ratio : width;
    height = this.sprite.isRetina ? height / this.sprite.ratio : height;

    this.cssBackgroundSize = `${width + 'px'} ${height + 'px'}`;
  }

  get cssBackgroundSize() {
    return this._cssBackgroundSize;
  }

  set cssBackgroundSize(size) {
    this._cssBackgroundSize = size;
  }

  get position() {
    return this._position;
  }

  set position(position) {
    this._position = position;

    let {x, y} = position;

    x = (this.sprite.isRetina ? x / this.sprite.ratio : x) * -1;
    y = (this.sprite.isRetina ? y / this.sprite.ratio : y) * -1;

    this.cssPosition = `${x ? x + 'px' : x} ${y ? y + 'px' : y}`;
  }

  get cssPosition() {
    return this._cssPosition;
  }

  set cssPosition(position) {
    this._cssPosition = position;
  }

  static Factory(name, path, sprite) {
    return new CYImage(name, path, sprite);
  }
}

export default CYImage.Factory;
