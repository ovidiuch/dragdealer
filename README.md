Dragdealer.js [![Build Status](https://travis-ci.org/skidding/dragdealer.png?branch=master)](https://travis-ci.org/skidding/dragdealer)
===
Drag-based JavaScript component, embracing endless UI solutions

Specs & (sweet) demos: __http://skidding.github.io/dragdealer__

## Install

The basic way to install Dragdealer is to include the [minified](https://raw.github.com/skidding/dragdealer/master/lib/dragdealer.min.js)
script into your web page.

### Node package

It can also be installed through [npm](https://www.npmjs.org/package/dragdealer),
using something like [browserify.](https://github.com/substack/node-browserify)

```js
var Dragdealer = require('dragdealer').Dragdealer;
```

## Running tests

Dragdealer has CI set up through [Travis CI](https://travis-ci.org) and [Sauce Labs](https://saucelabs.com) (who both offer their outstanding services for free to open-source projects.) Any pull-request will be tested automatically after each commit.

You can also run the tests by hand, of course.

### Fire up the browser

Just load index.html in a browser of choice and pull the top slider to the right or access URL with the `/#runner` hashtag directly. Example: http://skidding.github.io/dragdealer/#runner

You can start a web server using the `./node_modules/.bin/grunt dev` task, which will make the project available at [localhost:9999](http://localhost:9999)

### Sauce Labs

If you have SauceLabs credentials (SAUCE_USERNAME and SAUCE_ACCESS_KEY), run the `./node_modules/.bin/grunt test` grunt task and everything will be taken care of.

## Minifying

`./node_modules/.bin/uglifyjs src/dragdealer.js -o lib/dragdealer.min.js`

Make sure you ran `npm install` in the project directory first. Also, you can use global paths if you have the npm modules installed globally (-g), but you shouldn't _need_ to.

## Contributing

There's no contributing guide so far, but you're more than welcome to [start a discussion.](https://github.com/skidding/dragdealer/issues)
