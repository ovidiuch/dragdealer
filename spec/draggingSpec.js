describe("When dragging a Dragdealer instance", function() {

  beforeEach(function() {
    this.addMatchers(matchers);
    jasmine.Clock.useMock();
  });

  it("Should move handle along with mouse after pressing", function() {
    helpers.initDragdealer('simple-slider', {
      slide: false
    });
    helpers.dragTo('simple-slider', 100, 0);
    expect('simple-slider').toHavePosition(100, 0);
  });
});
