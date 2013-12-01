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

  it("Should constrain handle position under the wrapper bounds", function() {
    helpers.initDragdealer('simple-slider', {
      slide: false
    });
    helpers.dragTo('simple-slider', -100, 0);
    expect('simple-slider').toHavePosition(0, 0);

    helpers.dragTo('simple-slider', 0, -100);
    expect('simple-slider').toHavePosition(0, 0);

    helpers.dragTo('simple-slider', 0, 100);
    expect('simple-slider').toHavePosition(0, 0);

    helpers.dragTo('simple-slider', 500, 0);
    expect('simple-slider').toHavePosition(400, 0);
  });

  it("Should slide handle after releasing drag", function() {
    helpers.initDragdealer('simple-slider', {
      slide: true
    });
    helpers.dragTo('simple-slider', 50, 0);
    expect('simple-slider').toHavePosition(50, 0);

    // The slider gets a force of 4x the last movement and keeps eating a part
    // of it with every interval loop, normally we'd never move an entire 50px
    // with one mouse move
    helpers.drop('simple-slider');
    jasmine.Clock.tick(3000);
    expect('simple-slider').toHavePosition(250, 0);
  });
});
