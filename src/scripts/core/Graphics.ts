import "fpsmeter";
import { logger } from "./_utils";
import { CanvasRenderer } from "./CanvasRenderer";
import { DisplayableObject } from "./DisplayableObject";
/**
 * A static class that handles canvas related functions.
 *
 *
 *
 * @static
 * @class
 */
export class Graphics {
  private static _buffered: boolean = false;
  private static _canvas?: HTMLCanvasElement;
  private static _fpsmeter: FPSMeter;
  private static _fpsmeterBox: HTMLDivElement;
  private static _fpsmeterVisible: boolean = true;
  private static _frameCount: number = 0;
  private static _maxSkip: number = 3;
  private static _rendered: boolean = false;
  private static _renderer: CanvasRenderer;
  private static _skipCount: number = 0;
  /**
   * This is a static class.
   *
   * Calling the constructor will throw an error.
   *
   *
   *
   * @constructor
   */
  constructor() {
    throw new Error("This is a static class.");
  }
  /**
   * Gets or sets whether the graphics will be buffered before rendering to the display.
   *
   *
   *
   * @property
   * @returns boolean
   */
  public static get buffered(): boolean {
    return this._buffered;
  }
  public static set buffered(value: boolean) {
    if (this._buffered !== value) {
      this._buffered = value;
    }
  }
  /**
   * Gets the total frames rendered.
   *
   *
   *
   * @readonly
   * @property
   * @returns number
   */
  public static get frameCount(): number {
    return this._frameCount;
  }
  /**
   * Gets whether the graphics has been rendered to the display.
   *
   *
   *
   * @readonly
   * @property
   * @returns boolean
   */
  public static get rendered(): boolean {
    return this._rendered;
  }
  /**
   * Initializes the graphics components.
   *
   *
   *
   * @public
   * @param props The initialization properties of Graphics class.
   * @returns void
   */
  public static initialize(): void {
    try {
      logger.debug.call(this, "initializing...");

      this.initializeCanvas();
      this.setupEventListeners();
      this.initializeRenderer();
      this.initializeFpsmeter();

      this.resize();

      logger.debug.call(this, "initialized.");
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Renders the stage to the canvas components.
   *
   *
   *
   * @public
   * @param stage The stage to render to the canvas components.
   * @returns void
   */
  public static render(sprite: DisplayableObject): void {
    if (this._skipCount === 0) {
      let start = performance.now();
      if (sprite) {
        this._renderer.render(sprite);
      }
      let end = performance.now();
      let elapsed = end - start;
      this._skipCount = Math.min(Math.floor(elapsed / 15), this._maxSkip);
      this._rendered = true;
    } else {
      this._skipCount--;
      this._rendered = false;
    }
    this._frameCount++;
  }
  /**
   * Resizes the graphics viewport.
   *
   *
   *
   * @public
   * @param width The value to assign to the canvas component width.
   * @param height The value to assign to the canvas component height.
   * @returns void
   */
  public static resize(width?: number, height?: number): void {
    try {
      logger.debug.call(this, "resizing...");

      width ??= window.innerWidth;
      height ??= window.innerHeight;

      if (!!this._canvas) {
        this._canvas.width = width;
        this._canvas.height = height;
        this._canvas.style.width = width + "px";
        this._canvas.style.height = height + "px";
      }

      logger.debug.call(this, "resized.");
      logger.debug.call(this, `w: ${width}px`, `h: ${height}px`);
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Calls the {@link FPSMeter.tick} method.
   * 
   * 
   * 
   * @returns void
   */
  public static tickEnd(): void {
    if (this._fpsmeter && this._fpsmeterVisible) {
      this._fpsmeter.tick();
    }
  }
  /**
   * Calls the {@link FPSMeter.tickStart} method.
   * 
   * 
   * 
   * @returns void
   */
  public static tickStart(): void {
    if (this._fpsmeter && this._fpsmeterVisible) {
      this._fpsmeter.tickStart();
    }
  }
  /**
   * Toggles the {@link FPSMeter} component's visibility.
   * 
   * 
   * 
   * @param visible Tells whether the toggling should be forced the visibility.
   * @returns void
   */
  public static toggleFPSMeter(visible?: boolean): void {
    if (!this._fpsmeter || !this._fpsmeterBox) return;
    this._fpsmeterVisible = visible ?? !this._fpsmeterVisible;
    if (this._fpsmeterVisible) {
      this._fpsmeter.show();
      this._fpsmeterBox.style.display = "block";
    } else {
      this._fpsmeter.hide();
      this._fpsmeterBox.style.display = "none";
    }
  }
  /**
   * Initializes the main canvas component.
   *
   *
   *
   * @private
   * @returns void
   */
  private static initializeCanvas(): void {
    try {
      logger.debug.call(this, "canvas:", "initializing...");

      //  Check for an existing canvas element.
      let canvas = document.querySelector<HTMLCanvasElement>("canvas#main");
      if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "main";
        canvas.style.imageRendering = "pixelated";
        canvas.style.backgroundColor = "black";
        canvas.style.position = "fixed";
        canvas.style.zIndex = "-1";
        canvas.style.left = "0";
        canvas.style.top = "0";
        document.body.append(canvas);
      }
      this._canvas = canvas;

      logger.debug.call(this, "canvas:", "initialized.");
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Initializes the FPSMeter component.
   *
   *
   *
   * @private
   * @returns void
   */
  private static initializeFpsmeter(): void {
    try {
      logger.debug.call(this, "fpsmeter:", "initializing...");

      const options: FPSMeterOptions = {
        left: "20px",
        graph: 1,
        decimals: 0,
        theme: "transparent",
        toggleOn: undefined,
      };

      //  Create the background element for the FPSMeter component.
      this._fpsmeterBox = document.createElement("div");
      this._fpsmeterBox.id = "fpsmeter-box";
      this._fpsmeterBox.style.display = "block";
      this._fpsmeterBox.style.position = "absolute";
      this._fpsmeterBox.style.top = "0";
      this._fpsmeterBox.style.left = "15px";
      this._fpsmeterBox.style.width = "129px";
      this._fpsmeterBox.style.height = "50px";
      this._fpsmeterBox.style.zIndex = "9";
      document.body.append(this._fpsmeterBox);

      //  Create the FPSMeter component.
      this._fpsmeter = new FPSMeter(document.body, options);
      this.toggleFPSMeter();

      logger.debug.call(this, "fpsmeter:", "initialized.");
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Initializes the canvas renderer component.
   *
   *
   *
   * @private
   * @returns void
   */
  private static initializeRenderer(): void {
    try {
      logger.debug.call(this, "renderer:", "initializing...");

      this._renderer = new CanvasRenderer({
        autoClear: true,
        autoClearColor: "black",
        buffered: this._buffered,
        canvas: this._canvas,
      });

      logger.debug.call(this, "renderer:", "initialized.");
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Fires up when the display had been resized.
   *
   *
   *
   * @private
   * @callback
   * @param e The window resize event.
   * @returns void
   */
  private static onresize(e: Event): void {
    this.resize(window.innerWidth, window.innerHeight);
  }
  /**
   * Sets up the event listeners.
   *
   *
   *
   * @private
   * @returns void
   */
  private static setupEventListeners(): void {
    try {
      logger.debug.call(this, "events:", "handling...");

      window.addEventListener("resize", this.onresize.bind(this));

      logger.debug.call(this, "events:", "handled.");
    } catch (error) {
      console.error(error);
    }
  }
}
