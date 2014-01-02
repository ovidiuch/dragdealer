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

    expect(clickHandler.calls.length).toEqual(1);
    expect(clickHandler.calls[0].args[0].isDefaultPrevented()).toBe(true);
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
