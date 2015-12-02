'use strict';

import * as util from 'util';

const MAGIC_SELECTORS = [
  'hover',
  'active',
  'target',
  'focus'
];
const MAGIC_SELECTOR_DIVIDER = '_';

const DEFAULT_LAYOUT = 'binary-tree';
const LAYOUT = {
  vertical: 'top-down',
  horizontal: 'left-right',
  diagonal: 'diagonal',
  smart: DEFAULT_LAYOUT,
  default: DEFAULT_LAYOUT
};

export var SPRITE_LAYOUT = LAYOUT;

export default function log(message, verbose) {
  if (message && verbose) {
    util.log(util.format('[postcss-cysprites] => %s', message));
  }
}

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
