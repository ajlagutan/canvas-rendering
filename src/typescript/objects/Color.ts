import { Vector4 } from "../core";
import { clamp } from "../utils";
/**
 * The different mode of color structure.
 *
 *
 *
 *
 *
 * @enum
 */
type ColorMode = "rgb" | "hsv" | "hsl";
/**
 * Represents color object that holds four single-precision floating point components.
 *
 * The X, Y, and Z components would vary depending on the mode used.
 *
 * The W component would always be the alpha value of the color.
 *
 * @class
 */
export class Color extends Vector4 {
  private static _black: Color = Color.fromRgba(0, 0, 0, 1);
  private static _transparent: Color = Color.fromRgba(0, 0, 0, 0);
  private static _white: Color = Color.fromRgba(255, 255, 255, 1);
  private _mode: ColorMode = "rgb";
  /**
   * Creates a new instance of Color object.
   *
   * The Alpha component is optional. If not specified, it defaults to 1.
   *
   *
   *
   * @param mode The mode used in creating the color structure.
   * @param x The X component of the color. Values can be Red, or Hue.
   * @param y The Y component of the color. Values can be Green, or Saturation.
   * @param z The Z component of the color. Values can be Blue, Value, or Lightness.
   * @param w The Alpha component of the color.
   */
  private constructor(
    mode: ColorMode,
    x: number,
    y: number,
    z: number,
    w: number = 1
  ) {
    super(x, y, z, w);
    this._mode = mode;
  }
  /**
   * A black color in RGB space.
   * 
   * 
   * 
   * 
   * 
   * @returns Color
   */
  public static get black(): Color {
    return this._black;
  }
  /**
   * A transparent color.
   *
   *
   *
   *
   *
   * @returns Color
   */
  public static get transparent(): Color {
    return this._transparent;
  }
  /**
   * A white color in RGB space.
   * 
   * 
   * 
   * 
   * 
   * @returns Color
   */
  public static get white(): Color {
    return this._white;
  }
  /**
   * Creates a Color object that represents an HSL/A structure.
   *
   * The Alpha component is optional. If not specified, it defaults to 1.
   *
   *
   *
   * @param h The Hue component of the HSL structure.
   * @param s The Saturation/Chroma component of the HSL structure.
   * @param l The Lightness component of the HSL structure.
   * @param a Optional. The Alpha component of the HSLA structure. (Default = 1)
   * @returns Color (HSL mode)
   */
  public static fromHsla(
    h: number,
    s: number,
    l: number,
    a: number = 1
  ): Color {
    h = clamp(h, 0, 360) / 360;
    s = clamp(s, 0, 100) / 100;
    l = clamp(l, 0, 100) / 100;
    a = clamp(a, 0, 1) / 1;
    return new Color("hsl", h, s, l, a);
  }
  /**
   * Creates a Color object that represents an HSV/A structure.
   *
   * The Alpha component is optional. If not specified, it defaults to 1.
   *
   *
   *
   * @param h The Hue component of the HSV structure.
   * @param s The Saturation/Chroma component of the HSV structure.
   * @param v The Value/Brightness comonent of the HSV structure.
   * @param a Optional. The Alpha component of the HSVA structure. (Default = 1)
   * @returns Color (HSV mode)
   */
  public static fromHsva(
    h: number,
    s: number,
    v: number,
    a: number = 1
  ): Color {
    h = clamp(h, 0, 360) / 360;
    s = clamp(s, 0, 100) / 100;
    v = clamp(v, 0, 100) / 100;
    a = clamp(a, 0, 1) / 1;
    return new Color("hsv", h, s, v, a);
  }
  /**
   * Creates a Color object that represents an RGB/A structure.
   *
   * The Alpha component is optional. If not specified, it defaults to 1.
   *
   *
   *
   * @param r The Red component of the RGB structure.
   * @param g The Green component of the RGB structure.
   * @param b The Blue component of the RGB structure.
   * @param a Optional. The Alpha component of the RGBA structure. (Default = 1)
   * @returns Color (RGB mode)
   */
  public static fromRgba(
    r: number,
    g: number,
    b: number,
    a: number = 1
  ): Color {
    r = clamp(r, 0, 255) / 255;
    g = clamp(g, 0, 255) / 255;
    b = clamp(b, 0, 255) / 255;
    a = clamp(a, 0, 1) / 1;
    return new Color("rgb", r, g, b, a);
  }
  /**
   * Compares two color objects.
   *
   * The Alpha component is not compared.
   *
   *
   *
   * @param color1 The first color to compare.
   * @param color2 The second color to compare.
   */
  public static is(color1: Color, color2: Color): boolean {
    if (color1._mode !== color2._mode) return false;
    return (
      color1.x === color2.x && color1.y === color2.y && color1.z === color2.z
    );
  }
  /**
   * Clones the color values to a new Color instance.
   *
   * By default, it does not include the alpha component.
   *
   *
   *
   * @param includeAlpha If true, the alpha component is also cloned. (Default = false)
   * @returns Color
   */
  public clone(includeAlpha: boolean = false): Color {
    return new Color(
      this._mode,
      this.x,
      this.y,
      this.z,
      includeAlpha ? this.w : 1
    );
  }
  /**
   * Compares the color object to another color object.
   *
   * The Alpha component is not compared.
   *
   *
   *
   * @param other The other color to compare with.
   * @returns boolean
   */
  public is(other: Color): boolean {
    return Color.is(this, other);
  }
  /**
   * Converts the Color object to HSL/A structure.
   *
   *
   *
   *
   *
   * @returns Color (HSL mode)
   */
  public toHsla(): Color {
    let r = this.x;
    let g = this.y;
    let b = this.z;

    let h = 0;
    let s = 0;
    let l = 0;

    let cmax = Math.max(this.x, this.y, this.z);
    let cmin = Math.min(this.x, this.y, this.z);
    let d = cmax - cmin;

    // Light calculation
    l = (cmax + cmin) / 2;

    // Saturation calculation
    if (d === 0) s = 0;
    if (d !== 0) s = d / (1 - Math.abs(2 * l - 1));

    // Hue calculation
    if (d === 0) h = 0;
    else if (cmax === r) h = 60 * (((g - b) / d) % 6);
    else if (cmax === g) h = 60 * ((b - r) / d + 2);
    else if (cmax === b) h = 60 * ((r - g) / d + 4);

    h = clamp(h, 0, 360);
    s = clamp(s, 0, 1) * 100;
    l = clamp(l, 0, 1) * 100;

    return Color.fromHsla(h, s, l, this.w);
  }
  public toString(): string {
    let o = { x: 0, y: 0, z: 0, w: 0 };
    let s = "transparent";
    if (this._mode === "rgb") {
      o.x = clamp(this.x * 255, 0, 255);
      o.y = clamp(this.y * 255, 0, 255);
      o.z = clamp(this.z * 255, 0, 255);
      o.w = clamp(this.w * 1, 0, 1);
      s = o.w === 1 ? "rgb(/x/,/y/,/z/)" : "rgba(/x/,/y/,/z/,/w/)";
    }
    if (this._mode === "hsl") {
      o.x = clamp(this.x * 360, 0, 360);
      o.y = clamp(this.y * 100, 0, 100);
      o.z = clamp(this.z * 100, 0, 100);
      o.w = clamp(this.w * 1, 0, 1);
      s = o.w === 1 ? "hsl(/x/,/y/%,/z/%)" : "hsla(/x/,/y/%,/z/%,/w/)";
    }
    if (this._mode === "hsv") {
      o.x = clamp(this.x * 360, 0, 360);
      o.y = clamp(this.y * 100, 0, 100);
      o.z = clamp(this.z * 100, 0, 100);
      o.w = clamp(this.w * 1, 0, 1);
      s = o.w === 1 ? "hsv(/x/,/y/%,/z/%)" : "hsva(/x/,/y/%,/z/%,/w/)";
    }
    s = s
      .replace("/x/", o.x.toFixed(1))
      .replace("/y/", o.y.toFixed(1))
      .replace("/z/", o.z.toFixed(1))
      .replace("/w/", o.w.toFixed(1));
    return s;
  }
}
