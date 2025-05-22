import { Vector2 } from "../core";
import { mod } from "../utils";
import { Color } from "./Color";
/**
 * A callback function for rendering a particle.
 *
 *
 *
 *
 *
 * @callback
 * @returns void
 */
export interface ParticleRenderCallback<T extends Particle> {
  (context: CanvasRenderingContext2D, particle: T, index: number): void;
}
/**
 * A particle class.
 *
 *
 *
 *
 *
 * @class
 */
export class Particle extends Vector2 {
  private _rotation: number = 0;
  /**
   * Gets or sets the mass of the particle.
   *
   * @returns number
   */
  public mass: number;
  /**
   * Gets or sets the radius of the particle.
   *
   * @returns number
   */
  public radius: number;
  /**
   * Gets or sets the rotation velocity of the particle.
   */
  public rotationVelocity: number;
  /**
   * Gets or sets the velocity of the particle.
   *
   * @returns number
   */
  public velocity: Vector2;
  /**
   * Creates a new instance of Particle class.
   *
   *
   *
   *
   *
   * @param x The value to assign to the X component.
   * @param y The value to assign to the Y component.
   * @param radius The value to assign to the radius component.
   */
  constructor(x: number, y: number, radius: number) {
    super(x, y);
    this.mass = 0;
    this.radius = radius;
    this.velocity = new Vector2(0, 0);
    this.rotationVelocity = Math.atan2(this.velocity.y, this.velocity.x);
  }
  /**
   * Gets the rotation of the particle.
   *
   * @returns number
   */
  public get rotation(): number {
    return this._rotation;
  }
  /**
   * Resets the rotation of the particle.
   *
   * @returns void
   */
  public resetRotation(): void {
    this._rotation = 0;
  }
  /**
   * Rotates the particle.
   *
   * @returns void
   */
  public rotate(): void {
    this._rotation = mod(this._rotation + this.rotationVelocity, Math.PI * 2);
  }
}
/**
 * A particle class that contains color property.
 *
 *
 *
 *
 *
 * @class
 */
export class ColoredParticle extends Particle {
  public color: Color;
  /**
   * Creates a new instance of a ColoredParticle class.
   *
   *
   *
   *
   *
   * @param x The value to assign to the X component.
   * @param y The value to assign to the Y component.
   * @param radius The value to assign to the radius component.
   * @param color The color assigned to the particle.
   */
  constructor(x: number, y: number, radius: number, color: Color) {
    super(x, y, radius);
    this.color = color;
  }
}
export class PolygonalParticle extends Particle {
  private _color: Color = Color.black;
  private _sides: number;
  /**
   * Creates a new instance of a PolygonalParticle class.
   *
   *
   *
   *
   *
   * @param x The value to assign to the X component.
   * @param y The value to assign to the Y component.
   * @param radius The value to assign to the radius component.
   * @param sides The number of sides the polygonal particle has.
   * @param color The color assigned to the particle.
   */
  constructor(
    x: number,
    y: number,
    radius: number,
    sides: number,
    color: Color
  ) {
    super(x, y, radius);
    this._sides = sides;
    this._color = color;
  }
  /**
   * Gets or sets the color of the particle.
   *
   *
   *
   *
   *
   * @returns Color
   */
  public get color(): Color {
    return this._color;
  }
  /**
   * @param value The color value.
   */
  public set color(value: Color) {
    if (!this._color.is(value)) {
      this._color = value;
    }
  }
  /**
   * Gets the polygonal 2D path.
   *
   *
   *
   *
   *
   * @returns Path2D
   */
  public get path(): Path2D {
    let path = new Path2D();
    if (this._sides < 3) {
      path.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    } else {
      let step = (Math.PI * 2) / this._sides;
      for (let angle = 0; angle <= Math.PI * 2; angle += step) {
        let px = this.x + Math.cos(angle + this.rotation) * this.radius;
        let py = this.y + Math.sin(angle + this.rotation) * this.radius;
        if (angle === 0) {
          path.moveTo(px, py);
        } else {
          path.lineTo(px, py);
        }
      }
    }
    path.closePath();
    return path;
  }
  /**
   * Gets or sets the number of sides of the polygon.
   *
   *
   *
   *
   *
   * @returns number
   */
  public get sides(): number {
    return this._sides;
  }
  /**
   * @param value The number of sides of the polygon.
   */
  public set sides(value: number) {
    this._sides = value;
  }
}
