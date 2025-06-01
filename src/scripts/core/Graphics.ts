import "fpsmeter";
import { clamp, logger, mod } from "./_utils";
import { CanvasRenderer } from "./CanvasRenderer";
import { DisplayableObject } from "./DisplayableObject";
/**
 * The loading display text.
 *
 *
 *
 * @constant
 */
const LOADING_TEXT = "loading scene";
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
  private static _height: number = 0;
  private static _loadingCount: number = 0;
  private static _loadingState: number = -1;
  private static _loadingStep: number = 0.5;
  private static _maxSkip: number = 3;
  private static _rendered: boolean = false;
  private static _renderer: CanvasRenderer;
  private static _skipCount: number = 0;
  private static _upperCanvas?: HTMLCanvasElement;
  private static _width: number = 0;
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
   * Gets or sets whether the graphics will show the FPSMeter component.
   * 
   * 
   * 
   * @property
   * @returns boolean
   */
  public static get fpsMeterVisible(): boolean {
    return this._fpsmeterVisible;
  }
  public static set fpsMeterVisible(value: boolean) {
    if (this._fpsmeterVisible !== value) {
      this._fpsmeterVisible = value;
      this.toggleFPSMeter(value);
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
   * Erases the loading display.
   *
   *
   *
   * @returns void
   */
  public static endLoading(): void {
    this.clearUpperCanvas();
    if (this._upperCanvas) {
      this._upperCanvas.style.opacity = "0";
    }
  }
  /**
   * Initializes the graphics components.
   *
   *
   *
   * @public
   * @returns void
   */
  public static initialize(width?: number, height?: number): void {
    try {
      logger.debug.call(this, "initializing...");

      this._width = width || window.innerWidth;
      this._height = height || window.innerHeight;

      this.initializeCanvas();
      this.initializeUpperCanvas();
      this.setupEventListeners();
      this.initializeRenderer();
      this.initializeFpsmeter();

      this.resize(this._width, this._height);

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
      if (!!this._upperCanvas) {
        this._upperCanvas.width = width;
        this._upperCanvas.height = height;
        this._upperCanvas.style.width = width + "px";
        this._upperCanvas.style.height = height + "px";
      }

      logger.debug.call(this, "resized.");
      logger.debug.call(this, `w: ${width}px`, `h: ${height}px`);
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Initializes the loading display.
   *
   *
   *
   * @returns void
   */
  public static startLoading(): void {
    this._loadingState = 0;
    this._loadingCount = 0;
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
   * Updates the loading display.
   *
   *
   *
   * @returns void
   */
  public static updateLoading(): void {
    if (this._loadingState === 0) {
      if (this._loadingCount > 20) {
        this._loadingState = 1;
      }
    } else if (this._loadingState === 1) {
      if (30 <= this._loadingCount || this._loadingCount <= 20) {
        this._loadingStep = -this._loadingStep;
      }
    }
    this._loadingCount += this._loadingStep;
    this.paintUpperCanvas();
    if (this._upperCanvas) {
      this._upperCanvas.style.opacity = "1";
    }
  }
  /**
   * Clears the upper canvas component display.
   *
   *
   *
   * @returns void
   */
  private static clearUpperCanvas(): void {
    if (this._upperCanvas) {
      let context = this._upperCanvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, this._width, this._height);
      }
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
   * Initializes the upper canvas component.
   */
  private static initializeUpperCanvas(): void {
    try {
      logger.debug.call(this, "upper canvas:", "initializing...");

      this._upperCanvas = document.createElement("canvas");
      this._upperCanvas.id = "upper-canvas";
      this._upperCanvas.style.imageRendering = "pixelated";
      this._upperCanvas.style.position = "fixed";
      this._upperCanvas.style.opacity = "0";
      this._upperCanvas.style.zIndex = "0";
      this._upperCanvas.style.left = "0";
      this._upperCanvas.style.top = "0";
      document.body.append(this._upperCanvas);

      logger.debug.call(this, "upper canvas:", "initialized.");
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
   * Draws the loading display.
   *
   *
   *
   * @returns void
   */
  private static paintUpperCanvas(): void {
    this.clearUpperCanvas();
    if (this._upperCanvas && this._loadingCount >= 20) {
      let context = this._upperCanvas.getContext("2d");
      if (context) {
        let dx = this._width / 2;
        let dy = this._height / 2;
        let alpha = clamp((this._loadingCount - 20) / 30, 0, 1);
        context.save();
        context.globalAlpha = alpha;
        context.font = "bold 24pt monospace";
        context.textAlign = "center";
        context.textBaseline = "alphabetic";
        context.textRendering = "optimizeLegibility";
        context.fillStyle = "white";
        context.fillText(LOADING_TEXT, dx, dy);
        context.strokeStyle = "black";
        context.strokeText(LOADING_TEXT, dx, dy);
        context.restore();
      }
    }
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
