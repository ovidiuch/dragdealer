$(function() {
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
})
