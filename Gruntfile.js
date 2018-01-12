module.exports = function(grunt) {
  var browsers = [{
    browserName: "chrome",
    platform: "macOS 10.12"
  }, {
    browserName: "chrome",
    platform: "linux"
  }, {
    browserName: "safari",
    version: "7",
    platform: "OS X 10.9"
  }, {
    browserName: "internet explorer",
    platform: "VISTA",
    version: "9"
  }, {
    browserName: "internet explorer",
    platform: "WIN8",
    version: "10"
  }];

  grunt.initConfig({
    jasmine : {
      all: {
        src : 'src/**/*.js',
        options: {
          vendor: ['lib/jquery-1.10.2.js', 'lib/jasmine-jquery.js','lib/jquery.simulate.js'],
          helpers: ['spec/matchers.js','spec/helpers.js','spec/setup.js', 'spec/phantomjs-setup.js'],
          specs: 'spec/*Spec.js',
          styles: 'src/*.css',
          host: 'http://localhost:9999',
        }
      }
    },
    connect: {
      server: {
        options: {
          base: "",
          port: 9999
        }
      }
    },
    'saucelabs-custom': {
      all: {
        options: {
          urls: ["http://127.0.0.1:9999/#runner"],
          tunnelTimeout: 5,
          build: process.env.TRAVIS_JOB_ID,
          throttled: 2,
          browsers: browsers,
          testname: "pasta tests",
          tags: ["master"]
        }
      }
    },
    watch: {}
  });

  // Loading dependencies
  for (var key in grunt.file.readJSON("package.json").devDependencies) {
    if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
  }

  grunt.registerTask("dev", ["connect", "watch"]);

  grunt.registerTask("test-phantomjs", ["connect", "jasmine"]);
  grunt.registerTask("test-saucelabs", ["connect", "saucelabs-custom"]);

  if (isSauceLabsAvailableInEnvironment()) {
    grunt.registerTask("test", ["test-saucelabs"]);
  } else {
    grunt.registerTask("test", ["test-phantomjs"]);
  }
};

function isSauceLabsAvailableInEnvironment() {
  var sauceUser = process.env.SAUCE_USERNAME;
  var sauceKey = process.env.SAUCE_ACCESS_KEY;

  return !!sauceUser && !!sauceKey;
}
