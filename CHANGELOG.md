## 0.10.0

- Fix Sauce Labs integration
- Change startTap() behavior when option.snap=true [#122](https://github.com/skidding/dragdealer/pull/122)

## 0.9.9

- Add startdrag and stopdrag callbacks [#66](https://github.com/skidding/dragdealer/pull/66)
- [BUG] Fix ie8 selection [#67](https://github.com/skidding/dragdealer/pull/67)
- [BUG] Fix getStep() when only one step is presented [#69](https://github.com/skidding/dragdealer/pull/69)
- [BUG] rAF is paused when changing tabs [#70](https://github.com/skidding/dragdealer/pull/70)
- Add translate3d instead of translateX/translateY [#83](https://github.com/skidding/dragdealer/pull/83)
- Allow swiping for small finger movements [#83](https://github.com/skidding/dragdealer/pull/83)
- [BUG] Fix slider move along with the click [#99](https://github.com/skidding/dragdealer/pull/99)

## 0.9.8

- CSS3 transform support [#41](https://github.com/skidding/dragdealer/pull/41)
- add active class to wrapper [#44](https://github.com/skidding/dragdealer/issues/44)
- Request animation frame [#47](https://github.com/skidding/dragdealer/issues/47)
- add enabled/disable step click [#50](https://github.com/skidding/dragdealer/issues/50)

## 0.9.7

- Allow to pass handle in options [#14](https://github.com/skidding/dragdealer/issues/14)
- Avoid unnecessary global variables [#15](https://github.com/skidding/dragdealer/issues/15)
- Wrap module in UMD wrapper [#16](https://github.com/skidding/dragdealer/issues/16)
- Use proper event delegation [#17](https://github.com/skidding/dragdealer/issues/17)
- [BUG] Sliding never ends when handle is bigger than wrapper [#21](https://github.com/skidding/dragdealer/issues/21)
- [BUG] Horizontal drag control breaks vertical content scrolling on touch devices [#12](https://github.com/skidding/dragdealer/issues/12)
- [BUG] Dragging outside the bounds is not possible [#24](https://github.com/skidding/dragdealer/pull/24)
- [BUG] Resolving eventListener issue in FF6 and earlier [#26](https://github.com/skidding/dragdealer/pull/26)
- Allow handle to be any kind of tag not limited to direct children [#34](https://github.com/skidding/dragdealer/pull/34)

## 0.9.6

- Create a suite of high-level behavior tests [#1](https://github.com/skidding/dragdealer/issues/1)
- Document code, format style [#2](https://github.com/skidding/dragdealer/issues/2)
- [BUG] Fix dragging after repositioning wrapper [#3](https://github.com/skidding/dragdealer/issues/3)
- Create getValue/getStep API methods [#5](https://github.com/skidding/dragdealer/issues/5)
- [BUG] Fix setValue/setStep methods with snap options [#4](https://github.com/skidding/dragdealer/issues/4)
- Add reflow API method and resize tests [#6](https://github.com/skidding/dragdealer/issues/6)
- [BUG] Clicks/taps should be passed through from inside handle  [#7](https://github.com/skidding/dragdealer/issues/7)
- Create method to unbind events from a Dragdealer instance [#8](https://github.com/skidding/dragdealer/issues/8)
- [BUG] Allow other DOM elements inside wrapper [#11](https://github.com/skidding/dragdealer/issues/11)
- Create new demo page [#9](https://github.com/skidding/dragdealer/issues/9)
- Make README.md useful [#10](https://github.com/skidding/dragdealer/issues/10)
