$(function() {
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 250;

  jasmine.getFixtures().fixturesPath =
  jasmine.getStyleFixtures().fixturesPath = 'spec/fixtures';

  var jsReporter = new jasmine.JSReporter(),
      htmlReporter = new jasmine.HtmlReporter();
  jasmineEnv.addReporter(jsReporter);
  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };
  jasmineEnv.execute();
});
