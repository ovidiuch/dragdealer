describe("Dragdealer API", function() {

  beforeEach(function() {
    this.addMatchers(matchers);
    jasmine.Clock.useMock();
  });

  it("should set .disabled class on disable()", function() {
    var dragdealer = helpers.initDragdealer('simple-slider');

    expect($('#simple-slider .handle')).not.toHaveClass('disabled');
    dragdealer.disable();
    expect($('#simple-slider .handle')).toHaveClass('disabled');
  });

  it("should unset .disabled class on enable()", function() {
    var dragdealer = helpers.initDragdealer('simple-slider', {
      disabled: true
    });

    expect($('#simple-slider .handle')).toHaveClass('disabled');
    dragdealer.enable();
    expect($('#simple-slider .handle')).not.toHaveClass('disabled');
  });

  it("should disable dragging on disable()", function() {
    var dragdealer = helpers.initDragdealer('simple-slider', {
      slide: false
    });

    helpers.dragTo('simple-slider', 100, 0);
    helpers.drop('simple-slider');
    expect('simple-slider').toHavePosition(100, 0);

    dragdealer.disable();
    helpers.dragTo('simple-slider', 200, 0);
    expect('simple-slider').toHavePosition(100, 0);
  });

  it("should enable dragging on enable()", function() {
    var dragdealer = helpers.initDragdealer('simple-slider', {
      disabled: true,
      slide: false
    });

    helpers.dragTo('simple-slider', 100, 0);
    helpers.drop('simple-slider');
    expect('simple-slider').toHavePosition(0, 0);

    dragdealer.enable();
    helpers.dragTo('simple-slider', 200, 0);
    expect('simple-slider').toHavePosition(200, 0);
  });

  it("should slide handle to position on setValue(x, y)", function() {
    var callback = jasmine.createSpy(),
        animationCallback = jasmine.createSpy(),
        dragdealer = helpers.initDragdealer('square-slider', {
      horizontal: true,
      vertical: true,
      callback: callback,
      animationCallback: animationCallback
    });

    dragdealer.setValue(1, 0.5);
    jasmine.Clock.tick(3000);

    expect('square-slider').toHavePosition(400, 200);
    expect(callback).toHaveBeenCalledWith(1, 0.5);
    expect(animationCallback).toHaveBeenCalledWith(1, 0.5);
  });

  it("should snap handle to position on setValue(x, y, true)", function() {
     var callback = jasmine.createSpy(),
        animationCallback = jasmine.createSpy(),
        dragdealer = helpers.initDragdealer('square-slider', {
      horizontal: true,
      vertical: true,
      callback: callback,
      animationCallback: animationCallback
    });

    dragdealer.setValue(1, 0.5, true);
    jasmine.Clock.tick(25);

    expect('square-slider').toHavePosition(400, 200);
    expect(callback).toHaveBeenCalledWith(1, 0.5);
    expect(animationCallback).toHaveBeenCalledWith(1, 0.5);
  });

  it("should slide handle to step position on setStep(x, y)", function() {
     var callback = jasmine.createSpy(),
        animationCallback = jasmine.createSpy(),
        dragdealer = helpers.initDragdealer('simple-slider', {
      steps: 6,
      callback: callback,
      animationCallback: animationCallback
    });

    dragdealer.setStep(2, 0);
    jasmine.Clock.tick(3000);

    expect('simple-slider').toHavePosition(80, 0);
    expect(callback).toHaveBeenCalledWith(0.2, 0);
    expect(animationCallback).toHaveBeenCalledWith(0.2, 0);
  });

  it("should snap handle to step position on setStep(x, y, true)", function() {
     var callback = jasmine.createSpy(),
        animationCallback = jasmine.createSpy(),
        dragdealer = helpers.initDragdealer('simple-slider', {
      steps: 6,
      callback: callback,
      animationCallback: animationCallback
    });

    dragdealer.setStep(2, 0, true);
    jasmine.Clock.tick(25);

    expect('simple-slider').toHavePosition(80, 0);
    expect(callback).toHaveBeenCalledWith(0.2, 0);
    expect(animationCallback).toHaveBeenCalledWith(0.2, 0);
  });
});
