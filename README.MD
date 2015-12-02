# postcss_cyspriter [![Build Status][ci-img]][ci]

[PostCSS] plugin: Create your own sprite using a pure css rule.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/GITHUB_NAME/PLUGIN_NAME.svg
[ci]:      https://travis-ci.org/GITHUB_NAME/PLUGIN_NAME

```css
.cy-icons {
    /* Input example */
    cy-src: icons;
}
```

```css
.icons,
.icons-imagename,
.icons-imagename:hover {
    /* Output example */
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
    padding: 10, 
    includeSize: true,
    verbose: true,
    retina: true
  }) 
])
```

See [PostCSS] docs for examples for your environment.
