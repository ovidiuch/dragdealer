module.exports = function(grunt) {
  var browsers = [{
    browserName: "chrome",
    platform: "OS X 10.8"
  }, {
    browserName: "chrome",
    platform: "XP"
  }, {
    browserName: "chrome",
    platform: "linux"
  }, {
    browserName: "firefox",
    version: "19",
    platform: "XP"
  }, {
    browserName: "safari",
    version: "6",
    platform: "OS X 10.8"
  }, {
    browserName: "opera",
    platform: "Windows 2008",
    version: "12"
// Tests pass on IE6, but a misc error is thrown. TODO: Sort out with SauceLabs
//  }, {
//    browserName: "internet explorer",
//    platform: "XP",
//    version: "6"
  }, {
    browserName: "internet explorer",
    platform: "XP",
    version: "7"
  }, {
    browserName: "internet explorer",
    platform: "XP",
    version: "8"
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
    connect: {
      server: {
        options: {
          base: "",
          port: 9999
        }
      }
    },
    'saucelabs-jasmine': {
      all: {
        options: {
          urls: ["http://127.0.0.1:9999/#runner"],
          tunnelTimeout: 5,
          build: process.env.TRAVIS_JOB_ID,
          concurrency: 3,
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
  grunt.registerTask("test", ["connect", "saucelabs-jasmine"]);
};
