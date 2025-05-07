import "fpsmeter";
import * as lil from "lil-gui";
import * as Scenes from "../scenes";
import { SceneConstructor } from "./Interfaces";
import { SceneBase } from "./SceneBase";
import { Mouse } from "./Inputs";
import { SceneRecorder } from "./SceneRecorder";
import { Rectangle } from "../core";
/**
 *
 */
type SceneManagerInitProps = { autoStart?: boolean };
/**
 *
 *
 *
 *
 *
 */
type SceneManagerState = "playing" | "paused";
/**
 * A static class that manages the scenes.
 *
 *
 *
 *
 *
 * @static
 * @class
 */
export abstract class SceneManager {
  private static _bufferCanvas: HTMLCanvasElement | null = null;
  private static _bufferContext: CanvasRenderingContext2D | null = null;
  private static _canvas: HTMLCanvasElement | null = null;
  private static _context: CanvasRenderingContext2D | null = null;
  private static _controlPanel: lil.GUI | null = null;
  private static _fixedStep: number = 1 / 165;
  private static _fpsmeter: FPSMeter | null = null;
  private static _fpsmeterBox: HTMLElement | null = null;
  private static _running: boolean = false;
  private static _scene: SceneBase | null = null;
  private static _sceneControlPanel: lil.GUI | null = null;
  private static _sceneStateOnBlur: SceneManagerState | null;
  private static _stageControlPanel: lil.GUI | null = null;
  private static _time: number = 0;
  private static _timeAcc: number = 0;
  /**
   * Gets or sets the active scene to render.
   *
   *
   *
   * @returns SceneBase | null
   */
  public static get scene(): SceneBase | null {
    return this._scene;
  }
  /**
   * @param value The active scene to render.
   */
  public static set scene(value: SceneBase | null) {
    if (this._scene && this._scene !== value) {
      this.destroySceneControlPanel();
      this._scene.pause();
      this._scene = null;
    }
    if (value) {
      const w = this._canvas?.width ?? window.innerWidth;
      const h = this._canvas?.height ?? window.innerHeight;
      value.resize(w, h);
      value.initialize();
      value.play();
    }
    this._scene = value;
    this.createSceneControlPanel();
  }
  /**
   * Initializes the SceneManager and its components.
   *
   *
   *
   * @param start Optional. If set to true, the SceneManager would fire up the requestAnimationFrame instantly after initializing all the components.
   * @returns void
   */
  public static initialize(props?: SceneManagerInitProps): void {
    this.initializeCanvas();
    this.hookWindowEvents();
    this.initializeFpsmeter();
    this.initializeControlPanel();
  }
  /**
   * Starts the scene updates and rendering.
   *
   *
   *
   * @returns void
   */
  public static start(): void {
    if (!this._running) {
      this._running = true;
      requestAnimationFrame(this.mainLoop.bind(this));
    }
  }
  /**
   * Creates a canvas buffer.
   *
   *
   *
   * @returns void
   */
  private static createCanvasBuffer(): void {
    if (!Options.Graphics.buffer) {
      this._bufferCanvas = document.createElement("canvas");
      this._bufferContext = this._bufferCanvas.getContext("2d");
    }
  }
  /**
   * Creates the scene control panel.
   *
   *
   *
   * @returns void
   */
  private static createSceneControlPanel(): void {
    if (!this._controlPanel) {
      return;
    }
    this._sceneControlPanel = this._controlPanel.addFolder("scene settings");
    this._sceneControlPanel.open();
    if (this._scene && this._scene.constructor) {
      this._scene.controller(this._sceneControlPanel);
    }
  }
  /**
   * Destroys a canvas buffer.
   *
   *
   *
   * @returns void
   */
  private static destroyCanvasBuffer(): void {
    if (this._bufferCanvas) {
      this._bufferCanvas = null;
      this._bufferContext = null;
    }
  }
  /**
   * Destroys the scene control panel.
   *
   *
   *
   * @returns void
   */
  private static destroySceneControlPanel(): void {
    if (this._sceneControlPanel) {
      this._sceneControlPanel.destroy();
      this._sceneControlPanel = null;
    }
  }
  /**
   * Hooks window events.
   *
   *
   *
   * @returns void
   */
  private static hookWindowEvents(): void {
    window.addEventListener("blur", this.windowBlurEvent.bind(this));
    window.addEventListener("focus", this.windowFocusEvent.bind(this));
    window.addEventListener("resize", this.windowResizeEvent.bind(this));
  }
  /**
   * Initializes the canvas components.
   *
   *
   *
   * @returns void
   */
  private static initializeCanvas(): void {
    //  Checks the document.body if theres an existing canvas element.
    let canvas = document.body.querySelector("canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.style.imageRendering = "pixelated";
      canvas.style.backgroundColor = "black";
      canvas.style.position = "fixed";
      canvas.style.zIndex = "-1";
      canvas.style.left = "0";
      canvas.style.top = "0";
      document.body.appendChild(canvas);
    }
    this._canvas = canvas;
    this._context = this._canvas.getContext("2d");
    //  Create the canvas buffer.
    this.createCanvasBuffer();
    //  Resize the canvas initially.
    this.resize(window.innerWidth, window.innerHeight);
  }
  /**
   * Initializes the lil.GUI components.
   *
   *
   *
   * @returns void
   */
  private static initializeControlPanel(): void {
    try {
      this._controlPanel = new lil.GUI({ title: "control panel" });
      this._controlPanel.add(Options.Debug, "visible").name("show debug");
      this._controlPanel
        .add(Options.Frame, "visible")
        .onFinishChange(this.toggleFpsmeter.bind(this))
        .name("show fpsmeter");
      this._controlPanel
        .add(Options.Frame, "fps", 30, 250, 1)
        .onFinishChange(this.setFixedStep.bind(this))
        .name("frame rate");

      this._stageControlPanel = this._controlPanel
        .addFolder("stage")
        .onFinishChange(this.save.bind(this));

      this._stageControlPanel
        .add(Options.Graphics, "buffer")
        .onFinishChange(this.toggleCanvasBuffer.bind(this))
        .name("use buffer");

      let scenes: any = {};
      let initialScene: SceneBase | null = null;
      for (let name in Scenes) {
        const ctor: SceneConstructor = Object.assign(Scenes)[name];
        const scene: SceneBase = new ctor();
        scenes[scene.displayTitle ?? name] = scene;
        initialScene ??= scene;
      }
      this._stageControlPanel.add(this, "scene", scenes).name("scene").listen();

      this.scene = initialScene;
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Initializes the fpsmeter components.
   *
   *
   *
   * @returns void
   */
  private static initializeFpsmeter(): void {
    const options: FPSMeterOptions = {
      left: "20px",
      graph: 1,
      decimals: 0,
      theme: "transparent",
      toggleOn: undefined,
    };
    //  Create the anchor element for the fpsmeter component.
    this._fpsmeterBox = document.createElement("div");
    this._fpsmeterBox.id = "fpsmeter-box";
    this._fpsmeterBox.style.position = "absolute";
    this._fpsmeterBox.style.top = "0";
    this._fpsmeterBox.style.left = "15px";
    this._fpsmeterBox.style.width = "129px";
    this._fpsmeterBox.style.height = "50px";
    this._fpsmeterBox.style.zIndex = "9";
    //  Create the fpsmeter component, then hide it.
    this._fpsmeter = new FPSMeter(document.body, options);
    //  Appends the anchor with the fpsmeter component.
    document.body.appendChild(this._fpsmeterBox);
    //  Toggle FPSMeter
    this.toggleFpsmeter(Options.Frame.visible);
  }
  /**
   * The main loop.
   *
   *
   *
   * @param time The time elapsed in milliseconds.
   * @returns void
   */
  private static mainLoop(time: number): void {
    try {
      if (this._running) {
        this.tickStart();
        let deltaTime = (time - this._time) / 1000;
        this._time = time;
        this._timeAcc += deltaTime;
        while (this._timeAcc >= this._fixedStep) {
          this._timeAcc -= this._fixedStep;
          this.update(this._fixedStep);
        }
        this.render();
        this.tickEnd();
      }
      requestAnimationFrame(this.mainLoop.bind(this));
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Renders the scene.
   *
   *
   *
   * @returns void
   */
  private static render(): void {
    //  Check the scene to render
    if (!this._scene) return;
    //  Check which canvas context to use
    const context = Options.Graphics.buffer
      ? this._bufferContext
      : this._context;
    //  Check the context
    if (!context) return;
    //  Render the scene to the context
    this._scene.render(context);
    if (!Options.Graphics.buffer) return;
    if (this._context && this._bufferCanvas) {
      this._context.drawImage(
        this._bufferCanvas,
        0,
        0,
        this._bufferCanvas.width,
        this._bufferCanvas.height
      );
    }
  }
  /**
   * Resizes the canvas components.
   *
   *
   *
   * @param width The width value.
   * @param height The height value.
   */
  private static resize(width: number, height: number): void {
    //  Resize the main canvas
    if (this._canvas) {
      this._canvas.width = width;
      this._canvas.height = height;
      this._canvas.style.width = width + "px";
      this._canvas.style.height = height + "px";
    }
    //  Resize the buffer canvas
    if (this._bufferCanvas) {
      this._bufferCanvas.width = width;
      this._bufferCanvas.height = height;
      this._bufferCanvas.style.width = width + "px";
      this._bufferCanvas.style.height = height + "px";
    }
    if (this._scene) {
      this._scene.resize(width, height);
    }
  }
  /**
   * Saves the configuration.
   *
   *
   *
   * @returns void
   */
  private static save(): void {
    console.log(arguments);
  }
  /**
   * Sets the fixed step.
   *
   *
   *
   * @param frameRate The frame rate (in Hz).
   * @returns void
   */
  private static setFixedStep(frameRate: number): void {
    this._fixedStep = 1 / frameRate;
    console.info(this._fixedStep);
  }
  /**
   * Calls the fpsmeter component tick() method.
   *
   *
   *
   * @returns void
   */
  private static tickEnd(): void {
    if (Options.Frame.visible && this._fpsmeter) {
      this._fpsmeter.tick();
    }
  }
  /**
   * Calls the fpsmeter component tickStart() method.
   *
   *
   *
   * @returns void
   */
  private static tickStart(): void {
    if (Options.Frame.visible && this._fpsmeter) {
      this._fpsmeter.tickStart();
    }
  }
  private static toggleCanvasBuffer(buffered: boolean): void {
    if (buffered) {
      this.createCanvasBuffer();
    } else {
      this.destroyCanvasBuffer();
    }
  }
  /**
   * Toggles the fpsmeter component visibility.
   *
   *
   *
   * @param visible Tells whether the fpsmeter component is visible.
   * @returns void
   */
  private static toggleFpsmeter(visible: boolean): void {
    if (!this._fpsmeter || !this._fpsmeterBox) return;
    if (visible) {
      this._fpsmeter.show();
      this._fpsmeterBox.style.display = "block";
    } else {
      this._fpsmeter.hide();
      this._fpsmeterBox.style.display = "none";
    }
  }
  /**
   * Updates the scene.
   *
   *
   *
   * @param time The value of time that has passed (in ms).
   * @returns void
   */
  private static update(time: number): void {
    if (this._scene && this._scene.running) {
      this._scene.update(time);
    }
  }
  /**
   * The window blur event.
   *
   *
   *
   * @returns void
   */
  private static windowBlurEvent(): void {
    if (!this._scene) return;
    if (!this._scene.running) {
      this._sceneStateOnBlur = "paused";
      return;
    }
  }
  /**
   * The window focus event.
   *
   *
   *
   * @returns void
   */
  private static windowFocusEvent(): void {
    if (!this._scene) return;
    if (!this._sceneStateOnBlur || this._sceneStateOnBlur === "paused") {
      this._sceneStateOnBlur = null;
      return;
    }
    this._scene.play();
    this._sceneStateOnBlur = null;
  }
  /**
   * The window resize event.
   *
   *
   *
   * @returns void
   */
  private static windowResizeEvent(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.resize(w, h);
  }
}
/**
 * A namespace that handles scene manager options.
 *
 * @namespace
 */
namespace Options {
  /**
   * A class that handles debug options.
   *
   * @abstract
   * @class
   */
  export abstract class Debug {
    /**
     * Gets or sets whether the debug component is visible.
     *
     * @returns boolean
     * @default false
     */
    public static visible: boolean = false;
  }
  /**
   * A class that handles graphic options.
   *
   * @abstract
   * @class
   */
  export abstract class Graphics {
    /**
     * Gets or sets whether the graphics would use canvas buffering.
     *
     * @returns boolean
     * @default false
     */
    public static buffer: boolean = false;
  }
  /**
   * A class that handles request animation frame options.
   *
   * @abstract
   * @class
   */
  export abstract class Frame {
    /**
     * Gets or sets the frames per second.
     *
     * @returns number
     * @default 165
     */
    public static fps: number = 165;
    /**
     * Gets or sets whether the fpsmeter component is visible.
     *
     * @returns boolean
     * @default false
     */
    public static visible: boolean = false;
  }
}
