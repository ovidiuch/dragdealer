describe("Initializing Dragdealer", function() {

  beforeEach(function() {
    this.addMatchers(matchers);
    jasmine.Clock.useMock();
  });

  it("should set .disabled class when setting disabled true", function() {
    helpers.initDragdealer('simple-slider', {
      disabled: true
    });
    expect($('#simple-slider .handle')).toHaveClass('disabled');
  });

  it("should set handle to specified position", function() {
    helpers.initDragdealer('square-slider', {
      horizontal: true,
      vertical: true,
      x: 0.1,
      y: 0.1
    });
    expect('square-slider').toHavePosition(40, 40);
  });

  it("should only set handle to specified horizontal position", function() {
    helpers.initDragdealer('square-slider', {
      horizontal: true,
      vertical: false,
      x: 0.1,
      y: 0.1
    });
    expect('square-slider').toHavePosition(40, 0);
  });

  it("should only set handle to specified vertical position", function() {
    helpers.initDragdealer('square-slider', {
      horizontal: false,
      vertical: true,
      x: 0.1,
      y: 0.1
    });
    expect('square-slider').toHavePosition(0, 40);
  });

  it("should snap initial position of handle to steps", function() {
    helpers.initDragdealer('simple-slider', {
      steps: 2,
      snap: true,
      x: 0.4
    });
    expect('simple-slider').toHavePosition(0, 0);

    helpers.initDragdealer('simple-slider', {
      steps: 2,
      snap: true,
      x: 0.6
    });
    expect('simple-slider').toHavePosition(400, 0);
  });

  describe("should impose specified wrapper padding to handle position", function() {

    it("when wrapper is bigger than handle", function() {
      helpers.initDragdealer('square-slider', {
        horizontal: true,
        vertical: true,
        top: 10,
        left: 20
      });
      expect('square-slider').toHavePosition(20, 10);
    });

    it("when handle is bigger than wrapper", function() {
      helpers.initDragdealer('masked-slider', {
        horizontal: true,
        vertical: true,
        top: 10,
        left: 20
      });
      expect('masked-slider').toHavePosition(20, 10);
    });
  });

  it("should work with handle DOM siblings", function() {
    // Fix for https://github.com/skidding/dragdealer/issues/11
    helpers.initDragdealer('handle-dom-siblings', {
      x: 0.5
    });
    expect('handle-dom-siblings').toHavePosition(200, 0);
  });
});
