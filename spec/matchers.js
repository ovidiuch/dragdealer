var matchers = {

  toHavePosition: function(x, y, handleClass) {
    var $handle = $('#' + this.actual).find('.' + (handleClass || 'handle')),
        position = $handle.position();
    this.message = function() {
      return "Expected " + position.left + ", " + position.top +
             " to be " + x + ", " + y;
    };
    return position.left == x && position.top == y;
  }
};
