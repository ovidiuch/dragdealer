describe("Resizing Dragdealer", function() {

  beforeEach(function() {
    this.addMatchers(matchers);
    jasmine.Clock.useMock();
  });

  it("should translate handle position after window resize", function() {
    helpers.initDragdealer('simple-slider', {
      x: 0.5
    });

    // The handle has 100px, the wrapper range is 400px
    expect('simple-slider').toHavePosition(200, 0);
    $('#simple-slider').width(1000);
    $(window).trigger('resize');
    // The handle has 100px, the wrapper range is 900px
    expect('simple-slider').toHavePosition(450, 0);
  });
});
