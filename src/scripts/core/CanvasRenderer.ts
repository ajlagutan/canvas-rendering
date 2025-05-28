import { DisplayableObject } from "./DisplayableObject";
/**
 * Properties for creating canvas renderer class object.
 *
 *
 *
 * @interface
 */
export interface CanvasRendererCtorProps {
  /**
   * Tells whether the canvas should be cleared before rendering the next frame.
   *
   * If not defined, the canvas will be not be cleared before rendering.
   *
   *
   *
   * @property
   * @default false
   */
  autoClear?: boolean;
  /**
   * Tells the color to be painted to the canvas if {@link autoClear} is set to true.
   *
   * If not defined, the auto-clear color will be set to color black.
   *
   *
   *
   * @property
   * @default "black"
   */
  autoClearColor?: string;
  /**
   * Tells whether the displayable objects will be buffered
   * before rendering to the display.
   *
   * If not defined, the buffered property will be set to the default value.
   *
   *
   *
   * @property
   * @default true
   */
  buffered?: boolean;
  /**
   * The canvas that will be used in rendering display objects.
   *
   * If not defined, the canvas will be created automatically.
   *
   *
   * @property
   */
  canvas?: HTMLCanvasElement;
}
/**
 * A class object that handles the rendering of displayable objects to the canvas.
 *
 *
 *
 * @class
 */
export class CanvasRenderer {
  private _autoClear: boolean;
  private _autoClearColor: string;
  private _buffered: boolean;
  private _dom: HTMLCanvasElement;
  /**
   * Creates a new instance of {@link CanvasRenderer} class object.
   *
   *
   *
   * @constructor
   * @param props The constructor properties for the renderer.
   */
  constructor(props?: CanvasRendererCtorProps) {
    let { autoClear, autoClearColor, buffered, canvas } = props || {};
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "main";
      canvas.style.imageRendering = "pixelated";
      canvas.style.backgroundColor = "black";
      canvas.style.position = "fixed";
      canvas.style.zIndex = "-1";
      canvas.style.left = "0";
      canvas.style.top = "0";
      document.body.append(canvas);
    }
    this._autoClear = !!!autoClear;
    this._autoClearColor = autoClearColor ?? "black";
    this._buffered = !!buffered;
    this._dom = canvas;
  }
  /**
   * Gets or sets whether the renderer clears the context before rendering the next frame.
   *
   *
   *
   * @property
   * @returns boolean
   */
  public get autoClear(): boolean {
    return this._autoClear;
  }
  public set autoClear(value: boolean) {
    if (this._autoClear !== value) {
      this._autoClear = value;
    }
  }
  /**
   * Gets or sets the color to render when the context gets cleared.
   *
   *
   *
   * @property
   * @returns string
   */
  public get autoClearColor(): string {
    return this._autoClearColor;
  }
  public set autoClearColor(value: string) {
    if (this._autoClearColor !== value) {
      this._autoClearColor = value;
    }
  }
  /**
   * Gets whether the rendering method uses buffering context.
   *
   *
   *
   * @readonly
   * @property
   * @returns boolean
   */
  public get buffered(): boolean {
    return this._buffered;
  }
  public set buffered(value: boolean) {
    if (this._buffered !== value) {
      this._buffered = value;
    }
  }
  /**
   * Gets the {@link HTMLCanvasElement} of this renderer.
   *
   *
   *
   * @readonly
   * @property
   * @returns HTMLCanvasElement
   */
  public get dom(): HTMLCanvasElement {
    return this._dom;
  }
  /**
   * Renders the display object to the canvas.
   *
   *
   *
   * @param o The displayable object to be rendered to the canvas.
   * @returns void
   */
  public render(o: DisplayableObject): void {
    let ctx = this._dom.getContext("2d");
    if (!ctx) return;
    if (this._autoClear) {
      ctx.save();
      ctx.fillStyle = this._autoClearColor;
      ctx.clearRect(0, 0, this.dom.width, this.dom.height);
      ctx.restore();
    }
    if (this._buffered) {
      //  Future implementation.
    } else {
      o.draw(ctx);
    }
  }
}
