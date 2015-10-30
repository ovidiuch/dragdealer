$(function() {
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
})
