describe("Dragging a Dragdealer instance", function() {

  beforeEach(function() {
    this.addMatchers(matchers);
    jasmine.Clock.useMock();
  });

  it("should move handle along with mouse after pressing", function() {
    helpers.initDragdealer('simple-slider');
    helpers.dragTo('simple-slider', 100, 0);
    expect('simple-slider').toHavePosition(100, 0);
  });

  it("should not move disabled Dragdealer", function() {
    helpers.initDragdealer('simple-slider', {
      disabled: true
    });
    helpers.dragTo('simple-slider', 100, 0);
    expect('simple-slider').toHavePosition(0, 0);
  });

  it("should constrain handle position under the wrapper bounds", function() {
    helpers.initDragdealer('simple-slider');
    helpers.dragTo('simple-slider', -100, 0);
    expect('simple-slider').toHavePosition(0, 0);

    helpers.dragTo('simple-slider', 0, -100);
    expect('simple-slider').toHavePosition(0, 0);

    helpers.dragTo('simple-slider', 0, 100);
    expect('simple-slider').toHavePosition(0, 0);

    helpers.dragTo('simple-slider', 500, 0);
    expect('simple-slider').toHavePosition(400, 0);
  });

  it("should slide handle after releasing drag", function() {
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

  it("should slide handle to closest step after releasing drag", function() {
    // Considering the simple slider has a wrapper of 500px width and a handle
    // of 100px width, the step positions will be 80, 160, 240, 320 and 400
    helpers.initDragdealer('simple-slider', {
      slide: false,
      steps: 6
    });

    helpers.dragTo('simple-slider', 100, 0);
    helpers.drop('simple-slider');
    expect('simple-slider').toHavePosition(100, 0);
    jasmine.Clock.tick(3000);
    expect('simple-slider').toHavePosition(80, 0);

    helpers.dragTo('simple-slider', 50, 0);
    helpers.drop('simple-slider');
    expect('simple-slider').toHavePosition(50, 0);
    jasmine.Clock.tick(3000);
    expect('simple-slider').toHavePosition(80, 0);

    helpers.dragTo('simple-slider', 350, 0);
    helpers.drop('simple-slider');
    expect('simple-slider').toHavePosition(350, 0);
    jasmine.Clock.tick(3000);
    expect('simple-slider').toHavePosition(320, 0);

    helpers.dragTo('simple-slider', 210, 0);
    helpers.drop('simple-slider');
    expect('simple-slider').toHavePosition(210, 0);
    jasmine.Clock.tick(3000);
    expect('simple-slider').toHavePosition(240, 0);
  });

  it("should snap handle to closest step after releasing drag", function() {
    // Considering the simple slider has a wrapper of 500px width and a handle
    // of 100px width, the step positions will be 80, 160, 240, 320 and 400
    helpers.initDragdealer('simple-slider', {
      slide: false,
      steps: 6,
      snap: true
    });

    helpers.dragTo('simple-slider', 100, 0);
    helpers.drop('simple-slider');
    expect('simple-slider').toHavePosition(80, 0);

    helpers.dragTo('simple-slider', 50, 0);
    helpers.drop('simple-slider');
    expect('simple-slider').toHavePosition(80, 0);

    helpers.dragTo('simple-slider', 350, 0);
    helpers.drop('simple-slider');
    expect('simple-slider').toHavePosition(320, 0);

    helpers.dragTo('simple-slider', 210, 0);
    helpers.drop('simple-slider');
    expect('simple-slider').toHavePosition(240, 0);
  });

  it("should drag loose handle outside wrapper", function() {
    // Any positon offset outside the wrapper bounds will be split by 4
    helpers.initDragdealer('simple-slider', {
      loose: true
    });

    // This goes outside the wrapper with 100px, so the exceeding offset will
    // be 25px
    helpers.dragTo('simple-slider', -100, 0);
    helpers.drop('simple-slider');
    expect('simple-slider').toHavePosition(-25, 0);
    jasmine.Clock.tick(3000);
    expect('simple-slider').toHavePosition(0, 0);

    // This goes outside the wrapper with 200px, since 400px is the rightmost
    // position of a 100px wide handle inside a 500px wide wrapper, so the
    // exceeding offset will be 50px
    helpers.dragTo('simple-slider', 600, 0);
    helpers.drop('simple-slider');
    expect('simple-slider').toHavePosition(450, 0);
    jasmine.Clock.tick(3000);
    expect('simple-slider').toHavePosition(400, 0);
  });
});
