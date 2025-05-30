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
  private _initializing: boolean = false;
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
    return DataManager.isbusy() || this._initializing;
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
   * Loads the scene assets.
   *
   *
   *
   * @returns void
   */
  public load(): void {
    this._initializing = true;
    this.initialize();
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
    this._initializing = false;
    this._ready = true;
  }
}
