$(function() {
  var availHeight = $('.content-body').outerHeight() -
                    $('.content-mask').outerHeight();

  new Dragdealer('content-scroller', {
    horizontal: false,
    vertical: true,
    yPrecision: availHeight,
    animationCallback: function(x, y) {
      $('.content-body').css('margin-top', -y * availHeight);
    }
  });
})
