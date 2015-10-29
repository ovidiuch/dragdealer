$(function() {
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
})
