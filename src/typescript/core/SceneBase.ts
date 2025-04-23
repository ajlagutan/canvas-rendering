/**
 * An abstract class that stores and manipulate data that
 * can be updated and rendered on an HTML Canvas element.
 *
 *
 *
 *
 *
 * @class
 * @abstract
 */
export abstract class SceneBase {
  private _height: number = 0;
  private _running: boolean = true;
  private _width: number = 0;
  /**
   * Gets the current height of the scene.
   *
   *
   *
   *
   *
   * @returns number
   */
  public get height(): number {
    return this._height;
  }
  /**
   * Gets the state of the scene.
   * 
   * 
   * 
   * 
   * 
   * @returns boolean
   */
  public get running(): boolean {
    return this._running;
  }
  /**
   * Gets the current width of the scene.
   *
   *
   *
   *
   *
   * @returns number
   */
  public get width(): number {
    return this._width;
  }
  /**
   * Initializes the scene GUI controller.
   *
   *
   *
   *
   *
   * @param gui The dat.GUI global instance.
   * @returns dat.GUI
   */
  public controller(gui: dat.GUI): void {}
  /**
   * Initializes the scene.
   *
   *
   *
   *
   *
   * @returns void
   */
  public initialize(): void {
    return;
  }
  /**
   * Pauses the scene.
   * 
   * 
   * 
   * 
   * 
   * @returns void
   */
  public pause(): void {
    if (this._running) {
      this._running = !this._running;
    }
  }
  /**
   * Plays the scene.
   * 
   * 
   * 
   * 
   * 
   * @returns void
   */
  public play(): void {
    if (!this._running) {
      this._running = !this._running;
    }
  }
  /**
   * Renders the scene on the HTML Canvas element.
   *
   *
   *
   *
   *
   * @param context The canvas rendering context.
   * @returns void
   */
  public render(context: CanvasRenderingContext2D): void {
    return;
  }
  /**
   * Resizes the scene's viewport width and height components.
   *
   *
   *
   *
   *
   * @param width The value to assign to the viewport's width.
   * @param height The value to assign to the viewport's height.
   * @returns void
   */
  public resize(width: number, height: number): void {
    this._width = width;
    this._height = height;
  }
  /**
   * Updates the scene data using the fixed delta time parameter.
   *
   *
   *
   *
   *
   * @param time The fixed delta time per update.
   * @returns void
   */
  public update(time: number): void {
    return;
  }
}
