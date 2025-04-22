import "fpsmeter";
import { KeyboardInput } from "./Inputs";
import { SceneBase } from "./SceneBase";
/**
 * Fixed time step; 60 frames per second.
 */
const step = 1 / 60;
/**
 * The {@link SceneManager} class, manages the active scene state.
 */
export class SceneManager {
  private _accumulatedTime: number = 0;
  private _background: string | null = null;
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D | null = null;
  private _fpsmeter: FPSMeter | null = null;
  private _scene: SceneBase | null = null;
  private _showFpsMeter: boolean = true;
  private _timestamp: number = 0;
  private _running: boolean = false;
  /**
   * Creates a new instance of SceneManager class.
   * @param canvas An optional {@link HTMLCanvasElement} instance.
   */
  constructor(canvas: HTMLCanvasElement | null = null) {
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.textContent =
        "Your browser does not support the HTML5 Canvas element.";
      document.body.insertBefore(canvas, document.body.firstChild);
    }
    this._canvas = canvas;
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
    this._context = canvas.getContext("2d");
    this._fpsmeter = new FPSMeter(document.body, {
      graph: 1,
      decimals: 0,
      theme: "colorful",
      toggleOn: "click",
    });
    this._fpsmeter.show();
  }
  /**
   * Gets or sets the background color of the defined
   * {@link HTMLCanvasElement} on this scene manager instance.
   */
  public get background(): string | null {
    return this._background;
  }
  public set background(v: string | null) {
    if (this._background !== v) {
      this._background = v;
    }
  }
  /**
   * Gets the {@link HTMLCanvasElement}
   * defined on this scene manager instance.
   */
  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }
  /**
   * Gets the {@link CanvasRenderingContext2D}
   * defined on this scene manager instance.
   */
  public get context(): CanvasRenderingContext2D | null {
    return this._context;
  }
  /**
   * Gets the running state of the loop.
   */
  public get running(): boolean {
    return this._running;
  }
  /**
   * Gets or sets the visibility of the
   * {@link FPSMeter} defined on the scene manager.
   */
  public get showFpsMeter(): boolean {
    return this._showFpsMeter;
  }
  public set showFpsMeter(v: boolean) {
    if (v) {
      this._fpsmeter?.show();
    } else {
      this._fpsmeter?.hide();
    }
    this._showFpsMeter = v;
  }
  /** Gets or sets the currently active scene. */
  public get scene(): SceneBase | null {
    return this._scene;
  }
  public set scene(s: SceneBase | null) {
    this._scene = s;
  }
  public initialize() {
    KeyboardInput.initialize();
    this.hookWindowEvents();
  }
  /**
   * Resets the background color of the defined
   * {@link HTMLCanvasElement} on this scene manager instance.
   */
  public resetBackground(): void {
    this.background = null;
  }
  /**
   * Starts the updating scene and rendering to the defined {@link HTMLCanvasElement}.
   */
  public start(): void {
    if (!this._running) {
      this._running = true;
      requestAnimationFrame(this.loop.bind(this));
    }
  }
  /**
   * Stops the updates and render.
   */
  public stop(): void {
    this._running = false;
  }
  private eventWindowResize(e: UIEvent): void {
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
  }
  private hookWindowEvents(): void {
    window.addEventListener("resize", this.eventWindowResize.bind(this));
  }
  private initializeComponents(): void {
    KeyboardInput.initialize();
  }
  /**
   * Renders a scene on to the {@link HTMLCanvasElement} defined on the scene manager.
   * @param scene The scene to render on to the {@link HTMLCanvasElement}.
   */
  private renderScene(): void {
    if (this._scene && this._context) {
      this._scene.render(this._context);
    }
  }
  private tickEnd(): void {
    if (this._fpsmeter) {
      this._fpsmeter.tick();
    }
  }
  private tickStart(): void {
    if (this._fpsmeter) {
      this._fpsmeter.tickStart();
    }
  }
  /**
   * Update all the components defined on the scene manager.
   */
  private updateInputs(): void {
    KeyboardInput.update();
  }
  /**
   * Updates the scene.
   * @param scene The scene to update using a fixed time step.
   * @param time The fixed time step value.
   */
  private updateScene(time: number): void {
    if (this._scene) {
      this._scene.update(time);
    }
  }
  /**
   * The main loop.
   * @param timestamp The current timestamp of the frame request.
   */
  protected loop(timestamp: number): void {
    this.tickStart();
    try {
      let deltaTime = (timestamp - this._timestamp) / 1000;
      this._timestamp = timestamp;
      this._accumulatedTime += timestamp - this._timestamp;
      console.log("deltaTime:", deltaTime, "accumulatedTime:", this._accumulatedTime, "step:", step);
      while (this._accumulatedTime >= step) {
        this.updateInputs();
        this.updateScene(step);
        this._accumulatedTime -= step;
      }
      this.renderScene();
      requestAnimationFrame(this.loop.bind(this));
    } catch (error) {
      throw error;
    }
    this.tickEnd();
  }
}
