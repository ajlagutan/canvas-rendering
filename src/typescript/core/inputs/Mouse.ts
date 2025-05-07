const MouseMapping: any = {
  1: "left",
  2: "right",
  4: "middle",
  8: "back",
  16: "forward",
};
const MouseRepeatWait: number = 24;
const MouseRepeatInterval: number = 6;
/**
 * Handles the mouse input events.
 *
 *
 *
 *
 *
 * @abstract
 * @class
 */
export abstract class Mouse {
  private static _currentState: any;
  private static _latestButton: string | null;
  private static _pressedTime: number;
  private static _previousState: any;
  private static _x: number | undefined;
  private static _y: number | undefined;
  /**
   * Gets the mouse x-coordinate.
   *
   *
   *
   * @returns number | undefined
   */
  public static get x(): number | undefined {
    return this._x;
  }
  /**
   * Gets the mouse y-coordinate.
   *
   *
   *
   * @returns number | undefined
   */
  public static get y(): number | undefined {
    return this._y;
  }
  /**
   * Initializes the mouse state.
   *
   *
   *
   * @returns void
   */
  public static initialize(): void {
    this.clear();
    this.setupEventHandlers();
  }
  /**
   * Checks if the button has been long pressed.
   *
   *
   *
   * @param button The button to validate.
   * @returns boolean
   */
  public static longPressed(button: string): boolean {
    return (
      this._latestButton === button && this._pressedTime >= MouseRepeatWait
    );
  }
  /**
   * Checks if the button has been pressed.
   *
   *
   *
   * @param button The button to validate.
   * @returns boolean
   */
  public static pressed(button: string): boolean {
    return !!this._currentState[button];
  }
  /**
   * Checks if the button has been repeatedly pressed.
   *
   *
   *
   * @param button The button to validate.
   * @returns boolean
   */
  public static repeated(button: string): boolean {
    return (
      this._latestButton === button &&
      (this._pressedTime === 0 ||
        (this._pressedTime >= MouseRepeatWait &&
          this._pressedTime % MouseRepeatInterval === 0))
    );
  }
  /**
   * Checks if the button has been triggered.
   *
   *
   *
   * @param button The button to validate.
   * @returns boolean
   */
  public static trigger(button: string): boolean {
    return this._latestButton === button && this._pressedTime === 0;
  }
  /**
   * Updates the mouse state.
   *
   *
   *
   * @returns void
   */
  public static update(): void {
    if (this._latestButton && this._currentState[this._latestButton]) {
      this._pressedTime++;
    } else {
      this._latestButton = null;
    }
    for (let name in this._currentState) {
      if (this._currentState[name] && !this._previousState[name]) {
        this._latestButton = name;
        this._pressedTime = 0;
      }
      this._previousState[name] = this._currentState[name];
    }
  }
  /**
   * Clears the mouse state.
   *
   *
   *
   * @returns void
   */
  private static clear(): void {
    this._currentState = {};
    this._previousState = {};
    this._latestButton = null;
    this._pressedTime = 0;
    this._x = undefined;
    this._y = undefined;
  }
  /**
   * The lost focus event.
   *
   *
   *
   * @param event The event.
   * @returns void
   */
  private static onLostFocus(event: Event): void {
    this.clear();
  }
  /**
   * The mouse down event.
   *
   *
   *
   * @param event The mouse event.
   * @returns void
   */
  private static onMouseDown(event: MouseEvent): void {
    if (this.shouldPreventDefault(event.buttons)) {
      event.preventDefault();
    }
    const buttonName = MouseMapping[event.buttons];
    if (buttonName) {
      this._currentState[buttonName] = true;
    }
  }
  /**
   * The mouse leave event.
   *
   *
   *
   * @param event The mouse event.
   * @returns void
   */
  private static onMouseLeave(event: MouseEvent): void {
    this.clear();
  }
  /**
   * The mouse move event.
   *
   *
   *
   * @param event The mouse event.
   * @returns void
   */
  private static onMouseMove(event: MouseEvent): void {
    this._x = event.x;
    this._y = event.y;
  }
  /**
   * The mouse up event.
   *
   *
   *
   * @param event The mouse event.
   * @returns void
   */
  private static onMouseUp(event: MouseEvent): void {
    const buttonName = MouseMapping[event.buttons];
    if (buttonName) {
      this._currentState[buttonName] = false;
    }
  }
  /**
   * Sets up the event handlers.
   *
   *
   *
   * @returns void
   */
  private static setupEventHandlers(): void {
    document.addEventListener("mousedown", this.onMouseDown.bind(this));
    document.addEventListener("mouseleave", this.onMouseLeave.bind(this));
    document.addEventListener("mousemove", this.onMouseMove.bind(this));
    document.addEventListener("mouseup", this.onMouseUp.bind(this));
    window.addEventListener("blur", this.onLostFocus.bind(this));
  }
  /**
   * Checks if the button should be prevented.
   *
   *
   *
   * @param button The button to validate.
   * @returns boolean
   */
  private static shouldPreventDefault(button: number): boolean {
    return false;
  }
}
