/**
 *
 */
export type AssetsState = "ready" | "loading" | "done" | "fail";
/**
 *
 */
export interface AssetsCallback {
  (state: AssetsState): void;
}
/**
 *
 */
export class Assets {
  private _assets: Map<string, string | null> = new Map();
  private _assetsXhr: Map<string, XMLHttpRequest> = new Map();
  private _assetsCount: number = 0;
  private _callback: AssetsCallback = () => {};
  private _count: number = 0;
  private _paths: Array<string> = [];
  private _state: AssetsState;
  /**
   * Construct a new instance of Assets object.
   *
   *
   *
   *
   *
   * @param paths An array of string locations of the individual assets.
   */
  private constructor(...paths: string[]) {
    for (let path of paths) {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener("loadend", this.loadend.bind(this, path));
      xhr.open("GET", path);
      this._assetsXhr.set(path, xhr);
      this._paths.push(path);
    }
    this._assetsCount = paths.length;
    this._state = "ready";
  }
  /**
   * Gets the defined paths of the Assets object.
   * 
   * 
   * 
   * 
   * 
   * @returns string[]
   */
  public get paths(): string[] {
    return this._paths;
  }
  /**
   * Gets the defined state of the Assets object.
   *
   *
   *
   *
   *
   * @returns AssetsState
   */
  public get state(): AssetsState {
    return this._state;
  }
  /**
   * Creates a new instance of Assets object.
   *
   *
   *
   *
   *
   * @param paths An array of string locations of the individual assets.
   * @returns Assets
   */
  public static create(...paths: string[]): Assets {
    return new Assets(...paths);
  }
  /**
   * Retrieves the string equivalent of the asset.
   * 
   * 
   * 
   * 
   * 
   * @param path The path of the asset.
   * @returns string | null
   */
  public get(path: string): string | null {
    if (this._assets.has(path)) {
      return this._assets.get(path) || null;
    }
    return null;
  }
  /**
   * Tells the browser to load each asset that is defined on the constructor.
   *
   *
   *
   *
   *
   * @param callback The callback function.
   * @returns void
   */
  public load(callback?: AssetsCallback): void {
    for (let [, xhr] of this._assetsXhr) {
      try {
        xhr.send();
      } catch (error) {
        console.error(error);
      }
    }
    this._callback = callback || this._callback;
    this._state = "loading";
  }
  /**
   * The XMLHttpRequest loadend event.
   *
   *
   *
   *
   *
   * @param path The location of the individual asset.
   * @param event The progress event.
   */
  private loadend(path: string, event: ProgressEvent): void {
    const xhr = event.currentTarget as XMLHttpRequest;
    if (xhr.status === 200) {
      this._assets.set(path, xhr.responseText);
      this._count++;
    }
    if (this._count === this._assetsCount) {
      this._state = "done";
      this._callback.call(this, this._state);
    }
  }
}
