# postcss-cyspriter [![Build Status][ci-img]][ci]

[PostCSS] plugin: Create your own sprite using a pure css rule.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/GITHUB_NAME/PLUGIN_NAME.svg
[ci]:      https://travis-ci.org/GITHUB_NAME/PLUGIN_NAME

```css
/* Input example */
.cy-icons {
    cy-src: icons;
}
```

```css
/* Output example */
.icons,
.icons-imagename,
.icons-imagename:hover {
    background-image: url("/public/emo.png?1449070400101");
}

.icons-imagename {
  background-position: 168px 171px;
  height: 128px;
  width: 128px;
}
```

## Usage

```js
postcss([ 
  require('postcss_cyspriter', {
    src: './examples/images',
    dest: './examples/sprites',
    
    relativeTo: './examples/dist',
    // or
    httpDest: '/'
    
    padding: 10, 
    includeSize: true,
    verbose: true,
    retina: true
  }) 
])
```

## Options

| OPTION      	| TYPE    	| DESCRIPTION                                                                                                                        	|
|-------------	|---------	|------------------------------------------------------------------------------------------------------------------------------------	|
| src         	| string  	| [GLOBAL] REQUIRED - The full or relative path to the fs directory where the sprite-folders are kept                                	|
| dest        	| string  	| [GLOBAL] REQUIRED - The full or relative path to the fs directory where the sprite must be generated                               	|
| relativeTo  	| string  	| [GLOBAL] REQUIRED (ignored if httpDest is provided) - Used only in the output-css, the full or relative path to the css output dir 	|
| httpDest    	| string  	| [GLOBAL] OPTIONAL - Used only in the output-css, the full webserver path where the generated-sprites are deployed                  	|
| verbose     	| boolean 	| [GLOBAL] OPTIONAL - default `true`, provide or not additional processing info                                                      	|
| retina      	| boolean 	| OPTIONAL - default `false`, determines if the generated sprite should be optimized for retina displays                             	|
| includeSize 	| boolean 	| OPTIONAL - default `true`, determines if each generated rule must be printed with its size (width, height)                         	|

See [PostCSS] docs for examples for your environment.
