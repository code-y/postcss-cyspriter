'use strict';

import * as util from 'util';

const MAGIC_SELECTORS = [
  'hover',
  'active',
  'target',
  'focus'
];
const MAGIC_SELECTOR_DIVIDER = '_';

const DEFAULT_LAYOUT = 'smart';
const LAYOUT = {
  vertical: 'top-down',
  horizontal: 'left-right',
  diagonal: 'diagonal',
  smart: 'binary-tree',
  default: DEFAULT_LAYOUT
};

export var SPRITE_LAYOUT = LAYOUT;

export { default as logger } from './Logger';

export function isTruthy(value) {
  return ((value || '').toString().toLowerCase() === 'true');
}

export function computeSelector(input) {
  let selector = input.split(MAGIC_SELECTOR_DIVIDER);
  let matches = MAGIC_SELECTORS.indexOf(selector[1]) > -1;

  if(matches) {
    input = selector.join(':');
  }

  return input;
}

export function calcImagePosition(position, layout) {
  let {x, y} = position;

  if(!x && !y) {
    return {x, y};
  }

  if(layout === 'vertical') {
    (y === 0) || (y = -y);
  }

  if(layout === 'horizontal') {
    (x === 0) || (x = -x);
  }

  if(layout === 'diagonal' || layout === 'smart') {
    (x === 0) || (x = -x);
    (y === 0) || (y = -y);
  }

  (x === 0) || (x += 'px');
  (y === 0) || (y += 'px');

  return {x, y};
}
