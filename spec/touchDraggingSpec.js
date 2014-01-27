describe("Touch Dragging Dragdealer", function() {

  beforeEach(function() {
    this.addMatchers(matchers);
    jasmine.Clock.useMock();
  });


  it("should not prevent touchmove event when dragging along disabled axis", function() {
    var isCanceled;
    helpers.initDragdealer('simple-slider', {
      horizontal: true,
      vertical: false
    });

    // Vertical drag should not be prevented
    isCanceled = !helpers.touchDragTo('simple-slider', 0, 100);
    expect(isCanceled).toBe(false);

    // Horizontal drag should be prevented
    isCanceled = !helpers.touchDragTo('simple-slider', 100, 0);
    expect(isCanceled).toBe(true);
  });


  it("should move handle along with touch after pressing", function() {
    helpers.initDragdealer('simple-slider');

    helpers.touchDragTo('simple-slider', 100, 0);
    expect('simple-slider').toHavePosition(100, 0);
  });

  it("should move custom handle along with touch after pressing", function() {
    helpers.initDragdealer('custom-handle', {
      handleClass: 'custom-handle'
    });
    helpers.touchDragTo('custom-handle', 100, 0, 'custom-handle');
    expect('custom-handle').toHavePosition(100, 0, 'custom-handle');
  });

  it("should not move disabled Dragdealer", function() {
    helpers.initDragdealer('simple-slider', {
      disabled: true
    });

    helpers.touchDragTo('simple-slider', 100, 0);
    expect('simple-slider').toHavePosition(0, 0);
  });

  it("should not drag horizontal slider vertically", function() {
    helpers.initDragdealer('square-slider', {
      horizontal: true,
      vertical: false
    });

    helpers.touchDragTo('square-slider', 0, 100);
    expect('square-slider').toHavePosition(0, 0);

    helpers.touchDragTo('square-slider', 200, 200);
    expect('square-slider').toHavePosition(200, 0);
  });

  it("should not drag vertical slider horizontally", function() {
    helpers.initDragdealer('square-slider', {
      horizontal: false,
      vertical: true
    });

    helpers.touchDragTo('square-slider', 100, 0);
    expect('square-slider').toHavePosition(0, 0);

    helpers.touchDragTo('square-slider', 200, 200);
    expect('square-slider').toHavePosition(0, 200);
  });

  describe("should constrain handle position under the wrapper bounds", function() {

    it("when wrapper is bigger than handle", function() {
      helpers.initDragdealer('simple-slider');

      helpers.touchDragTo('simple-slider', -100, 0);
      expect('simple-slider').toHavePosition(0, 0);

      helpers.touchDragTo('simple-slider', 0, -100);
      expect('simple-slider').toHavePosition(0, 0);

      helpers.touchDragTo('simple-slider', 0, 100);
      expect('simple-slider').toHavePosition(0, 0);

      helpers.touchDragTo('simple-slider', 500, 0);
      expect('simple-slider').toHavePosition(400, 0);
    });

    it("when wrapper is bigger than handle and has padding", function() {
      helpers.initDragdealer('square-slider', {
        horizontal: true,
        vertical: true,
        top: 10,
        bottom: 20,
        left: 30,
        right: 40
      });

      helpers.touchDragTo('square-slider', -1000, -1000);
      expect('square-slider').toHavePosition(30, 10);

      helpers.touchDragTo('square-slider', 1000, -1000);
      expect('square-slider').toHavePosition(360, 10);

      helpers.touchDragTo('square-slider', 1000, 1000);
      expect('square-slider').toHavePosition(360, 380);

      helpers.touchDragTo('square-slider', -1000, 1000);
      expect('square-slider').toHavePosition(30, 380);
    });

    it("when handle is bigger than wrapper", function() {
      helpers.initDragdealer('masked-slider', {
        horizontal: true,
        vertical: true,
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      });

      helpers.touchDragTo('masked-slider', 1000, 1000);
      expect('masked-slider').toHavePosition(10, 10);

      helpers.touchDragTo('masked-slider', -1000, 1000);
      expect('masked-slider').toHavePosition(-510, 10);

      helpers.touchDragTo('masked-slider', -1000, -1000);
      expect('masked-slider').toHavePosition(-510, -510);

      helpers.touchDragTo('masked-slider', 1000, -1000);
      expect('masked-slider').toHavePosition(10, -510);
    });
  });

  it("should slide handle after releasing drag", function() {
    helpers.initDragdealer('simple-slider', {
      slide: true
    });

    helpers.touchDragTo('simple-slider', 50, 0);
    expect('simple-slider').toHavePosition(50, 0);

    // The slider gets a force of 4x the last movement and keeps eating a part
    // of it with every interval loop, normally we'd never move an entire 50px
    // with one touch move
    helpers.touchDrop('simple-slider');
    jasmine.Clock.tick(3000);
    expect('simple-slider').toHavePosition(250, 0);
  });

  it("should pull handle to closest step after releasing drag", function() {
    helpers.initDragdealer('simple-slider', {
      slide: false,
      // Considering the simple slider has a wrapper of 500px width and a
      // handle of 100px width, the step positions will be 0, 80, 160, 240, 320
      // and 400
      steps: 6
    });

    helpers.touchDragTo('simple-slider', 100, 0);
    helpers.touchDrop('simple-slider');
    jasmine.Clock.tick(3000);
    expect('simple-slider').toHavePosition(80, 0);

    helpers.touchDragTo('simple-slider', 50, 0);
    helpers.touchDrop('simple-slider');
    jasmine.Clock.tick(3000);
    expect('simple-slider').toHavePosition(80, 0);

    helpers.touchDragTo('simple-slider', 350, 0);
    helpers.touchDrop('simple-slider');
    jasmine.Clock.tick(3000);
    expect('simple-slider').toHavePosition(320, 0);

    helpers.touchDragTo('simple-slider', 210, 0);
    helpers.touchDrop('simple-slider');
    jasmine.Clock.tick(3000);
    expect('simple-slider').toHavePosition(240, 0);
  });

  it("should slide handle to projected step after releasing drag", function() {
    helpers.initDragdealer('simple-slider', {
      // The slider gets a force of 4x the last movement
      slide: true,
      // Considering the simple slider has a wrapper of 500px width and a
      // handle of 100px width, the step positions will be 0, 80, 160, 240, 320
      // and 400
      steps: 6
    });

    // is dragged 25px to the right, and will slide 125px, to 125, 0
    helpers.touchDragTo('simple-slider', 25, 0);
    helpers.touchDrop('simple-slider');
    jasmine.Clock.tick(3000);
    expect('simple-slider').toHavePosition(160, 0);

    // is dragged 15px to the left, and will slide 75px, to 135, 0
    helpers.touchDragTo('simple-slider', 155, 0);
    helpers.touchDrop('simple-slider');
    jasmine.Clock.tick(3000);
    expect('simple-slider').toHavePosition(160, 0);

    // is dragged 25px to the right, and will slide 125px, to 285, 0
    helpers.touchDragTo('simple-slider', 185, 0);
    helpers.touchDrop('simple-slider');
    jasmine.Clock.tick(3000);
    expect('simple-slider').toHavePosition(320, 0);

    // is dragged 20px to the left, and will slide 250px, to 70, 0
    helpers.touchDragTo('simple-slider', 270, 0);
    helpers.touchDrop('simple-slider');
    jasmine.Clock.tick(3000);
    expect('simple-slider').toHavePosition(80, 0);
  });

  it("should snap handle to closest step after releasing drag", function() {
    helpers.initDragdealer('simple-slider', {
      slide: false,
      // Considering the simple slider has a wrapper of 500px width and a
      // handle of 100px width, the step positions will be 0, 80, 160, 240, 320
      // and 400
      steps: 6,
      snap: true
    });

    helpers.touchDragTo('simple-slider', 100, 0);
    helpers.touchDrop('simple-slider');
    expect('simple-slider').toHavePosition(80, 0);

    helpers.touchDragTo('simple-slider', 50, 0);
    helpers.touchDrop('simple-slider');
    expect('simple-slider').toHavePosition(80, 0);

    helpers.touchDragTo('simple-slider', 350, 0);
    helpers.touchDrop('simple-slider');
    expect('simple-slider').toHavePosition(320, 0);

    helpers.touchDragTo('simple-slider', 210, 0);
    helpers.touchDrop('simple-slider');
    expect('simple-slider').toHavePosition(240, 0);
  });

  it("should drag loose handle outside bigger wrapper", function() {
    // Any positon offset outside the wrapper bounds will be split by 4
    helpers.initDragdealer('simple-slider', {
      loose: true
    });

    // This goes outside the wrapper with 100px, so the exceeding offset will
    // be 25px
    helpers.touchDragTo('simple-slider', -100, 0);
    helpers.touchDrop('simple-slider');
    expect('simple-slider').toHavePosition(-25, 0);
    jasmine.Clock.tick(3000);
    expect('simple-slider').toHavePosition(0, 0);

    // This goes outside the wrapper with 200px, since 400px is the rightmost
    // position of a 100px wide handle inside a 500px wide wrapper, so the
    // exceeding offset will be 50px
    helpers.touchDragTo('simple-slider', 600, 0);
    helpers.touchDrop('simple-slider');
    expect('simple-slider').toHavePosition(450, 0);
    jasmine.Clock.tick(3000);
    expect('simple-slider').toHavePosition(400, 0);
  });

  it("should drag loose handle inside smaller wrapper", function() {
    // Any positon offset outside the wrapper bounds will be split by 4
    helpers.initDragdealer('masked-slider', {
      horizontal: true,
      vertical: true,
      loose: true
    });

    helpers.touchDragTo('masked-slider', 100, 200);
    helpers.touchDrop('masked-slider');
    expect('masked-slider').toHavePosition(25, 50);
    jasmine.Clock.tick(3000);
    expect('masked-slider').toHavePosition(0, 0);

    helpers.touchDragTo('masked-slider', -2000, -1000);
    helpers.touchDrop('masked-slider');
    expect('masked-slider').toHavePosition(-875, -625);
    jasmine.Clock.tick(3000);
    expect('masked-slider').toHavePosition(-500, -500);
  });

  it("should not break dragging after repositioning", function() {
    // Fix for https://github.com/skidding/dragdealer/issues/3
    var dragdealer = helpers.initDragdealer('masked-slider', {
      horizontal: true,
      vertical: true
    });

    $('#masked-slider').css('margin-top', 200);
    helpers.touchDragTo('masked-slider', -250, -250);
    expect('masked-slider').toHavePosition(-250, -250);
    expect(dragdealer.getValue()).toEqual([0.5, 0.5]);
  });

  it("should not work after unbinding events", function() {
    // Spec for https://github.com/skidding/dragdealer/issues/8
    var dragdealer = helpers.initDragdealer('simple-slider');

    dragdealer.unbindEventListeners();
    helpers.touchDragTo('simple-slider', 200, 0);
    expect('simple-slider').toHavePosition(0, 0);
  });

  it("should stop sliding animation after unbinding events", function() {
    // Spec for https://github.com/skidding/dragdealer/issues/8
    var dragdealer = helpers.initDragdealer('simple-slider');

    helpers.touchDragTo('simple-slider', 200, 0);
    helpers.touchDrop('simple-slider');
    dragdealer.unbindEventListeners();
    jasmine.Clock.tick(3000);
    // The handle would reach the 400, 0 position if we wouldn't unbind it
    expect('simple-slider').toHavePosition(200, 0);
  });
});
