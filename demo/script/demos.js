$(function() {
  new Dragdealer('demo-simple-slider');

  new Dragdealer('just-a-slider', {
    animationCallback: function(x, y) {
      $('#just-a-slider .value').text(Math.round(x * 100));
    }
  });

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

  var slideToUnlockOld = new Dragdealer('slide-to-unlock-old', {
    steps: 2,
    callback: function(x, y) {
      // Only 0 and 1 are the possible values because of "steps: 2"
      if (x) {
        this.disable();
        $('#slide-to-unlock-old').fadeOut();
        // Bring unlock screen back after a while
        setTimeout(function() {
          slideToUnlockOld.enable();
          slideToUnlockOld.setValue(0, 0, true);
          $('#slide-to-unlock-old').fadeIn();
        }, 5000);
      }
    }
  });

  var slideToUnlockNew = new Dragdealer('slide-to-unlock-new', {
    x: 1,
    steps: 2,
    loose: true,
    callback: function(x, y) {
      // Only 0 and 1 are the possible values because of "steps: 2"
      if (!x) {
        this.disable();
        $('#slide-to-unlock-new').fadeOut();
        // Bring unlock screen back after a while
        setTimeout(function() {
          slideToUnlockNew.enable();
          slideToUnlockNew.setValue(1, 0, true);
          $('#slide-to-unlock-new').fadeIn();
        }, 5000);
      }
    }
  });

  new Dragdealer('image-carousel', {
    steps: 4,
    speed: 0.3,
    loose: true
  });

  var canvasMask = new Dragdealer('canvas-mask', {
    x: 0,
    // Start in the bottom-left corner
    y: 1,
    vertical: true,
    speed: 0.2,
    loose: true
  });
  // Bind event on the wrapper element to prevent it when a drag has been made
  // between mousedown and mouseup (by stopping propagation from handle)
  $('#canvas-mask').on('click', '.menu a', function(e) {
    e.preventDefault();
    var anchor = $(e.currentTarget);
    canvasMask.setValue(anchor.data('x'), anchor.data('y'));
  });
});
