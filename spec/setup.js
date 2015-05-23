$(function() {
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 250;

  jasmine.getFixtures().fixturesPath =
  jasmine.getStyleFixtures().fixturesPath = 'spec/fixtures';
});
