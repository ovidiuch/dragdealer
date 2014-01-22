describe("Resizing Dragdealer", function() {

  beforeEach(function() {
    this.addMatchers(matchers);
    jasmine.Clock.useMock();
  });

  it("should translate handle position after window resize", function() {
    var dragdealer = helpers.initDragdealer('simple-slider', {
      x: 0.5
    });

    // The handle has 100px, the wrapper range is 400px
    expect('simple-slider').toHavePosition(200, 0);
    $('#simple-slider').width(1000);
    // Triggering a navitive window resize event in IE is impossible, that's
    // why we just call the event listener function directly when dispatchEvent
    // is not supported. See http://stackoverflow.com/a/6110456/128816
    if (document.createEventObject) {
      dragdealer.onWindowResize();
    } else {
      window.dispatchEvent(new Event('resize'));
    }
    // The handle has 100px, the wrapper range is 900px
    expect('simple-slider').toHavePosition(450, 0);
  });

  it("should translate handle position after reflow method", function() {
    var dragdealer = helpers.initDragdealer('simple-slider', {
      x: 0.5
    });

    // The handle has 100px, the wrapper range is 400px
    expect('simple-slider').toHavePosition(200, 0);
    $('#simple-slider').width(1000);
    dragdealer.reflow();
    // The handle has 100px, the wrapper range is 900px
    expect('simple-slider').toHavePosition(450, 0);
  });
});
