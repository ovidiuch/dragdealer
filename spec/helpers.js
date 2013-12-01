var helpers = {

  initDragdealer: function(dragdealerId, options) {
    loadFixtures(dragdealerId + '.html');
    loadStyleFixtures(dragdealerId + '.css');

    new Dragdealer(dragdealerId, options);
  },

  dragTo: function(dragdealerId, x, y) {
    var $handle = $('#' + dragdealerId).find('.handle'),
        curPosition = $handle.offset();

    // Move to current handle position and press
    $handle.simulate('mousemove', {
      clientX: curPosition.left,
      clientY: curPosition.top
    });

    $handle.simulate('mousedown');
    $handle.simulate('mousemove', {
      clientX: curPosition.left + (x || 0),
      clientY: curPosition.top + (y || 0)
    });

    // Dragdealer internal animation delay is 25ms (this should be fixed and
    // dragdealer should be updated instantly on mousemove or mouseup)
    jasmine.Clock.tick(26);
  },

  drop: function(dragdealerId, x, y) {
    var $handle = $('#' + dragdealerId).find('.handle');
    $handle.simulate('mouseup');
  }
};
