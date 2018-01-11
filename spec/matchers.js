var matchers = {
  toHavePosition: function() {
    return {
      compare: function(actual, x, y, handleClass) {
        var $handle = $('#' + actual).find('.' + (handleClass || 'handle')),
            position = $handle.position();

        return {
          pass: position.left == x && position.top == y,
          message:
            "Expected " + position.left + ", " + position.top +
            " to be " + x + ", " + y
        };
      }
    };
  }
};
