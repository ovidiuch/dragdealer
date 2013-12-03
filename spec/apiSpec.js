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

  // FIXME
  xit("should unset .disabled class on enable()", function() {
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
});
