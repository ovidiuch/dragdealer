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
    $(document).simulate('mousemove', {
      clientX: handlePosition.left,
      clientY: handlePosition.top
    });

    $handle.simulate('mousedown');
    $(document).simulate('mousemove', {
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
  },

  touchDragTo: function(dragdealerId, x, y, handleClass) {
    var $wrapper = $('#' + dragdealerId),
        $handle = $wrapper.find('.' + (handleClass || 'handle')),
        wrapperPosition = $wrapper.offset(),
        handlePosition = $handle.offset(),
        result;

    // Move to current handle position and start touch
    simulateTouchEvent($handle.get(0), 'touchstart', {
      pageX: handlePosition.left,
      pageY: handlePosition.top
    });

    result = simulateTouchEvent($wrapper.get(0), 'touchmove', {
      pageX: wrapperPosition.left + x,
      pageY: wrapperPosition.top + y
    });

    jasmine.Clock.tick(25);

    // Return the result of touchmove event dispatch
    // to check if it was canceled or not
    return result;
  },

  touchDrop: function(dragdealerId, x, y, handleClass) {
    var $handle = $('#' + dragdealerId).find('.' + (handleClass || 'handle'));
    simulateTouchEvent($handle.get(0), 'touchend');
  }

};

function simulateTouchEvent(element, type, touchOptions) {
  var event = document.createEvent('UIEvent');
  event.initUIEvent(type, true, type !== 'touchcancel', window, 0);
  if (touchOptions) {
    event.touches = [touchOptions];
  }
  return element.dispatchEvent(event);
}
