# postcss-cyspriter 

[PostCSS] plugin that creates sprites using css rules prefixed by `cy-`.

[PostCSS]: https://github.com/postcss/postcss

What you need is just write your css rule using `cy-` prefix and assign it the `cy-src` required declaration. That's All. 

```css
/* Input example */
.cy-[className] {
    cy-src: [folderName];
}
```

```css
/* Output example */
.className,
.className-imagename {
    background-image: url("/[httpDest]/[spriteName].png[?cacheBuster]");
}

.className-imagename {
  background-position: 168px 171px;
}
```

## Usage

### Installation

```bash
$ npm install [--save] postcss-cyspriter
```

### Configuration
```js
let cyspriterOptions = {
    src: './examples/images',
    dest: './examples/sprites',
    relativeTo: './examples/dist'
  };
  
postcss([ 
  require('postcss-cyspriter', cyspriterOptions) 
])
```

## Options

### Required
#### Global
 - **src** {string} - Full (or relative) file system path where sprite-folders are kept. 
 - **dest** {string} - Full (or relative) file system path where generated sprites must be saved
 - **relativeTo** {string} - Full (or relative) file system path usable in output css

#### Local
 - cy-src {string} - The directory name that contains all images that will composite the sprite, this property will be merged with the global `src`option (` src = path.join(global.src, src); `)
 
### Optional
 
 - **verbose** {boolean} [verbose = false] - Decides whether or not to print additional debug info in console
 - **httpDest** {string} [httpDest = ''] - Full web server path where generated sprites are deployed, if provided the *relativeTo option* will be ignored
 - **padding** {integer} [padding = 0] - Spacing in pixel between each image
 - **retina** {boolean} [retina = false] - Allows support for retina displays
 - **includeSize** {boolean} [includeSize = true] - Decides whether or not to include the dimensions in the output rules
 - **decorate** {boolean} [decorate = true] - Decides whether or not to include useful declarations in the output rules
 - **layout** [string] [layout = 'smart'] - Sets the layout of the generated sprite. Possible values are: `'diagonal'`,  `'vertical'`, `'horizontal'`, `'smart'`

#### NOTE: except for all required, *httpDest* and *verbose* options, each option can be overridden for sprite instance using the `cy-` prefix. Example:
```css
.cy-icons {
	cy-src: 'icons';
	cy-padding: 5px;
	cy-include-size: false;
	cy-layout: 'vertical';
	...
}
```

#### NOTE: magic selectors are supported.
If cyspriter founds an image with (hover|active|focus|target) in the filename, a pseudo-selector will be generated. Example:

considering a filename as follows: `foo_active.png`;

cyspriter generates a rule like this:

```css
.[spritemap]-foo:active { ... }
```

---------
See [PostCSS] docs for examples for your environment.
