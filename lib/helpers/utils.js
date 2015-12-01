'use strict';

import * as util from 'util';

export default function log(message, verbose) {
  if (message && verbose) {
    util.log(util.format('[postcss-cysprites] => %s', message));
  }
}

export function isTruthy(value) {
  return ((value || '').toString().toLowerCase() === 'true');
}

const MAGIC_SELECTORS = [
  'hover',
  'active',
  'target',
  'focus'
];
const MAGIC_SELECTOR_DIVIDER = '_';

export function computeSelector(filename) {

  let matches = MAGIC_SELECTORS.indexOf(`${MAGIC_SELECTOR_DIVIDER}${filename}`) > -1;
  console.log('pre', filename);
  if(matches) {
    console.log('inner', filename);
    filename = filename.split(MAGIC_SELECTOR_DIVIDER).join(':');
  }
  console.log('post', filename);

  return filename;
}
