describe("Dragdealer callbacks", function() {

  beforeEach(function() {
    this.addMatchers(matchers);
    jasmine.Clock.useMock();
  });

  describe("should call regular callback", function() {

    it("with exact values on drop without slide", function() {
      var callback = jasmine.createSpy(),
          dragdealer = helpers.initDragdealer('square-slider', {
        callback: callback,
        slide: false
      });
      helpers.dragTo('square-slider', 200, 100);
      helpers.drop('square-slider');

      expect(callback.calls.length).toEqual(1);
      expect(callback).toHaveBeenCalledWith(0.5, 0.25);
    });

    it("with projected values on drop with slide", function() {
      var callback = jasmine.createSpy(),
          dragdealer = helpers.initDragdealer('square-slider', {
        callback: callback,
        slide: true
      });
      // will slide to 100px, 50px
      helpers.dragTo('square-slider', 20, 10);
      helpers.drop('square-slider');

      expect(callback.calls.length).toEqual(1);
      expect(callback).toHaveBeenCalledWith(0.25, 0.125);
    });

    it("with projected values on drop with slide to steps", function() {
      var callback = jasmine.createSpy(),
          dragdealer = helpers.initDragdealer('simple-slider', {
        callback: callback,
        // Considering the simple slider has a wrapper of 500px width and a
        // handle of 100px width, the step positions will be 0, 80, 160, 240,
        // 320 and 400
        steps: 6,
        slide: true
      });
      // would slide to 150px, so will slide to 160px step
      helpers.dragTo('simple-slider', 30, 0);
      helpers.drop('simple-slider');

      expect(callback.calls.length).toEqual(1);
      expect(callback).toHaveBeenCalledWith(0.4, 0);
    });
  });

  describe("should call animationCallback", function() {

    it("with initial values, at init", function() {
      var callback = jasmine.createSpy(),
          dragdealer = helpers.initDragdealer('square-slider', {
        animationCallback: callback,
        x: 0.5,
        y: 1
      });

      expect(callback.calls.length).toEqual(1);
      expect(callback).toHaveBeenCalledWith(0.5, 1);
    });

    it("with exact values on drag", function() {
      var callback = jasmine.createSpy(),
          dragdealer = helpers.initDragdealer('square-slider', {
        animationCallback: callback
      });
      helpers.dragTo('square-slider', 200, 100);
      // Add one extra call for the initial one
      expect(callback.calls.length).toEqual(2);
      expect(callback).toHaveBeenCalledWith(0.5, 0.25);

      helpers.dragTo('square-slider', 300, 50);
      expect(callback.calls.length).toEqual(3);
      expect(callback).toHaveBeenCalledWith(0.75, 0.125);
    });

    it("with exact values on drag and drop with slide", function() {
      var callback = jasmine.createSpy(),
          dragdealer = helpers.initDragdealer('square-slider', {
        animationCallback: callback,
        slide: true
      });
      // will slide to 150px, 100px
      helpers.dragTo('square-slider', 30, 20);
      // Add one extra call for the initial one
      expect(callback.calls.length).toEqual(2);
      expect(callback).toHaveBeenCalledWith(0.075, 0.05);

      helpers.drop('square-slider');
      jasmine.Clock.tick(3000);
      // We don't care about the number of calls, just the last call
      expect(callback).toHaveBeenCalledWith(0.375, 0.25);
    });

    it("with exact values on drag and drop with snap to steps", function() {
      var callback = jasmine.createSpy(),
          dragdealer = helpers.initDragdealer('simple-slider', {
        animationCallback: callback,
        slide: true,
        // Considering the simple slider has a wrapper of 500px width and a
        // handle of 100px width, the step positions will be 0, 40, 80, 120,
        // 160, 200, 240, 280, 320, 360, 400
        steps: 11,
        snap: true
      });
      // will snap to 40px and will slide to 200px (which is exactly the 6th
      // step)
      helpers.dragTo('simple-slider', 50, 0);
      // Add one extra call for the initial one
      expect(callback.calls.length).toEqual(2);
      expect(callback).toHaveBeenCalledWith(0.1, 0);

      helpers.drop('simple-slider');
      jasmine.Clock.tick(3000);
      // We don't care about the number of calls, just the last call
      expect(callback).toHaveBeenCalledWith(0.5, 0);
    });
  });

  it("should not call animationCallback forever when handle bigger than wrapper", function() {
    // Fix for https://github.com/skidding/dragdealer/issues/21
    var callback = jasmine.createSpy(),
        dragdealer = helpers.initDragdealer('masked-slider', {
      animationCallback: callback,
      slide: true
    });
    helpers.dragTo('masked-slider', -20, 0);
    // Add one extra call for the initial one
    expect(callback.calls.length).toEqual(2);
    expect(callback).toHaveBeenCalledWith(0.04, 0);

    helpers.drop('masked-slider');
    jasmine.Clock.tick(3000);
    // We want to make sure the value has reached 0.2 and is not something like
    // 0.19999948332063716
    expect(callback).toHaveBeenCalledWith(0.2, 0);
  });
});
