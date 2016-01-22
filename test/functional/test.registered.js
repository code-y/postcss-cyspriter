'use strict';

import cyspriter from '../../lib/';
import * as pkg from '../../package.json';

describe('Postcss plugin registered', () => {
  it('Postcss correctly used registered', (done) => {
    let postcssVersion = cyspriter().postcssVersion;
    postcssVersion.should.be.ok();
    done();
  });

  it('Postcss name registered', (done) => {
    let postcssName = cyspriter().postcssPlugin;
    postcssName.should.be.equal(pkg.name);
    done();
  });
});
