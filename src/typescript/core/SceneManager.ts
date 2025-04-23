import "fpsmeter";
import * as dat from "dat.gui";
import * as Scenes from "../scenes";
import { SceneConstructor } from "./Interfaces";
import { SceneBase } from "./SceneBase";
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
  private static _canvas: HTMLCanvasElement | null = null;
  private static _context: CanvasRenderingContext2D | null = null;
  private static _debugCanvas: HTMLCanvasElement | null = null;
  private static _debugContext: CanvasRenderingContext2D | null = null;
  private static _debugInfo: any = {};
  private static _debugMetrics: TextMetrics | null = null;
  private static _debugVisible: boolean = false;
  private static _fpsmeter: FPSMeter | null = null;
  private static _fpsmeterVisible: boolean = false;
  private static _frames: number = 165;
  private static _frameStep: number = 1 / this._frames;
  private static _controller: dat.GUI | null = null;
  private static _running: boolean = false;
  private static _scene: SceneBase | null = null;
  private static _sceneController: dat.GUI | null = null;
  private static _sceneCtor: string | null = null;
  private static _timeAcc: number = 0;
  private static _timeMs: number = 0;
  /**
   * Gets or sets the visibility of the fpsmeter component.
   *
   *
   *
   *
   *
   * @returns boolean
   */
  public static get fpsmeterVisible(): boolean {
    return this._fpsmeterVisible;
  }
  /**
   * @param value The visibility to set the fpsmeter component.
   */
  public static set fpsmeterVisible(value: boolean) {
    this._fpsmeterVisible = value;
    if (this._fpsmeterVisible) {
      this._fpsmeter?.show();
    } else {
      this._fpsmeter?.hide();
    }
  }
  /**
   * Gets or sets the frames per second.
   *
   *
   *
   *
   *
   * @returns number
   */
  public static get frames(): number {
    return this._frames;
  }
  /**
   * @param value The value to assign as a frames per second.
   */
  public static set frames(value: number) {
    this._frames = value;
    this._frameStep = 1 / this._frames;
  }
  /**
   * Gets the running state of the scene manager.
   *
   *
   *
   *
   *
   * @returns boolean
   */
  public static get running(): boolean {
    return this._running;
  }
  /**
   * Gets or sets the current scene.
   *
   *
   *
   *
   *
   * @returns SceneBase
   */
  public static get scene(): SceneBase | null {
    return this._scene;
  }
  /**
   * @param value The value to assign as an active scene.
   */
  public static set scene(value: SceneBase | null) {
    this._scene = value;
    if (this._scene) {
      this._scene.resize(
        this._canvas?.width || window.innerWidth,
        this._canvas?.height || window.innerHeight
      );
      this._scene.initialize();
    }
    this.updateController();
  }
  /**
   * Gets or sets the scene constructor.
   *
   *
   *
   *
   *
   * @returns string | null
   */
  public static get sceneCtor(): string | null {
    return this._sceneCtor;
  }
  /**
   * @param value The name of the scene constructor.
   */
  public static set sceneCtor(value: string | null) {
    this._sceneCtor = value;
    if (this._sceneCtor && this._sceneCtor !== "") {
      const c: SceneConstructor = Object.assign(Scenes)[this._sceneCtor];
      const s: SceneBase = new c();
      this.scene = s;
    } else {
      this.scene = null;
    }
  }
  /**
   * Initializes the manager class.
   *
   *
   *
   *
   *
   * @returns void
   */
  public static initialize(): void {
    this.initializeGraphics();
    this.hookWindowEvents();
    this.initializeFpsmeter();
    this.initializeDebug();
    this.initializeGui();
  }
  /**
   * Starts the scene update and canvas rendering.
   *
   *
   *
   *
   *
   * @returns void
   */
  public static start(): void {
    if (!this._running) {
      this._running = true;
      requestAnimationFrame(this.loop.bind(this));
    }
  }
  /**
   * Initializes the scene attributes component.
   *
   *
   *
   *
   *
   * @returns void
   */
  private static initializeDebug(): void {
    this._debugCanvas = document.querySelector("canvas#debug");
    if (!this._debugCanvas) {
      this._debugCanvas = document.createElement("canvas");
      this._debugCanvas.id = "debug";
      this._debugCanvas.style.display = this._debugVisible ? "inline" : "none";
    }
    document.body.appendChild(this._debugCanvas);
    this._debugContext = this._debugCanvas.getContext("2d");
  }
  /**
   * Initializes the fpsmeter component.
   *
   *
   *
   *
   *
   * @returns void
   */
  private static initializeFpsmeter(): void {
    this._fpsmeter = new FPSMeter(document.body, {
      graph: 1,
      decimals: 0,
      theme: "transparent",
      toggleOn: undefined,
    });
    this._fpsmeter.hide();
  }
  /**
   * Initializes the canvas to render graphics.
   *
   *
   *
   *
   *
   * @returns void
   */
  private static initializeGraphics(): void {
    this._canvas = document.querySelector<HTMLCanvasElement>("canvas");
    if (!this._canvas) {
      this._canvas = document.createElement("canvas");
      this._canvas.style.backgroundColor = "black";
      this._canvas.style.zIndex = "-1";
      this._canvas.style.position = "fixed";
      this._canvas.style.left = "0";
      this._canvas.style.top = "0";
    }
    document.body.insertBefore(this._canvas, document.body.firstChild);
    this._context = this._canvas.getContext("2d");
  }
  /**
   * Initializes the dat.Gui component.
   *
   *
   *
   *
   *
   * @returns void
   */
  private static initializeGui(): void {
    const scenes = Object.keys(Scenes);

    this._controller = new dat.GUI({ hideable: false, width: 300 });

    const canvasController = this._controller.addFolder("canvas");
    const sceneCtorController = canvasController
      .add(this, "sceneCtor", [])
      .options(scenes)
      .name("scene");
    canvasController.open();

    const canvasSettingsController =
      this._controller.addFolder("canvas settings");
    canvasSettingsController.add(this, "frames", 30, 165, 5).name("frames/sec");
    canvasSettingsController
      .add(this, "fpsmeterVisible", false)
      .name("show fpsmeter");
    canvasSettingsController.open();

    sceneCtorController.setValue(scenes[0]);
  }
  /**
   * Hooks browser window events to the scene manager.
   *
   *
   *
   *
   *
   * @returns void
   */
  private static hookWindowEvents(): void {
    window.addEventListener("resize", this.windowResizeEvent.bind(this));
    window.dispatchEvent(
      new UIEvent("resize", { cancelable: false, bubbles: true })
    );
  }
  private static state: number = 0;
  /**
   * The main loop.
   *
   *
   *
   *
   *
   * @param timeMs The time elapsed in milliseconds.
   * @returns void
   */
  private static loop(timeMs: number): void {
    this.tickStart();
    try {
      let deltaTime = (timeMs - this._timeMs) / 1000;
      this._timeMs = timeMs;
      this._timeAcc += deltaTime;
      while (this._timeAcc >= this._frameStep) {
        this._timeAcc -= this._frameStep;
        this.update(this._frameStep);
      }
      this.render();
    } catch (error) {
      console.error(error);
    }
    this.tickEnd();
    requestAnimationFrame(this.loop.bind(this));
  }
  /**
   * Renders a scene to the canvas.
   *
   *
   *
   *
   *
   * @returns void
   */
  private static render(): void {
    if (this._debugVisible) {
      this.renderDebug();
    }
    if (this._scene && this._context) {
      this._scene.render(this._context);
    }
  }
  /**
   * Renders the debug information.
   *
   *
   *
   *
   *
   * @returns void
   */
  private static renderDebug(): void {
    for (let key in this._debugInfo) {
      if (!this._debugContext) {
        break;
      }
    }
  }
  /**
   * End tick the fpsmeter component.
   *
   *
   *
   *
   *
   * @return void
   */
  private static tickEnd(): void {
    if (this._fpsmeter && this._fpsmeterVisible) {
      this._fpsmeter.tick();
    }
  }
  /**
   * Start tick the fpsmeter component.
   *
   *
   *
   *
   *
   * @return void
   */
  private static tickStart(): void {
    if (this._fpsmeter && this._fpsmeterVisible) {
      this._fpsmeter.tickStart();
    }
  }
  /**
   * Updates the active scene and components.
   *
   *
   *
   *
   *
   * @param time The value of time that has passed (in ms).
   * @returns void
   */
  private static update(time: number): void {
    this.updateDebug(time);
    this.updateScene(time);
  }
  /**
   * Updates the scene controller.
   *
   *
   *
   *
   *
   * @returns void
   */
  private static updateController(): void {
    if (!this._controller) {
      return;
    }
    if (this._sceneController) {
      this._controller.removeFolder(this._sceneController);
    }
    if (!this._scene) {
      return;
    }
    this._sceneController = this._controller.addFolder("scene options");
    this._scene.controller(this._sceneController);
    this._sceneController.open();
  }
  /**
   * Updates the debug information.
   *
   *
   *
   *
   *
   * @param time The value of time that has passed (in ms).
   */
  private static updateDebug(time: number): void {
    if (this._debugVisible && this._debugContext) {
      this._debugMetrics = this._debugContext.measureText("AaBbCcXxYyZz");
      this._debugInfo = {
        fps: this._frames,
      };
    } else {
      this._debugInfo = {};
    }
  }
  /**
   * Updates the active scene.
   *
   *
   *
   *
   *
   * @param time The value of time that has passed (in ms).
   * @returns void
   */
  private static updateScene(time: number): void {
    if (this._scene && this._scene.running) {
      this._scene.update(time);
    }
  }
  /**
   * Window resize event.
   *
   *
   *
   *
   *
   * @param e The window event.
   * @returns void
   */
  private static windowResizeEvent(e: UIEvent): void {
    if (this._canvas) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (this._scene) {
        this._scene.resize(width, height);
      }
      this._canvas.style.imageRendering = "pixelated";
      // this._canvas.style.height = `${height}px`;
      // this._canvas.style.width = `${width}px`;
      this._canvas.height = height;
      this._canvas.width = width;
    }
  }
}
