$(function() {
  new Dragdealer('main-slider', {
    // Allow page to be opened with the test results directly
    x: window.location.hash == '#runner' ? 1 : 0,
    steps: 2,
    animationCallback: function(x) {
      $('.content-slides').css('margin-left', (-x * 100) + '%');
      if (x > 0.5) {
        $('#content .slide.demo').height($('#content .slide.specs').height());
      } else {
        $('#content .slide.demo').height('auto');
      }
    }
  });
});
