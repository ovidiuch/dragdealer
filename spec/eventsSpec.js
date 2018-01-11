describe("Click events inside handle", function() {

  beforeEach(function() {
    jasmine.addMatchers(matchers);
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

    expect(clickHandler.calls.all().length).toEqual(0);
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

    expect(clickHandler.calls.all().length).toEqual(1);
    expect(clickHandler.calls.first().args[0].isDefaultPrevented()).toBe(false);
  });

  it("should be passed through if mouse moving without changing position", function() {
    var clickHandler = jasmine.createSpy();
    var someX = 42;
    var someY = 42;
    helpers.initDragdealer('content-slider');

    var wrapperPosition = $('#content-slider').offset();

    $('#content-slider').click(clickHandler);
    $('#content-slider .inner-button')
        .simulate('mousemove',{ // to have a consistent startDrag position
          clientX: someX,
          clientY: someY
        })
        .simulate('mousedown')
        .simulate('mousemove',{
          clientX: someX,
          clientY: someY
        })
        .simulate('mouseup')
        .simulate('click');

    expect(clickHandler.calls.all().length).toEqual(1);
    expect(clickHandler.calls.first().args[0].isDefaultPrevented()).toBe(false);
  });
});

describe("Previous DOM events", function() {

  beforeEach(function() {
    jasmine.addMatchers(matchers);
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
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
    expect(mouseDownHandler.calls.all().length).toEqual(1);
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
