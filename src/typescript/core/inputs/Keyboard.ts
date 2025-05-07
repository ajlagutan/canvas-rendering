const KeyboardMapping: any = {
  d: "debug",
  f: "fps",
  g: "gui",
  p: "control",
};
const KeyboardRepeatWait: number = 24;
const KeyboardRepeatInterval: number = 6;
/**
 * Handles the keyboard input events.
 *
 *
 *
 *
 *
 * @abstract
 * @class
 */
export abstract class Keyboard {
  private static _currentState: any;
  private static _latestButton: string | null;
  private static _pressedTime: number;
  private static _previousState: any;
  /**
   * Initializes the keyboard variables.
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
   * Checks if the key has been long pressed.
   *
   *
   *
   * @param key The key to validate.
   * @returns boolean
   */
  public static longPressed(key: string): boolean {
    return (
      this._latestButton === key && this._pressedTime >= KeyboardRepeatWait
    );
  }
  /**
   * Checks if the key has been pressed.
   *
   *
   *
   * @param key The key to validate.
   * @returns boolean
   */
  public static pressed(key: string): boolean {
    return !!this._currentState[key];
  }
  /**
   * Checks if the key has been repeatedly pressed.
   *
   *
   *
   * @param key The key to validate.
   * @returns boolean
   */
  public static repeated(key: string): boolean {
    return (
      this._latestButton === key &&
      (this._pressedTime === 0 ||
        (this._pressedTime >= KeyboardRepeatWait &&
          this._pressedTime % KeyboardRepeatInterval === 0))
    );
  }
  /**
   * Checks if the key has been triggered.
   *
   *
   *
   * @param key The key to validate.
   * @returns boolean
   */
  public static trigger(key: string): boolean {
    return this._latestButton === key && this._pressedTime === 0;
  }
  /**
   * Updates the keyboard state.
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
   * Clears the keyboard state.
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
   * The key down event.
   *
   *
   *
   * @param event The keyboard event.
   * @returns void
   */
  private static onKeyDown(event: KeyboardEvent): void {
    if (this.shouldPreventDefault(event.key)) {
      event.preventDefault();
    }
    if (event.key === "NumLock") {
      this.clear();
    }
    const buttonName = KeyboardMapping[event.key];
    if (buttonName) {
      this._currentState[buttonName] = true;
    }
  }
  /**
   * The key up event.
   *
   *
   *
   * @param event The keyboard event.
   * @returns void
   */
  private static onKeyUp(event: KeyboardEvent): void {
    const buttonName = KeyboardMapping[event.key];
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
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));
    window.addEventListener("blur", this.onLostFocus.bind(this));
  }
  /**
   * Checks if the key should be prevented.
   *
   *
   *
   * @param key The key to validate.
   * @returns boolean
   */
  private static shouldPreventDefault(key: string): boolean {
    return false;
  }
}
