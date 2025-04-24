import "fpsmeter";
import * as lil from "lil-gui";
import * as Scenes from "../scenes";
import { SceneConstructor } from "./Interfaces";
import { SceneBase } from "./SceneBase";
import { Mouse } from "./Inputs";
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
  private static _controller: lil.GUI | null = null;
  private static _running: boolean = false;
  private static _scene: SceneBase | null = null;
  private static _sceneController: lil.GUI | null = null;
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
    Mouse.initialize();
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

    this._controller = new lil.GUI({ title: "canvas" });
    this._controller.add(this, "sceneCtor", scenes).name("scene").setValue(scenes[0]);

    const settings = this._controller.addFolder("canvas settings");
    settings.add(this, "frames", 30, 165, 1).name("frames/sec");
    settings.add(this, "fpsmeterVisible").name("show fps").listen();
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
    document.addEventListener("keyup", this.windowKeyUpEvent.bind(this));

    window.addEventListener("blur", this.windowBlurEvent.bind(this));
    window.addEventListener("focus", this.windowFocusEvent.bind(this));
    window.addEventListener("resize", this.windowResizeEvent.bind(this));

    const resizeEvent = new UIEvent("resize", {
      cancelable: false,
      bubbles: true,
    });

    window.dispatchEvent(resizeEvent);
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
      if (this._running) {
        let deltaTime = (timeMs - this._timeMs) / 1000;
        this._timeMs = timeMs;
        this._timeAcc += deltaTime;
        while (this._timeAcc >= this._frameStep) {
          this._timeAcc -= this._frameStep;
          this.update(this._frameStep);
        }
        this.render();
      }
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
      this._sceneController.destroy();
    }
    if (!this._scene) {
      return;
    }
    this._sceneController = this._controller.addFolder("scene options");
    this._sceneController.open();
    this._scene.controller(this._sceneController);
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
   * Window blur event.
   *
   *
   *
   *
   *
   * @param e The event.
   */
  private static windowBlurEvent(e: Event): void {
    this._running = false;
  }
  /**
   * Window focus event.
   *
   *
   *
   *
   *
   * @param e The event.
   */
  private static windowFocusEvent(e: FocusEvent): void {
    this._running = true;
  }
  /**
   * Document keyup event.
   *
   *
   *
   *
   *
   * @param e The keyboard event.
   * @returns void
   */
  private static windowKeyUpEvent(e: KeyboardEvent): void {
    if (e.code === "Space" || e.code === "KeyP") {
      if (!this._scene) return;
      if (this._scene.running) {
        this._scene.pause();
      } else {
        this._scene.play();
      }
      e.preventDefault();
    } else if (e.code === "F9") {
      this.fpsmeterVisible = !this.fpsmeterVisible;
      e.preventDefault();
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
