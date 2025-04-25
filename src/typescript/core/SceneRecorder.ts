/**
 * Records the current scene rendering on the canvas.
 *
 *
 *
 *
 *
 * @abstract
 * @class
 */
export abstract class SceneRecorder {
  private static _data: Array<Blob> = [];
  private static _media: MediaRecorder | null = null;
  private static _mediaAudioBps: number = 1.28;
  private static _mediaType: string = "video/mp4";
  private static _mediaVideoBps: number = 2.5;
  /**
   * Gets the scene recording state.
   *
   *
   *
   *
   *
   * @returns boolean
   */
  public static get recording(): boolean {
    if (this._media) {
      return (
        this._media.state === "recording" || this._media.state === "paused"
      );
    }
    return false;
  }
  /**
   * Pauses the scene recording.
   *
   *
   *
   *
   *
   * @returns void
   */
  public static pause(): void {
    if (this._media && this._media.state === "recording") {
      this._media.pause();
    }
  }
  /**
   * Records the scene that is currently rendering on the canvas.
   *
   *
   *
   *
   *
   * @param canvas The source canvas for the video.
   * @returns Promise<void>
   */
  public static record(canvas: HTMLCanvasElement): Promise<void> {
    if (this.recording) {
      return Promise.reject();
    }
    this._data = [];
    this._media = null;
    return new Promise(this.execute.bind(this, canvas));
  }
  /**
   * Resumes the scene recording.
   *
   *
   *
   *
   *
   * @returns void
   */
  public static resume(): void {
    if (this._media && this._media.state === "paused") {
      this._media.resume();
    }
  }
  /**
   * Stops the recording.
   *
   *
   *
   *
   *
   * @returns void
   */
  public static stop(): void {
    if (this._media && this._media.state === "recording") {
      this._media.stop();
    }
  }
  /**
   * Executes the recording of the scene.
   *
   *
   *
   *
   *
   * @param canvas The source canvas for the video.
   * @returns void
   */
  private static execute(canvas: HTMLCanvasElement): void {
    let stream = canvas.captureStream(60);
    this._media = new MediaRecorder(stream, {
      mimeType: this._mediaType,
      audioBitsPerSecond: this._mediaAudioBps * 100000,
      videoBitsPerSecond: this._mediaVideoBps * 1000000,
    });
    this._media.start();
    this._media.ondataavailable = this.progress.bind(this);
    this._media.onstop = this.end.bind(this);
  }
  /**
   * The scene recorder ends.
   *
   *
   *
   *
   *
   * @returns void
   */
  private static end(): void {
    try {
      let blob = new Blob(this._data, { type: this._mediaType });
      let blobUrl = URL.createObjectURL(blob);
      this.resolve(blobUrl);
    } catch (error) {
      this.reject(error);
    }
  }
  /**
   * The scene recorder progress.
   *
   *
   *
   *
   *
   * @param e The blob event.
   * @returns void
   */
  private static progress(e: BlobEvent): void {
    this._data.push(e.data);
  }
  /**
   * Rejects the scene record after an error.
   *
   *
   *
   *
   *
   * @param reason The rejection reason.
   * @returns void
   */
  private static reject(reason: any): void {
    console.error(reason);
  }
  /**
   * Resolves the scene recorder.
   *
   *
   *
   *
   *
   * @param value The resolved value.
   * @returns void
   */
  private static resolve(value: string): void {
    window.open(value);
  }
}
