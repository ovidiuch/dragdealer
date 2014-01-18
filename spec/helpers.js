var helpers = {

  initDragdealer: function(dragdealerId, options) {
    loadFixtures(dragdealerId + '.html');
    loadStyleFixtures(dragdealerId + '.css');

    return new Dragdealer(dragdealerId, options);
  },

  dragTo: function(dragdealerId, x, y, handleClass) {
    var $wrapper = $('#' + dragdealerId),
        $handle = $wrapper.find('.' + (handleClass || 'handle')),
        wrapperPosition = $wrapper.offset(),
        handlePosition = $handle.offset();

    // Move to current handle position and press
    $handle.simulate('mousemove', {
      clientX: handlePosition.left,
      clientY: handlePosition.top
    });

    $handle.simulate('mousedown');
    $handle.simulate('mousemove', {
      clientX: wrapperPosition.left + x,
      clientY: wrapperPosition.top + y
    });

    // Dragdealer internal animation delay is 25ms (this should be fixed and
    // dragdealer should be updated instantly on mousemove or mouseup)
    jasmine.Clock.tick(25);
  },

  drop: function(dragdealerId, x, y, handleClass) {
    var $handle = $('#' + dragdealerId).find('.' + (handleClass || 'handle'));
    $handle.simulate('mouseup');
  }
};
