Dragdealer.js [![Build Status](https://travis-ci.org/skidding/dragdealer.png?branch=master)](https://travis-ci.org/skidding/dragdealer)
====
Drag-based JavaScript component, embracing endless UI solutions

Specs & (sweet) demos: __http://skidding.github.io/dragdealer__

## Install

The basic way to install Dragdealer is to include the [minified](https://cdnjs.cloudflare.com/ajax/libs/dragdealer/0.9.8/dragdealer.min.js)
script into your web page.

You can check the [examples](/examples) to see how you can add a particular slider from the demo to your own project.

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

### Sauce Labs and PhantomJS

Run the `./node_modules/.bin/grunt test` grunt task to run the tests from the terminal.

If you have SauceLabs credentials (SAUCE_USERNAME and SAUCE_ACCESS_KEY), tests will run there, otherwise the task will fall back to PhantomJS.
You can also force grunt to run the tests one way or the other using the `test-phantomjs` and `test-saucelabs` tasks.

## Minifying

`node_modules/.bin/uglifyjs src/dragdealer.js -o src/dragdealer.min.js`

Make sure you ran `npm install` in the project directory first. Also, you can use global paths if you have the npm modules installed globally (-g), but you shouldn't _need_ to.

## Contributing

There's no contributing guide so far, but you're more than welcome to [start a discussion.](https://github.com/skidding/dragdealer/issues)
