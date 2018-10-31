/// types declaration file for typescript users (https://www.typescriptlang.org)
/// dragdealer.js https://skidding.github.io/dragdealer/

interface DragDealearOption {
    /**
     * defaultValue=false 
     * Init Dragdealer in a disabled state. The handle will have a .disabled class.
     * 
     * @type {boolean}
     * @memberOf DragDealearOption
    * */
    disabled?: boolean,
    /**
     * defaultValue==true 
     * Enable horizontal dragging.
     * 
     * @type {boolean}
     * @memberOf DragDealearOption
     */
    horizontal?: boolean,
    /**
     * defaultValue=false 
     * Enable vertical dragging.
     * 
     * @type {boolean}
     * @memberOf DragDealearOption
     */
    vertical?: boolean,
    /**
     * defaultValue=0 
     * Initial horizontal (left) position. Accepts a float number value between 0 and 1.
     * 
     * @type {number}
     * @memberOf DragDealearOption
     */
    x?: number;
    /**
     * =0 Initial vertical (top) position. Accepts a float number value between 0 and 1.
     * 
     * @type {number}
     * @memberOf DragDealearOption
     */
    y?: number;
    /**
     * =0 Limit the positioning of the handle within the bounds of the wrapper, by defining a virtual grid made out of a number of equally-spaced steps. This restricts placing the handle anywhere in-between these steps. E.g. setting 3 steps to a regular slider will only allow you to move it to the left, to the right or exactly in the middle.
     * 
     * @type {number}
     * @memberOf DragDealearOption
     */
    steps?: number;
    /**
     * =false When a number of steps is set, snap the position of the handle to its closest step instantly, even when dragging.
     * 
     * @type {boolean}
     * @memberOf DragDealearOption
     */
    snap?: boolean;
    /**
     * =true Slide handle after releasing it, depending on the movement speed before the mouse/touch release.
     * 
     * @type {boolean}
     * @memberOf DragDealearOption
     */
    slide?: boolean;
    /**
     * =false Loosen-up wrapper boundaries when dragging. This allows the handle to be *slightly* dragged outside the bounds of the wrapper, but slides it back to the margins of the wrapper upon release.
     * 
     * @type {boolean}
     * @memberOf DragDealearOption
     */
    loose?: boolean;
    /**
     *  =0 Top padding between the wrapper and the handle.
     * 
     * @type {number}
     * @memberOf DragDealearOption
     */
    top?: number;
    /**
     * =0 Bottom padding between the wrapper and the handle.
     * 
     * @type {boolean}
     * @memberOf DragDealearOption
     */
    bottom?: boolean;
    /**
     * =0 Left padding between the wrapper and the handle.
     * 
     * @type {number}
     * @memberOf DragDealearOption
     */
    left?: number;
    /**
     * =0 Right padding between the wrapper and the handle.
     * 
     * @type {number}
     * @memberOf DragDealearOption
     */
    right?: number;
    /**
     *  Called when releasing handle, with the projected x, y position of the handle. Projected value means the value the slider will have after finishing a sliding animation, caused by either a step restriction or drag motion (see steps and slide options.)
     * 
     * 
     * @memberOf DragDealearOption
     */
    callback?: (x: number, y: number) => void;
    /**
     *  Same as callback(x,y) but only called after a drag motion, not after setting the step manually.
     * 
     * 
     * @memberOf DragDealearOption
     */
    dragStopCallback?: (x: number, y: number) => void;
    /**
     * Same as dragStopCallback(x,y) but called at the beginning of a drag motion and with the sliders initial x, y values.
     * 
     * 
     * @memberOf DragDealearOption
     */
    dragStartCallback?: (x: number, y: number) => void;
    /**
     *  Called every animation loop, as long as the handle is being dragged or in the process of a sliding animation. The x, y positional values received by this callback reflect the exact position of the handle DOM element, which includes exceeding values (even negative values) when the loose option is set true.
     * 
     * 
     * @memberOf DragDealearOption
     */
    animationCallback?: (x: number, y: number) => void;
    /**
     * =handle Custom class of handle element.
     * 
     * @type {string}
     * @memberOf DragDealearOption
     */
    handleClass?: string;
    /**
     * =true Use css3 transform in modern browsers instead of absolute positioning.
     * 
     * @type {boolean}
     * @memberOf DragDealearOption
     */
    css3?: boolean;
    /**
     *  Provide custom requestAnimationFrame function (used in tests).
     * 
     * 
     * @memberOf DragDealearOption
     */
    customRequestAnimationFrame?: () => void;
    /**
     *  Provide custom cancelAnimationFrame function (used in tests).
     * 
     * 
     * @memberOf DragDealearOption
     */
    customCancelAnimationFrame?: () => void;
}
interface DragdealerConstructor {
    new(wrapper: string, options?: DragDealearOption): Dragdealer;
}
interface Dragdealer {

    /**
     * Disable dragging of a Dragdealer instance. Just as with the disabled option, the handle will receive a .disabled class
     * 
     * 
     * @memberOf Dragdealer
     */
    disable(): void;
    /**
     *  Enable dragging of a Dragdealer instance. The .disabled class of the handle will be removed.
     * 
     * 
     * @memberOf Dragdealer
     */
    enable(): void;
    /**
     *  Recalculate the wrapper bounds of a Dragdealer instance, used when the wrapper is responsive and its parent container changed its size, or after changing the size of the wrapper directly.
     * 
     * 
     * @memberOf Dragdealer
     */
    reflow(): void;
    /**
     *  Get the value of a Dragdealer instance programatically.The value is returned as an[x, y]tuple and is the equivalent of the projected value returned by the regular callback, not animationCallback.
     * 
     * 
     * @memberOf Dragdealer
     */
    getValue(): number[];
    /**
     *  Same as getValue, but the value returned is in step increments(see steps option)
     * 
     * 
     * @memberOf Dragdealer
     */
    getStep(): number[];
    /**
     * Set the value of a Dragdealer instance programatically.The 3rd parameter allows to snap the handle directly to the desired value, without any sliding transition.
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {boolean} [snap] 
     * 
     * @memberOf Dragdealer
     */
    setValue(x: number, y?: number, snap?: boolean): void;
    /**
 * Same as setValue, but the value is received in step increments(see steps option)
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {boolean} [snap] 
 * 
 * @memberOf Dragdealer
 */
    setStep(x: number, y: number, snap?: boolean): void;
}

declare var Dragdealer: DragdealerConstructor;
