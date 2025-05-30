import urlJoin from "url-join";
/**
 * A static class that manages the data.
 *
 *
 *
 * @static
 * @class
 */
export class DataManager {
  private static _queue: Array<string> = [];
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
   * Gets the data associated with the specified key or path.
   *
   *
   *
   * @param path The data key.
   * @returns any
   */
  public static get<T extends any>(path: string): T | null {
    const data = sessionStorage.getItem(path);
    if (typeof data === "string" && data !== "") {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error(error);
      }
    }
    return null;
  }
  /**
   * Checks whether the {@link DataManager} is currently busy.
   *
   *
   *
   * @returns boolean
   */
  public static isbusy(): boolean {
    return this._queue.length > 0;
  }
  /**
   * Loads an array of file path from the disk to {@link sessionStorage} module.
   *
   *
   *
   * @param paths An array of file path to load.
   * @returns Promise
   */
  public static load(...paths: string[]): Promise<any> {
    const promises: Array<Promise<any>> = [];
    for (let path of paths) {
      promises.push(new Promise(this.loadfile.bind(this, path)));
      this._queue.push(path);
    }
    return Promise.all(promises);
  }
  /**
   * Unloads the file from the {@link sessionStorage} module.
   * 
   * 
   * 
   * @param path The file path to load.
   * @returns void
   */
  public static unload(path: string): void {
    sessionStorage.removeItem(path);
  }
  /**
   * Loads a file from the disk.
   *
   *
   *
   * @param path The file path to load.
   * @param resolve Callback function that resolves the promise.
   * @param reject Callback function that rejects the promise.
   * @returns void
   */
  private static loadfile(
    path: string,
    resolve: (value?: any) => void,
    reject: (reason?: any) => void
  ): void {
    let xhr = new XMLHttpRequest();
    let url = urlJoin(location.href, path);
    xhr.addEventListener("load", (event: ProgressEvent) => {
      if (event && event.target instanceof XMLHttpRequest) {
        let path = event.target.responseURL.replace(location.href, "");
        let index = this._queue.indexOf(path);
        if (index !== -1) {
          sessionStorage.setItem(path, event.target.responseText);
          this._queue.splice(index, 1);
        }
        resolve({ path });
      }
    });
    xhr.addEventListener("error", (event: ProgressEvent) => {
      let reason: any;
      if (event.target instanceof XMLHttpRequest) {
        reason = event.target.responseText;
      }
      reject({ reason });
    });
    xhr.open("GET", url);
    xhr.overrideMimeType("application/json");
    xhr.send();
  }
}
