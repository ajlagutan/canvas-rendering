import "fpsmeter";
import * as lil from "lil-gui";
import * as Scenes from "../scenes";
import { SceneBase, SceneConstructor } from "./SceneBase";
import { SceneRecorder } from "./SceneRecorder";
import { Keyboard, Mouse, Rectangle } from "../core";
import { debug } from "../utils";
/**
 *
 */
type SceneManagerInitProps = { autoStart?: boolean };
/**
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
  private static _controlPanelVisible: boolean = true;
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
   * @returns void
   */
  public static initialize(props?: SceneManagerInitProps): void {
    try {
      debug(this.prototype, "initializing...");

      this.initializeCanvas();
      this.setupEventHandlers();
      this.initializeFpsmeter();
      this.initializeControlPanel();
      this.initializeInput();

      debug(this.prototype, "initialized.");
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Starts the scene updates and rendering.
   *
   *
   *
   * @returns void
   */
  public static start(): void {
    try {
      if (!this._running) {
        debug(this.prototype, "starting...");

        this._running = true;
        requestAnimationFrame(this.mainLoop.bind(this));

        debug(this.prototype, "started.");
      }
    } catch (error) {
      console.error(error);
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
    if (!Options.Stage.buffer) {
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
   * Initializes the canvas components.
   *
   *
   *
   * @returns void
   */
  private static initializeCanvas(): void {
    try {
      debug(this.prototype, "canvas:", "initializing...");

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

      debug(this.prototype, "canvas:", "initialized.");
    } catch (error) {
      console.error(error);
    }
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
      debug(this.prototype, "control panel:", "initializing...");

      this._controlPanel = new lil.GUI({ title: "control panel" });
      this._controlPanel.add(Options.Debug, "visible").name("show debug");

      this._controlPanel
        .add(Options.Frame, "visible")
        .onFinishChange(this.toggleFpsmeter.bind(this))
        .name("show fpsmeter")
        .listen();

      this._controlPanel
        .add(Options.Frame, "fps", 30, 250, 1)
        .onFinishChange(this.setFixedStep.bind(this))
        .name("frame rate");

      this._stageControlPanel = this._controlPanel
        .addFolder("stage")
        .onFinishChange(this.save.bind(this));

      this._stageControlPanel
        .add(Options.Stage, "buffer")
        .onFinishChange(this.toggleCanvasBuffer.bind(this))
        .name("use buffer");

      const scenes = Object.keys(Scenes);

      this._stageControlPanel
        .add(Options.Stage, "scene", scenes)
        .onChange(this.setScene.bind(this))
        .setValue(scenes.length > 0 ? scenes[0] : "")
        .name("scene");

      debug(this.prototype, "control panel:", "initialized.");
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
    try {
      debug(this.prototype, "fps meter:", "initializing...");

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

      debug(this.prototype, "fps meter:", "initialized.");
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Initializes the inputs.
   *
   *
   *
   * @returns void
   */
  private static initializeInput(): void {
    try {
      debug(this.prototype, "input:", "initializing...");

      Keyboard.initialize();
      Mouse.initialize();

      debug(this.prototype, "input:", "initialized.");
    } catch (error) {
      console.error(error);
    }
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
        this.updateInput(time);
        this.update(time);
        this.tickEnd();
      }
      requestAnimationFrame(this.mainLoop.bind(this));
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * The window focus event.
   *
   *
   *
   * @returns void
   */
  private static onFocus(event: Event): void {
    if (!this._scene) return;
    if (!this._sceneStateOnBlur || this._sceneStateOnBlur === "paused") {
      this._sceneStateOnBlur = null;
      return;
    }
    this._scene.play();
    this._sceneStateOnBlur = null;
  }
  /**
   * The window blur event.
   *
   *
   *
   * @returns void
   */
  private static onLostFocus(event: Event): void {
    if (!this._scene) return;
    if (!this._scene.running) {
      this._sceneStateOnBlur = "paused";
      return;
    }
  }
  /**
   * The window resize event.
   *
   *
   *
   * @returns void
   */
  private static onResize(event: Event): void {
    try {
      debug(window, "resized.");

      const w = window.innerWidth;
      const h = window.innerHeight;

      this.resize(w, h);
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
    const context = Options.Stage.buffer ? this._bufferContext : this._context;
    //  Check the context
    if (!context) return;
    //  Render the scene to the context
    this._scene.render(context);
    if (!Options.Stage.buffer) return;
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
    try {
      debug(this.prototype, "resizing...");

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

      debug(this.prototype, "resized.");
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Saves the configuration.
   *
   *
   *
   * @returns void
   */
  private static save(): void {}
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
  }
  /**
   * Sets the current scene.
   *
   *
   *
   * @param name The current scene name.
   * @returns void
   */
  private static setScene(name: string): void {
    const ctor: SceneConstructor = Object.assign(Scenes)[name];
    const scene: SceneBase = new ctor();

    if (!scene.initialized) {
      scene.initialize();
    }

    this.scene = scene;
  }
  /**
   * Sets up the event handlers.
   *
   *
   *
   * @returns void
   */
  private static setupEventHandlers(): void {
    try {
      debug(this.prototype, "event handlers:", "initializing...");

      window.addEventListener("blur", this.onLostFocus.bind(this));
      window.addEventListener("focus", this.onFocus.bind(this));
      window.addEventListener("resize", this.onResize.bind(this));

      debug(this.prototype, "event handlers:", "initialized.");
    } catch (error) {
      console.error(error);
    }
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
  /**
   * Toggles the graphics buffer state.
   *
   *
   *
   * @param buffered Tells whether the graphics should be buffered or not.
   * @returns void
   */
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
   * Toggles the GUI visibility.
   *
   *
   *
   * @returns void
   */
  private static toggleGui(): void {
    this._controlPanelVisible = !this._controlPanelVisible;
    if (!this._controlPanel) return;
    if (this._controlPanelVisible) {
      this._controlPanel.hide();
    } else {
      this._controlPanel.show();
    }
  }
  /**
   * Toggles the scene.
   *
   *
   *
   * @returns void
   */
  private static toggleScene(): void {
    if (!this._scene) return;
    if (this._scene.running) {
      this._scene.pause();
    } else {
      this._scene.play();
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
    try {
      let deltaTime = (time - this._time) / 1000;
      this._time = time;
      this._timeAcc += deltaTime;
      while (this._timeAcc >= this._fixedStep) {
        this._timeAcc -= this._fixedStep;
        if (this._scene && this._scene.running) {
          this._scene.update(this._fixedStep);
        }
      }
      this.render();
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Updates the inputs.
   *
   *
   *
   * @param time The value of time that has passed (in ms).
   * @returns void
   */
  private static updateInput(time: number): void {
    try {
      Keyboard.update();
      Mouse.update();
      if (Keyboard.trigger("control")) {
        this.toggleScene();
      }
      if (Keyboard.trigger("fps")) {
        Options.Frame.visible = !Options.Frame.visible;
        this.toggleFpsmeter(Options.Frame.visible);
      }
      if (Keyboard.trigger("gui")) {
        this.toggleGui();
      }
    } catch (error) {
      console.error(error);
    }
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
  /**
   * A class that handles stage options.
   *
   * @abstract
   * @class
   */
  export abstract class Stage {
    /**
     * Gets or sets whether the graphics would use canvas buffering.
     *
     * @returns boolean
     * @default false
     */
    public static buffer: boolean = false;
    /**
     * Gets or sets the current scene rendering on the canvas.
     *
     * @returns string
     * @default null
     */
    public static scene: string | null = null;
  }
}
