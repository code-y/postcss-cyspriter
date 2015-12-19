'use strict';

import cyspriter from '../../lib/';
import postcss from 'postcss';
import * as fs from 'fs';
import * as path from 'path';

describe('Should create a sprite with css rules', function() {
  this.timeout(5000);

  let rmDir = function rmDir(dirPath, removeSelf) {
    if (removeSelf === undefined)
      removeSelf = true;
    try {
      var files = fs.readdirSync(dirPath);
    }
    catch (e) {
      return;
    }
    if (files.length > 0)
      for (var i = 0, l = files.length; i < l; i++) {
        var filePath = dirPath + '/' + files[i];
        if (fs.statSync(filePath).isFile())
          fs.unlinkSync(filePath);
        else
          rmDir(filePath);
      }
    if (removeSelf)
      fs.rmdirSync(dirPath);
  };

  beforeEach(done => {
    rmDir(path.resolve(
      global.ROOT_TEST, 'sprites'), false);
    done();
  });

  afterEach(done => {
    rmDir(path.resolve(
      global.ROOT_TEST, 'sprites'), false);
    done();
  });

  it('Should create correctly without options not required', (done) => {
    let pluginOptions = {
      src: './test/fixtures',
      dest: './test/sprites',
      relativeTo: './test/fixtures',
      cacheBuster: false
    };
    let processCss = postcss(
      cyspriter(pluginOptions)
    );
    let css = fs
      .readFileSync(path.resolve(
        global.ROOT_TEST, 'fixtures', 'test.css'), {encoding: 'utf8'});
    let cssExpected = fs
      .readFileSync(path.resolve(
        global.ROOT_TEST, 'fixtures', 'test.expected.css'), {encoding: 'utf8'});

    processCss
      .process(css)
      .then(result => {
        let spriteCreated =
          fs.existsSync(path.resolve(global.ROOT_TEST, 'sprites', 'icons.png'));
        spriteCreated.should.be.ok();
        cssExpected.should.be.equal(result.css);

        done();
      }).catch((err) => {
      done(err);
    });
  });

  it('Should create correctly with required global options', (done) => {
    let pluginOptions = {
      src: './test/fixtures',
      dest: './test/sprites',
      relativeTo: './test/fixtures',
      cacheBuster: false
    };
    let processCss = postcss(
      cyspriter(pluginOptions)
    );
    let css = fs
      .readFileSync(path.resolve(
        global.ROOT_TEST, 'fixtures', 'test.css'), {encoding: 'utf8'});
    let cssExpected = fs
      .readFileSync(path.resolve(
        global.ROOT_TEST, 'fixtures', 'test.expected.css'), {encoding: 'utf8'});

    processCss
      .process(css)
      .then(result => {
        let spriteCreated =
          fs.existsSync(path.resolve(global.ROOT_TEST, 'sprites', 'icons.png'));
        spriteCreated.should.be.ok();
        cssExpected.should.be.equal(result.css);

        done();
      }).catch((err) => {
      done(err);
    });
  });

  it('Should create correctly with optional global options', (done) => {
    let pluginOptions = {
      src: './test/fixtures',
      dest: './test/sprites',
      relativeTo: './test/fixtures',
      cacheBuster: false,
      padding: 10,
      includeSize: false
    };
    let processCss = postcss(
      cyspriter(pluginOptions)
    );
    let css = fs
      .readFileSync(path.resolve(
        global.ROOT_TEST, 'fixtures', 'test.globOpts.css'), {encoding: 'utf8'});
    let cssExpected = fs
      .readFileSync(path.resolve(
        global.ROOT_TEST, 'fixtures', 'test.globOpts.expected.css'),
        {encoding: 'utf8'});

    processCss
      .process(css)
      .then(result => {
        let spriteCreated =
          fs.existsSync(path.resolve(global.ROOT_TEST, 'sprites', 'icons.png'));
        spriteCreated.should.be.ok();
        cssExpected.should.be.equal(result.css);

        done();
      }).catch((err) => {
      done(err);
    });
  });

  it('Should create correctly with retina and specific options for sprite',
    (done) => {
      let pluginOptions = {
        src: './test/fixtures',
        dest: './test/sprites',
        relativeTo: './test/fixtures',
        cacheBuster: false,
        padding: 10
      };
      let processCss = postcss(
        cyspriter(pluginOptions)
      );
      let css = fs
        .readFileSync(path.resolve(
          global.ROOT_TEST,
          'fixtures', 'test.spriteOpts.css'), {encoding: 'utf8'});
      let cssExpected = fs
        .readFileSync(path.resolve(
          global.ROOT_TEST, 'fixtures', 'test.spriteOpts.expected.css'),
          {encoding: 'utf8'});

      processCss
        .process(css)
        .then(result => {
          let spriteCreated =
            fs.existsSync(
              path.resolve(global.ROOT_TEST, 'sprites', 'retina.png'));
          spriteCreated.should.be.ok();
          cssExpected.should.be.equal(result.css);

          done();
        }).catch((err) => {
        done(err);
      });
    });

  it('Should create correctly with magic selector',
    (done) => {
      let pluginOptions = {
        src: './test/fixtures',
        dest: './test/sprites',
        relativeTo: './test/fixtures',
        cacheBuster: false,
        padding: 10
      };
      let processCss = postcss(
        cyspriter(pluginOptions)
      );
      let css = fs
        .readFileSync(path.resolve(
          global.ROOT_TEST,
          'fixtures', 'test.magicSelector.css'), {encoding: 'utf8'});
      let cssExpected = fs
        .readFileSync(path.resolve(
          global.ROOT_TEST, 'fixtures', 'test.magicSelector.expected.css'),
          {encoding: 'utf8'});

      processCss
        .process(css)
        .then(result => {
          let spriteCreated =
            fs.existsSync(
              path.resolve(global.ROOT_TEST, 'sprites', 'magic.png'));
          spriteCreated.should.be.ok();
          cssExpected.should.equal(result.css);

          done();
        }).catch((err) => {
        done(err);
      });
    });

  it('Should create correctly multiple sprites',
    (done) => {
      let pluginOptions = {
        src: './test/fixtures',
        dest: './test/sprites',
        relativeTo: './test/fixtures',
        cacheBuster: false,
        padding: 10
      };
      let processCss = postcss(
        cyspriter(pluginOptions)
      );
      let css = fs
        .readFileSync(path.resolve(
          global.ROOT_TEST,
          'fixtures', 'test.multi.css'), {encoding: 'utf8'});
      let cssExpected = fs
        .readFileSync(path.resolve(
          global.ROOT_TEST, 'fixtures', 'test.multi.expected.css'),
          {encoding: 'utf8'});

      processCss
        .process(css)
        .then(result => {
          let sprite1Created =
            fs.existsSync(
              path.resolve(global.ROOT_TEST, 'sprites', 'retina.png'));
          let sprite2Created =
            fs.existsSync(
              path.resolve(global.ROOT_TEST, 'sprites', 'magic.png'));
          let sprite3Created =
            fs.existsSync(
              path.resolve(global.ROOT_TEST, 'sprites', 'icons.png'));
          sprite1Created.should.be.ok();
          sprite2Created.should.be.ok();
          sprite3Created.should.be.ok();
          cssExpected.should.equal(result.css);

          done();
        }).catch((err) => {
        done(err);
      });
    });
});
