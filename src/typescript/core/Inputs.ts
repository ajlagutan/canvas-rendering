/**
 * An abstract class that handles the keyboard inputs.
 */
export abstract class KeyboardInput {
  private static _currentState: Map<string, boolean> | any = {};
  private static _date: number = 0;
  private static _keyMapper: Map<string, string> | any = {
    KeyA: "left",
    KeyD: "right",
    KeyS: "down",
    KeyW: "up",
  };
  private static _latestButton: string | null = null;
  private static _pressedTime: number = 0;
  private static _previousState: Map<string, boolean> | any = {};
  public static get currentState(): Map<string, boolean> | any {
    return this._currentState;
  }
  /**
   * Gets the last update date.
   */
  public static get date(): number {
    return this._date;
  }
  /**
   * Gets the keyboard mapping.
   */
  public static get keyMapper(): Map<string, string> | any {
    return this._keyMapper;
  }
  // Mappings
  public static initialize(): void {
    try {
      this.hookEvents();
    } catch {
      throw new Error("Input initialization failed.");
    }
  }
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
        this._date = Date.now();
      }
      this._previousState[name] = this._currentState[name];
    }
  }
  private static clear(): void {
    this._currentState = {};
    this._previousState = {};
    this._latestButton = null;
    this._pressedTime = 0;
    this._date = 0;
  }
  private static hookEvents(): void {
    document.addEventListener("keydown", this.eventKeyDown.bind(this));
    document.addEventListener("keyup", this.eventKeyUp.bind(this));
    window.addEventListener("blur", this.eventBlur.bind(this));
  }
  private static eventKeyDown(e: KeyboardEvent): void {
    if (this.shouldPreventDefault(e.code)) {
      e.preventDefault();
    }
    const buttonName = this.keyMapper[e.code];
    if (buttonName) {
      this._currentState[buttonName] = true;
    }
  }
  private static eventKeyUp(e: KeyboardEvent): void {
    const buttonName = this.keyMapper[e.code];
    if (buttonName) {
      this._currentState[buttonName] = false;
    }
  }
  private static eventBlur(e: FocusEvent): void {
    this.clear();
  }
  private static shouldPreventDefault(key: string): boolean {
    return false;
  }
}
/**
 * Mouse class handles and manages the browser's window mouse inputs.
 *
 *
 *
 *
 *
 * @abstract
 * @class
 */
export abstract class Mouse {
  private static _x: number | undefined = undefined;
  private static _y: number | undefined = undefined;
  /**
   * Gets the mouse x coordinate.
   *
   *
   *
   *
   *
   * @returns number | undefined
   */
  public static get x(): number | undefined {
    return this._x;
  }
  /**
   * Gets the mouse y coordinate.
   *
   *
   *
   *
   *
   * @returns number | undefined
   */
  public static get y(): number | undefined {
    return this._y;
  }
  /**
   * Initializes the Mouse class.
   *
   *
   *
   *
   *
   * @returns void
   */
  public static initialize(): void {
    this.hookWindowEvents();
  }
  /**
   * Hooks browser window events to the mouse class.
   *
   *
   *
   *
   *
   * @returns void
   */
  private static hookWindowEvents(): void {
    document.addEventListener(
      "mousemove",
      this.windowMouseMoveEvent.bind(this)
    );
    document.addEventListener(
      "mouseleave",
      this.windowMouseLeaveEvent.bind(this)
    );
  }
  /**
   * Window mouse leave event.
   *
   *
   *
   *
   *
   * @param e The mouse event.
   */
  private static windowMouseLeaveEvent(e: MouseEvent): void {
    this._x = undefined;
    this._y = undefined;
  }
  /**
   * Window mouse move event.
   *
   *
   *
   *
   *
   * @param e The mouse event.
   */
  private static windowMouseMoveEvent(e: MouseEvent): void {
    this._x = e.x;
    this._y = e.y;
  }
}
