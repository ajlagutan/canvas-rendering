import * as lil from "lil-gui";
/**
 * The constructor of {@link SceneBase} class.
 *
 *
 *
 *
 *
 * @returns SceneBase
 */
export interface SceneConstructor {
  new (width?: number, height?: number): SceneBase;
}
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
  private _initialized: boolean = false;
  private _running: boolean = false;
  private _width: number = 0;
  /**
   * Creates a new instance of SceneBase object.
   *
   *
   *
   * @constructor
   * @param width The scene width.
   * @param height The scene height.
   */
  constructor(width?: number, height?: number) {
    this._width = width ?? window.innerWidth;
    this._height = height ?? window.innerHeight;
  }
  /**
   * Gets the current height of the scene.
   *
   *
   *
   * @returns number
   */
  public get height(): number {
    return this._height;
  }
  /**
   * Gets the state of scene, whether it needs to be initialized.
   *
   *
   *
   * @returns boolean
   */
  public get initialized(): boolean {
    return this._initialized;
  }
  /**
   * Gets the state of the scene.
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
   * @param parent The lil.GUI global instance.
   * @returns lil.GUI
   */
  public controller(parent: lil.GUI): void {
    parent.hide();
  }
  /**
   * Initializes the scene.
   *
   *
   *
   * @returns void
   */
  public initialize(): void {
    this._initialized = true;
  }
  /**
   * Pauses the scene.
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
   * @param context The canvas rendering context.
   * @returns void
   */
  public render(context: CanvasRenderingContext2D): void {
    context.clearRect(0, 0, this._width, this._height);
  }
  /**
   * Resizes the scene's viewport width and height components.
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
   * @param time The fixed delta time per update.
   * @returns void
   */
  public update(time: number): void {}
}
