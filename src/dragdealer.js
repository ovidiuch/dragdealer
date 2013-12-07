/**
 * Dragdealer.js 0.9.5
 * http://github.com/skidding/dragdealer
 *
 * (c) 2010+ Ovidiu Cherecheș
 * http://skidding.mit-license.org
 */

var Dragdealer = function(wrapper, options) {
  /**
   * Drag-based component that works around two basic DOM elements.
   *
   *   - The wrapper: The top-level element with the .dragdealer class. We
   *                  create a Dragdealer instance with the wrapper as the
   *                  first constructor parameter (it can either receive the ID
   *                  of the wrapper, or the element itself.) The wrapper
   *                  establishes the dragging bounds.
   *
   *   - The handle: A child of the wrapper element, with a required .handle
   *                 class. This will be the dragged element, constrained by
   *                 the wrapper's bounds.
   *
   *
   * The handle can be both smaller or bigger than the wrapper.
   *
   *   - When the handle is smaller, Dragdealer will act as a regular slider,
   *     enabling the handle to be dragged from one side of the wrapper to
   *     another.
   *
   *   - When the handle is bigger, Dragdealer will act a mask for a draggable
   *     surface, where the handle is the draggable surface contrained by the
   *     smaller bounds of the wrapper. The drag action in this case is used
   *     to reveal and "discover" partial content at a time.
   *
   *
   * Simple usage:
   *
   *   // JavaScript
   *   new Dragdealer('simple-slider');
   *
   *   <!-- HTML -->
   *   <div id="simple-slider" class="dragdealer">
   *     <div class="handle">drag me</div>
   *   </div>
   *
   *
   * The second parameter of the Dragdealer constructor is an object used for
   * specifying any of the supported options. All of them are optional.
   *
   *   - bool disabled=false: Init Dragdealer in a disabled state. Implicitly,
   *                          the handle will receive a .disabled class.
   *
   *   - bool horizontal=true: Enable horizontal dragging.
   *
   *   - bool vertical=false: Enable vertical dragging.
   *
   *   - number x=0: Initial horizontal (left) position. Accepts a float number
   *                 value between 0 and 1. Read below about positioning in
   *                 Dragdealer.
   *
   *   - number y=0: Initial vertical (top) position. Accepts a float number
   *                 value between 0 and 1. Read below about positoning in
   *                 Dragdealer.
   *
   *   - number steps=0: Limit the positioning of the handle within the bounds
   *                     of the wrapper, by defining a virtual grid made out of
   *                     a number of equally-spaced steps. This restricts
   *                     placing the handle anywhere in-between these steps.
   *                     E.g setting 3 steps to a regular slider will only
   *                     allow you to move it to the left, to the right or
   *                     exactly in the middle.
   *
   *   - bool snap=false: When a number of steps is set, snap the position of
   *                      the handle to its closest step instantly, even when
   *                      dragging.
   *
   *   - bool slide=true: Slide handle after releasing it, depending on the
   *                      movement speed before the mouse/touch release. The
   *                      formula for calculating how much will the handle
   *                      slide after releasing it is defined by simply
   *                      extending the movement of the handle in the current
   *                      direction, with the last movement unit times four (a
   *                      movement unit is considered the distance crossed
   *                      since the last animation loop, which is currently
   *                      25ms.) So if you were to drag the handle 50px in the
   *                      blink of an eye, it will slide another 200px in the
   *                      same direction. Steps interfere with this formula, as
   *                      the closest step is calculated before the sliding
   *                      distance.
   *
   *   - bool loose=false: Loosen-up wrapper boundaries when dragging. This
   *                       allows the handle to be *slightly* dragged outside
   *                       the bounds of the wrapper, but slides it back to the
   *                       margins of the wrapper upon release. The formula for
   *                       calculating how much the handle exceeds the wrapper
   *                       bounds is made out of the actual drag distance
   *                       divided by 4. E.g. Pulling a slider outside its
   *                       frame by 100px will only position it 25px outside
   *                       the frame.
   *
   *   - number top=0: Top padding between the wrapper and the handle.
   *
   *   - number bottom=0: Bottom padding between the wrapper and the handle.
   *
   *   - number left=0: Left padding between the wrapper and the handle.
   *
   *   - number right=0: Right padding between the wrapper and the handle.
   *
   *   - fn callback(x, y): Called when releasing handle, with the projected
   *                        x, y position of the handle. Projected value means
   *                        the value the slider will have after finishing a
   *                        sliding animation, caused by either a step
   *                        restriction or drag motion (see steps and slide
   *                        options.) This implies that the actual position of
   *                        the handle at the time this callback is called
   *                        might not yet reflect the x, y values received.
   *
   *   - fn animationCallback(x, y): Called every animation loop, as long as
   *                                 the handle is being dragged or in the
   *                                 process of a sliding animation. The x, y
   *                                 positional values received by this
   *                                 callback reflect the exact position of the
   *                                 handle DOM element, which includes
   *                                 exceeding values (possibly even nagative
   *                                 ones,) when the loose option is set true.
   *
   *
   * Dragdealer also has a few methods to interact with post-initialization.
   *
   *   - disable: Disable dragging of a Dragdealer instance. Just as with the
   *              disabled option, the handle will receive a .disabled class
   *
   *   - enable: Enable dragging of a Dragdealer instance. The .disabled class
   *             of the handle will be removed.
   *
   *   - setValue(x, y, snap=false): Set the value of a Dragdealer instance
   *                                 programatically. The 3rd parameter allows
   *                                 to snap the handle directly to the desired
   *                                 position, without any sliding animation.
   *
   *   - setStep(x, y, snap=false): Same as setValue, but instead of receiving
   *                                the x, y position as a [0, 1] ratio, it
   *                                accepts a step number. The position will be
   *                                calculated based on the number of steps the
   *                                instance is set to.
   *
   *
   * Positioning in Dragdealer:
   *
   *   Besides the top, bottom, left and right paddings, which represent a
   *   number of pixels, Dragdealer uses a [0, 1]-based positioning. Both
   *   horizontal and vertical positions are represented by ratios between 0
   *   and 1. This allows the Dragdealer wrapper to have a responsive size and
   *   not revolve around a specific number of pixels. This is how the x, y
   *   options are set, what the callback args contain and what values the
   *   setValue method expects. Once picked up, the ratios can be scaled and
   *   mapped to match any real-life system of coordinates or dimensions.
   */
  if (typeof(wrapper) == 'string') {
    wrapper = document.getElementById(wrapper);
  }
  if (!wrapper) {
    return;
  }
  var handle = wrapper.getElementsByTagName('div')[0];
  if (!handle || handle.className.search(/(^|\s)handle(\s|$)/) == -1) {
    return;
  }
  this.init(wrapper, handle, options || {});
  this.setup();
};
Dragdealer.prototype = {
  init: function(wrapper, handle, options) {
    this.wrapper = wrapper;
    this.handle = handle;
    this.options = options;

    this.disabled = this.getOption('disabled', false);
    this.horizontal = this.getOption('horizontal', true);
    this.vertical = this.getOption('vertical', false);
    this.slide = this.getOption('slide', true);
    this.steps = this.getOption('steps', 0);
    this.snap = this.getOption('snap', false);
    this.loose = this.getOption('loose', false);
    this.speed = this.getOption('speed', 10) / 100;
    this.xPrecision = this.getOption('xPrecision', 0);
    this.yPrecision = this.getOption('yPrecision', 0);

    this.callback = options.callback || null;
    this.animationCallback = options.animationCallback || null;

    this.bounds = {
      left: options.left || 0,
      right: -(options.right || 0),
      top: options.top || 0,
      bottom: -(options.bottom || 0),
      x0: 0,
      x1: 0,
      xRange: 0,
      y0: 0,
      y1: 0,
      yRange: 0
    };
    this.value = {
      prev: [-1, -1],
      current: [options.x || 0, options.y || 0],
      target: [options.x || 0, options.y || 0]
    };
    this.offset = {
      wrapper: [0, 0],
      mouse: [0, 0],
      prev: [-999999, -999999],
      current: [0, 0],
      target: [0, 0]
    };
    this.change = [0, 0];

    this.activity = false;
    this.dragging = false;
    this.tapping = false;
  },
  getOption: function(name, defaultValue) {
    return this.options[name] !== undefined ? this.options[name] : defaultValue;
  },
  setup: function() {
    this.setWrapperOffset();
    this.setBoundsPadding();
    this.setBounds();
    this.setSteps();

    this.addListeners();
  },
  setWrapperOffset: function() {
    this.offset.wrapper = Position.get(this.wrapper);
  },
  setBoundsPadding: function() {
    if (!this.bounds.left && !this.bounds.right) {
      this.bounds.left = Position.get(this.handle)[0] - this.offset.wrapper[0];
      this.bounds.right = -this.bounds.left;
    }
    if (!this.bounds.top && !this.bounds.bottom) {
      this.bounds.top = Position.get(this.handle)[1] - this.offset.wrapper[1];
      this.bounds.bottom = -this.bounds.top;
    }
  },
  setBounds: function() {
    this.bounds.x0 = this.bounds.left;
    this.bounds.x1 = this.wrapper.offsetWidth + this.bounds.right;
    this.bounds.xRange = (this.bounds.x1 - this.bounds.x0) - this.handle.offsetWidth;

    this.bounds.y0 = this.bounds.top;
    this.bounds.y1 = this.wrapper.offsetHeight + this.bounds.bottom;
    this.bounds.yRange = (this.bounds.y1 - this.bounds.y0) - this.handle.offsetHeight;

    this.bounds.xStep = 1 / (this.xPrecision || Math.max(this.wrapper.offsetWidth, this.handle.offsetWidth));
    this.bounds.yStep = 1 / (this.yPrecision || Math.max(this.wrapper.offsetHeight, this.handle.offsetHeight));
  },
  setSteps: function() {
    if (this.steps > 1) {
      this.stepRatios = [];
      for (var i = 0; i <= this.steps - 1; i++) {
        this.stepRatios[i] = i / (this.steps - 1);
      }
    }
  },
  addListeners: function() {
    var self = this;

    this.wrapper.onselectstart = function() {
      return false;
    };
    this.handle.onmousedown = this.handle.ontouchstart = function(e) {
      self.handleDownHandler(e);
    };
    this.wrapper.onmousedown = this.wrapper.ontouchstart = function(e) {
      self.wrapperDownHandler(e);
    };
    var mouseUpHandler = document.onmouseup || function() {};
    document.onmouseup = function(e) {
      mouseUpHandler(e);
      self.documentUpHandler(e);
    };
    var touchEndHandler = document.ontouchend || function() {};
    document.ontouchend = function(e) {
      touchEndHandler(e);
      self.documentUpHandler(e);
    };
    var resizeHandler = window.onresize || function() {};
    window.onresize = function(e) {
      resizeHandler(e);
      self.documentResizeHandler(e);
    };
    this.wrapper.onmousemove = function(e) {
      self.activity = true;
    };
    this.wrapper.onclick = function(e) {
      return !self.activity;
    };

    this.interval = setInterval(function() {
      self.animate();
    }, 25);
    self.animate(false, true);
  },
  handleDownHandler: function(e) {
    this.activity = false;
    Cursor.refresh(e);

    this.preventDefaults(e, true);
    this.startDrag();
    this.cancelEvent(e);
  },
  wrapperDownHandler: function(e) {
    Cursor.refresh(e);

    this.preventDefaults(e, true);
    this.startTap();
  },
  documentUpHandler: function(e) {
    this.stopDrag();
    this.stopTap();
    //this.cancelEvent(e);
  },
  documentResizeHandler: function(e) {
    this.setWrapperOffset();
    this.setBounds();

    this.update();
  },
  enable: function() {
    this.disabled = false;
    this.handle.className = this.handle.className.replace(/\s?disabled/g, '');
  },
  disable: function() {
    this.disabled = true;
    this.handle.className += ' disabled';
  },
  setStep: function(x, y, snap) {
    this.setValue(
      this.steps && x > 1 ? (x - 1) / (this.steps - 1) : 0,
      this.steps && y > 1 ? (y - 1) / (this.steps - 1) : 0,
      snap
    );
  },
  setValue: function(x, y, snap) {
    this.setTargetValue([x, y || 0]);
    if (snap) {
      this.groupCopy(this.value.current, this.value.target);
    }
  },
  startTap: function(target) {
    if (this.disabled) {
      return;
    }
    this.tapping = true;

    if (target === undefined) {
      target = [
        Cursor.x - this.offset.wrapper[0] - (this.handle.offsetWidth / 2),
        Cursor.y - this.offset.wrapper[1] - (this.handle.offsetHeight / 2)
      ];
    }
    this.setTargetOffset(target);
  },
  stopTap: function() {
    if (this.disabled || !this.tapping) {
      return;
    }
    this.tapping = false;

    this.setTargetValue(this.value.current);
    this.result();
  },
  startDrag: function() {
    if (this.disabled) {
      return;
    }
    this.offset.mouse = [
      Cursor.x - Position.get(this.handle)[0],
      Cursor.y - Position.get(this.handle)[1]
    ];

    this.dragging = true;
  },
  stopDrag: function() {
    if (this.disabled || !this.dragging) {
      return;
    }
    this.dragging = false;

    var target = this.groupClone(this.value.current);
    if (this.slide) {
      var ratioChange = this.change;
      target[0] += ratioChange[0] * 4;
      target[1] += ratioChange[1] * 4;
    }
    this.setTargetValue(target);
    this.result();
  },
  feedback: function() {
    var value = this.value.current;
    if (this.snap && this.steps > 1) {
      value = this.getClosestSteps(value);
    }
    if (!this.groupCompare(value, this.value.prev)) {
      if (typeof(this.animationCallback) == 'function') {
        this.animationCallback(value[0], value[1]);
      }
      this.groupCopy(this.value.prev, value);
    }
  },
  result: function() {
    if (typeof(this.callback) == 'function') {
      this.callback(this.value.target[0], this.value.target[1]);
    }
  },
  animate: function(direct, first) {
    if (direct && !this.dragging) {
      return;
    }
    if (this.dragging) {
      var prevTarget = this.groupClone(this.value.target);

      var offset = [
        Cursor.x - this.offset.wrapper[0] - this.offset.mouse[0],
        Cursor.y - this.offset.wrapper[1] - this.offset.mouse[1]
      ];
      this.setTargetOffset(offset, this.loose);

      this.change = [
        this.value.target[0] - prevTarget[0],
        this.value.target[1] - prevTarget[1]
      ];
    }
    if (this.dragging || first) {
      this.groupCopy(this.value.current, this.value.target);
    }
    if (this.dragging || this.glide() || first) {
      this.update();
      this.feedback();
    }
  },
  glide: function() {
    var diff = [
      this.value.target[0] - this.value.current[0],
      this.value.target[1] - this.value.current[1]
    ];
    if (!diff[0] && !diff[1]) {
      return false;
    }
    if (Math.abs(diff[0]) > this.bounds.xStep || Math.abs(diff[1]) > this.bounds.yStep) {
      this.value.current[0] += diff[0] * this.speed;
      this.value.current[1] += diff[1] * this.speed;
    } else {
      this.groupCopy(this.value.current, this.value.target);
    }
    return true;
  },
  update: function() {
    if (!this.snap) {
      this.offset.current = this.getOffsetsByRatios(this.value.current);
    } else {
      this.offset.current = this.getOffsetsByRatios(
        this.getClosestSteps(this.value.current)
      );
    }
    this.show();
  },
  show: function() {
    if (!this.groupCompare(this.offset.current, this.offset.prev)) {
      if (this.horizontal) {
        this.handle.style.left = String(this.offset.current[0]) + 'px';
      }
      if (this.vertical) {
        this.handle.style.top = String(this.offset.current[1]) + 'px';
      }
      this.groupCopy(this.offset.prev, this.offset.current);
    }
  },
  setTargetValue: function(value, loose) {
    var target = loose ? this.getLooseValue(value) : this.getProperValue(value);

    this.groupCopy(this.value.target, target);
    this.offset.target = this.getOffsetsByRatios(target);
  },
  setTargetOffset: function(offset, loose) {
    var value = this.getRatiosByOffsets(offset);
    var target = loose ? this.getLooseValue(value) : this.getProperValue(value);

    this.groupCopy(this.value.target, target);
    this.offset.target = this.getOffsetsByRatios(target);
  },
  getLooseValue: function(value) {
    var proper = this.getProperValue(value);
    return [
      proper[0] + ((value[0] - proper[0]) / 4),
      proper[1] + ((value[1] - proper[1]) / 4)
    ];
  },
  getProperValue: function(value) {
    var proper = this.groupClone(value);

    proper[0] = Math.max(proper[0], 0);
    proper[1] = Math.max(proper[1], 0);
    proper[0] = Math.min(proper[0], 1);
    proper[1] = Math.min(proper[1], 1);

    if ((!this.dragging && !this.tapping) || this.snap) {
      if (this.steps > 1) {
        proper = this.getClosestSteps(proper);
      }
    }
    return proper;
  },
  getRatiosByOffsets: function(group) {
    return [
      this.getRatioByOffset(group[0], this.bounds.xRange, this.bounds.x0),
      this.getRatioByOffset(group[1], this.bounds.yRange, this.bounds.y0)
    ];
  },
  getRatioByOffset: function(offset, range, padding) {
    return range ? (offset - padding) / range : 0;
  },
  getOffsetsByRatios: function(group) {
    return [
      this.getOffsetByRatio(group[0], this.bounds.xRange, this.bounds.x0),
      this.getOffsetByRatio(group[1], this.bounds.yRange, this.bounds.y0)
    ];
  },
  getOffsetByRatio: function(ratio, range, padding) {
    return Math.round(ratio * range) + padding;
  },
  getClosestSteps: function(group) {
    return [
      this.getClosestStep(group[0]),
      this.getClosestStep(group[1])
    ];
  },
  getClosestStep: function(value) {
    var k = 0;
    var min = 1;
    for (var i = 0; i <= this.steps - 1; i++) {
      if (Math.abs(this.stepRatios[i] - value) < min) {
        min = Math.abs(this.stepRatios[i] - value);
        k = i;
      }
    }
    return this.stepRatios[k];
  },
  groupCompare: function(a, b) {
    return a[0] == b[0] && a[1] == b[1];
  },
  groupCopy: function(a, b) {
    a[0] = b[0];
    a[1] = b[1];
  },
  groupClone: function(a) {
    return [a[0], a[1]];
  },
  preventDefaults: function(e, selection) {
    if (!e) {
      e = window.event;
    }
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;

    if (selection && document.selection) {
      document.selection.empty();
    }
  },
  cancelEvent: function(e) {
    if (!e) {
      e = window.event;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    e.cancelBubble = true;
  }
};

/* Cursor */

var Cursor = {
  x: 0,
  y: 0,
  init: function() {
    this.setEvent('mouse');
    this.setEvent('touch');
  },
  setEvent: function(type) {
    var moveHandler = document['on' + type + 'move'] || function() {};
    document['on' + type + 'move'] = function(e) {
      moveHandler(e);
      Cursor.refresh(e);
    };
  },
  refresh: function(e) {
    if (!e) {
      e = window.event;
    }
    if (e.type == 'mousemove') {
      this.set(e);
    } else if (e.touches) {
      this.set(e.touches[0]);
    }
  },
  set: function(e) {
    if (e.pageX || e.pageY) {
      this.x = e.pageX;
      this.y = e.pageY;
    } else if (e.clientX || e.clientY) {
      this.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      this.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
  }
};
Cursor.init();

/* Position */

var Position = {
  get: function(obj) {
    var curleft = 0,
        curtop = 0;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      }
      while ((obj = obj.offsetParent));
    }
    return [curleft, curtop];
  }
};
