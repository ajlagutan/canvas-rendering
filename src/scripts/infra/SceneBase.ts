import * as lil from "lil-gui";
import { DisplayableObject } from "../core/DisplayableObject";
import { DataManager } from "./DataManager";
/**
 * An interface for constructing a scene.
 *
 *
 *
 * @interface
 */
export interface SceneConstructor {
  new (): SceneBase;
}
/**
 * An abstract class object for scenes.
 *
 *
 *
 * @abstract
 * @class
 */
export abstract class SceneBase extends DisplayableObject {
  private _ready: boolean = false;
  private _suspended: boolean = true;
  /**
   * Checks whether the scene is busy.
   *
   *
   *
   * @returns boolean
   */
  public isbusy(): boolean {
    return DataManager.isbusy();
  }
  /**
   * Checks whether the scene is ready.
   *
   *
   *
   * @returns boolean
   */
  public isready(): boolean {
    return this._ready;
  }
  /**
   * Checks whether the scene has been suspended.
   *
   *
   *
   * @returns boolean
   */
  public issuspended(): boolean {
    return this._suspended;
  }
  /**
   * Initializes the GUI that controls different properties of the scene.
   * 
   * 
   * 
   * @param folder The {@link lil.GUI} component assigned for the scene.
   * @returns void
   */
  public controllers(folder: lil.GUI): void {}
  /**
   * Loads the scene assets.
   *
   *
   *
   * @returns void
   */
  public load(): void {
    this.initialize();
  }
  /**
   * Saves the scene state.
   * 
   * 
   * 
   * @param folder The {@link lil.GUI} component assigned for the scene.
   * @returns void
   */
  public save(folder: lil.GUI): void {
    const name = this.constructor.name;
    const options = JSON.stringify(folder.save(true));
    localStorage.setItem(`./Scene/${name}`, options);
  }
  /**
   * Continues the scene updates.
   *
   *
   *
   * @returns void
   */
  public start(): void {
    this._suspended = false;
  }
  /**
   * Suspends the scene updates.
   *
   *
   *
   * @returns void
   */
  public stop(): void {
    this._suspended = true;
  }
  /**
   * Updates the scene.
   *
   *
   *
   * @param time The fixed-step time value.
   * @returns void
   */
  public update(time: number): void {}
  /**
   * Initializes the scene.
   *
   *
   *
   * @returns void
   */
  protected initialize(): void {
    this._ready = true;
  }
}
