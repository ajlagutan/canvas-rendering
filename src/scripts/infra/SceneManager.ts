import { Graphics } from "./../core/Graphics";
import { SceneBase, SceneConstructor } from "./SceneBase";
/**
 * Fixed step.
 *
 *
 *
 * @constant
 */
const FIXED_STEP: number = 1 / 60;
/**
 * A static class that manages the scenes.
 *
 *
 *
 * @static
 * @class
 */
export class SceneManager {
  private static _cache: Map<SceneConstructor, SceneBase> = new Map();
  private static _nextScene: SceneBase | null;
  private static _scene: SceneBase | null;
  private static _sceneStarted: boolean;
  private static _suspended: boolean;
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
   * Commands the scene manager to change to the scene.
   *
   *
   *
   * @param scene The scene constructor to create.
   * @returns void
   */
  public static goto(scene?: SceneConstructor): void {
    if (scene) {
      this._nextScene = this._cache.get(scene) ?? new scene();
      if (!this._cache.has(scene)) {
        this._cache.set(scene, this._nextScene);
      }
    }
    if (this._scene) {
      this._scene.stop();
    }
  }
  /**
   * Runs the scene manager with the initial scene provided.
   *
   *
   *
   * @param scene The initial scene constructor to create.
   * @returns void
   */
  public static run(scene?: SceneConstructor): void {
    try {
      this.initialize();
      this.goto(scene);
      this.requestUpdate();
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Changes the scene.
   *
   *
   *
   * @returns void
   */
  private static changeScene(): void {
    if (this.isSceneChanging() && !this.isCurrentSceneBusy()) {
      if (this._scene) {
        this._scene.stop();
      }
      this._scene = this._nextScene;
      if (this._scene) {
        if (!this._scene.isready()) {
          this._scene.load();
          Graphics.startLoading();
        }
        this._sceneStarted = false;
        this._nextScene = null;
      }
    }
  }
  /**
   * Initializes the scene manager.
   *
   *
   *
   * @returns void
   */
  private static initialize(): void {
    this.initializeGraphics();
  }
  /**
   * Initializes the graphics components.
   *
   *
   *
   * @returns void
   */
  private static initializeGraphics(): void {
    Graphics.initialize();
  }
  /**
   * Checks if the current scene is busy.
   *
   *
   *
   * @returns boolean
   */
  private static isCurrentSceneBusy(): boolean {
    return !!this._scene && this._scene.isbusy();
  }
  /**
   * Checks if the current scene has started.
   *
   *
   *
   * @returns boolean
   */
  private static isCurrentSceneStarted(): boolean {
    return !!this._scene && this._sceneStarted;
  }
  /**
   * Checks if scene is changing.
   *
   *
   *
   * @returns boolean
   */
  private static isSceneChanging(): boolean {
    return !!this._nextScene;
  }
  /**
   * Renders the current scene.
   *
   *
   *
   * @returns void
   */
  private static renderScene(): void {
    if (this._scene) {
      if (this.isCurrentSceneStarted()) {
        Graphics.render(this._scene);
      } else {
        Graphics.updateLoading();
      }
    }
  }
  /**
   * Requests a frame update by calling {@link requestAnimationFrame} function.
   *
   *
   *
   * @returns void
   */
  private static requestUpdate(): void {
    if (!this._suspended) {
      requestAnimationFrame(this.update.bind(this));
    }
  }
  /**
   * Ends the tick timer of the FPSMeter.
   *
   *
   *
   * @returns void
   */
  private static tickEnd(): void {
    Graphics.tickEnd();
  }
  /**
   * Starts the tick timer of the FPSMeter.
   *
   *
   *
   * @returns void
   */
  private static tickStart(): void {
    Graphics.tickStart();
  }
  /**
   * Updates the scene manager.
   *
   *
   *
   * @returns void
   */
  private static update(): void {
    try {
      this.tickStart();

      //  Update scene states
      this.changeScene();
      this.updateScene();
      this.renderScene();

      //  Request update
      this.requestUpdate();

      this.tickEnd();
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Updates the current scene.
   *
   *
   *
   * @returns void
   */
  private static updateScene(): void {
    if (this._scene) {
      if (!this._sceneStarted && this._scene.isready()) {
        this._scene.start();
        this._sceneStarted = true;
        Graphics.endLoading();
      }
      if (this.isCurrentSceneStarted()) {
        this._scene.update(FIXED_STEP);
      }
    }
  }
}
