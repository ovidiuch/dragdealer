describe("Click events inside handle", function() {

  beforeEach(function() {
    this.addMatchers(matchers);
    jasmine.Clock.useMock();
  });

  it("should be cancelled if mouse dragging", function() {
    // Relevant issue https://github.com/skidding/dragdealer/pull/7
    var clickHandler = jasmine.createSpy();
    helpers.initDragdealer('content-slider');
    var wrapperPosition = $('#content-slider').offset();

    $('#content-slider').click(clickHandler);
    $('#content-slider .inner-button')
      .simulate('mousedown')
      .simulate('mousemove', {
        clientX: wrapperPosition.left + 10,
        clientY: wrapperPosition.top
      })
      .simulate('mouseup')
      .simulate('click');

    expect(clickHandler.calls.length).toEqual(0);
  });

  it("should be passed through if not mouse dragging", function() {
    // Relevant issue https://github.com/skidding/dragdealer/pull/7
    var clickHandler = jasmine.createSpy();
    helpers.initDragdealer('content-slider');

    $('#content-slider').click(clickHandler);
    $('#content-slider .inner-button')
      .simulate('mousedown')
      .simulate('mouseup')
      .simulate('click');

    expect(clickHandler.calls.length).toEqual(1);
    expect(clickHandler.calls[0].args[0].isDefaultPrevented()).toBe(false);
  });
});

describe("Previous DOM events", function() {

  beforeEach(function() {
    this.addMatchers(matchers);
    jasmine.Clock.useMock();
  });

  it("should be preserved after instantiating Dragdealer", function() {
    // Spec for https://github.com/skidding/dragdealer/pull/8
    loadFixtures('simple-slider.html');
    loadStyleFixtures('simple-slider.css');

    var mouseDownHandler = jasmine.createSpy(),
        $handle = $('#simple-slider .handle');

    $handle.get(0).onmousedown = mouseDownHandler;
    helpers.initDragdealer('simple-slider');

    $handle.simulate('mousedown');
    expect(mouseDownHandler.calls.length).toEqual(1);
  });

  it("should be preserved after unbinding a Dragdealer instance", function() {
    // Spec for https://github.com/skidding/dragdealer/pull/8
    loadFixtures('simple-slider.html');
    loadStyleFixtures('simple-slider.css');

    var mouseDownHandler = jasmine.createSpy(),
        $handle = $('#simple-slider .handle');

    $handle.get(0).onmousedown = mouseDownHandler;
    var dragdealer = helpers.initDragdealer('simple-slider');
    dragdealer.unbindEventListeners();

    expect($handle.get(0).onmousedown).toEqual(mouseDownHandler);
  });
});
