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

##Options

Postcss-cyspriter comes with a hierarchical configuration structure, this means that each single sprite can inherit and override almost all configurations.

Option      | Type     | description
____________|__________|____________
src         | string   | The full (or relative) path to the directory where sprites-folders are kept.
dest        | string   | The full (or relative) path to the directory where the generated sprite must be saved.


See [PostCSS] docs for examples for your environment.
