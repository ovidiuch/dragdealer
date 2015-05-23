describe("Resizing Dragdealer", function() {

  beforeEach(function() {
    this.addMatchers(matchers);
  });

  it("should translate handle position after window resize", function() {
    var dragdealer = helpers.initDragdealer('simple-slider', {
      x: 0.5
    });

    // The handle has 100px, the wrapper range is 400px
    expect('simple-slider').toHavePosition(200, 0);
    $('#simple-slider').width(1000);
    
    dragdealer.onWindowResize();
    
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
