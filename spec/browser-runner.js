$(function() {
  var jasmineEnv = jasmine.getEnv();
  var jsReporter = new jasmine.JSReporter(),
      htmlReporter = new jasmine.HtmlReporter();
  jasmineEnv.addReporter(jsReporter);
  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };
  jasmineEnv.execute();
});
