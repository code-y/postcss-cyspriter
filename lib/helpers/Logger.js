import colors from 'colors';

const APP = 'postcss-cyspriter'.toUpperCase();

class Logger {

  static info(message) {
    console.log(colors.green(APP), message);
  }

  static generated(sprite) {
    let selector = colors.blue.underline(sprite.selector);
    const log =
      console.log
        .bind(console, colors.green(APP), `Sprite ${selector} generated.`);

    if(!sprite.debug) {
      log();
      return;
    }

    log('\n', {
      dir: sprite._inputDir,
      output: sprite.output,
      date: sprite.getTime(),
      cacheId: sprite.cacheBuster,
      images: sprite.length
    })
  }

  static fatal(error) {
    console.log(
      colors.red(`${APP}:ERROR`),
      colors.bold(error.name || ''),
      '\n',
      error,
      '\n',
      error.stack
    )
  }

  static warn() {
    let logs = Array.prototype.slice.call(arguments);

    console.log(colors.yellow(`${APP}:WARNING`), ...logs);
  }
}

export default Logger;
