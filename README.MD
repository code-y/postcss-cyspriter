# postcss-cyspriter 

[PostCSS] plugin that creates sprites using css rules prefixed by `cys-`.

[PostCSS]: https://github.com/postcss/postcss

What you need is just to write your css rule using `cys-` prefix and assign it the `cys-src` required declaration. That's All.

```css
/* Input example */
.cys-[className] {
    cys-src: [folderName];
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
$ npm i [--save] postcss-cyspriter
```

### Configuration
```js
let cyspriterOptions = {
    src: './examples/images',
    dest: './examples/sprites',
    relativeTo: './examples/dist'
  };
  
postcss([ 
  require('postcss-cyspriter')(cyspriterOptions) 
])
```

## Options

### Required
#### Global
 - **src** {string} - Full (or relative) file system path where sprite-folders are kept. 
 - **dest** {string} - Full (or relative) file system path where generated sprites must be saved
 - **relativeTo** {string} - Full (or relative) file system path usable in output css

#### Local
 - cys-src {string} - The directory name that contains all images that will compose the sprite, this property will be merged with the global `src`option (` src = path.join(global.src, src); `)
 - cys-debug {boolean} - Enables debug info for sprite instance
 
### Optional
 
 - **verbose** {boolean} [verbose = false] - Decides whether or not to print additional debug info in console
 - **cacheBuster** {boolean} [cacheBuster = true] - Append a query string to the sprite to prevent cache
 - **httpDest** {string} [httpDest = ''] - Full web server path where generated sprites are deployed, if provided the *relativeTo option* will be ignored
 - **padding** {integer} [padding = 0] - Spacing in pixel between each image
 - **retina** {boolean} [retina = false] - Allows support for retina displays
 - **ratio** {number} [ratio = 2] - Defines the ratio to be applied to images retina
 - **includeSize** {boolean} [includeSize = true] - Decides whether or not to include the dimensions in the output rules
 - **decorate** {boolean} [decorate = true] - Decides whether or not to include useful declarations in the output rules
 - **layout** {string} [layout = 'smart'] - Sets the layout of the generated sprite. Possible values are: `'diagonal'`,  `'vertical'`, `'horizontal'`, `'smart'`

#### NOTE: except for *httpDest* and *verbose* options, each option can be overridden for sprite instance using the `cys-` prefix. Example:
```css
.cys-icons {
	cys-src: 'icons';
	cys-padding: 5px;
	cys-include-size: false;
	cys-layout: 'vertical';
	...
}
```

#### NOTE: magic selectors are supported.
If cyspriter finds an image with (hover|active|focus|target) in the filename, a pseudo-selector will be generated. Example:

considering a filename as follows: `foo_active.png`;

cyspriter generates a rule like this:

```css
.[spritemap]-foo:active { ... }
```


#### What's Different?.

Postcss community already has two sprite plugins:

 - https://github.com/glebmachine/postcss-easysprites
 - https://github.com/2createStudio/postcss-sprites

**Why cys-spriter is different?**

1. postcss-sprites groups all background images into a single sprite, we don't! We make sprites only when specified, our solutions is thought about building set of images, as icons for example.

2. postcss-easysprites is similar to postcss-sprites with the difference that you need to specify the sprite-map in order to pack the background-image.

3. Definitively, we built cys-spriter having in mind what compass-spriting does. For further information, you should have a look at [Compass Spriting](http://compass-style.org/help/tutorials/spriting/)

```css
.[spritemap]-foo:active { ... }
```

---------
See [PostCSS] docs for examples for your environment.


## Authors

| Contributor | Type | E-mail |
|-------------|------|--------|
| [Luca Pau](https://github.com/Lughino) | author  | <luca.pau82@gmail.com> |
| [Giuseppe Mandato](https://github.com/hitmands) | author  | <gius.mand.developer@gmail.com> |

---------
## Copyright

Copyright (c) 2015 Code-Y - Luca Pau, Giuseppe Mandato. See [LICENSE](LICENSE) for details.
