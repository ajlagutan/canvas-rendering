import * as lil from "lil-gui";
import * as scenes from "../app";
import { Graphics } from "./../core/Graphics";
import { SceneBase, SceneConstructor } from "./SceneBase";
import { logger } from "../core/_utils";
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
  private static _gui: lil.GUI;
  private static _nextScene: SceneBase | null;
  private static _scene: SceneBase | null;
  private static _sceneGui: lil.GUI | null;
  private static _sceneStarted: boolean;
  private static _stageGui: lil.GUI | null;
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
   * Gets or sets the current scene.
   *
   *
   *
   * @property
   * @returns string | null
   */
  public static get scene(): string | null {
    if (this._scene) {
      return this._scene.constructor.name;
    }
    return null;
  }
  public static set scene(value: typeof SceneBase | string | null) {
    if (value instanceof SceneBase) {
      value = value.constructor.name;
    }
    if (typeof value === "string") {
      this.goto(scenes[value]);
      return;
    }
    this.goto(undefined);
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
        this.destroySceneGui();
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
   * Creates a GUI component for the current scene.
   *
   *
   *
   * @returns void
   */
  private static createSceneGui(): void {
    if (this._scene) {
      this._sceneGui = this._gui.addFolder("scene");
      this._sceneGui.hide();

      this._scene.controllers(this._sceneGui);

      const name = this._scene.constructor.name;
      const options = localStorage.getItem(`./Scene/${name}`);
      if (options) {
        this._sceneGui.load(JSON.parse(options), true);
      }

      if (this._sceneGui.children.length > 0) {
        this._sceneGui.show();
      }
    }
  }
  /**
   * Destroys the GUI component.
   *
   *
   *
   * @returns void
   */
  private static destroySceneGui(): void {
    if (this._sceneGui) {
      this.saveScene();
      this._sceneGui.destroy();
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
    try {
      logger.debug.call(this, "initializing...");

      this.initializeGraphics();
      this.initializeGui();
      this.setupEventListeners();

      logger.debug.call(this, "initialized.");
    } catch (error) {
      console.error(error);
    }
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
   * Initializes the GUI component.
   *
   *
   *
   * @returns void
   */
  private static initializeGui(): void {
    try {
      logger.debug.call(this, "gui:", "initializing...");

      this._gui = new lil.GUI({ title: "controls" });
      this._gui.add(Graphics, "fpsMeterVisible").name("show fps");

      this._stageGui = this._gui.addFolder("stage");
      this._stageGui.add(Graphics, "buffered").name("use buffer");
      this._stageGui
        .add(this, "scene", Object.keys(scenes))
        .name("scene")
        .listen();

      const name = SceneManager.name;
      const options = localStorage.getItem(`./${name}`);
      if (options) {
        this._stageGui.load(JSON.parse(options), true);
      }

      logger.debug.call(this, "gui:", "initialized.");
    } catch (error) {
      console.error(error);
    }
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
   * Fires up before the browser unloads the page.
   *
   *
   *
   * @returns void
   */
  private static onbeforeunload(): void {
    this.save();
    this.saveScene();
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
   * Saves the stage GUI component configurations.
   *
   *
   *
   * @returns void
   */
  private static save(): void {
    if (this._stageGui) {
      const name = SceneManager.name;
      const options = JSON.stringify(this._stageGui.save(false));
      localStorage.setItem(`./${name}`, options);
    }
  }
  /**
   * Saves the scene GUI component configurations.
   *
   *
   *
   * @returns void
   */
  private static saveScene(): void {
    if (this._scene && this._sceneGui) {
      this._scene.save(this._sceneGui);
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

      window.addEventListener("beforeunload", this.onbeforeunload.bind(this));

      logger.debug.call(this, "events:", "handled.");
    } catch (error) {
      console.error(error);
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
        this.createSceneGui();
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
