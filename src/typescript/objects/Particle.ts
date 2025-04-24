import { Vector2 } from "../core";
import { Color } from "./Color";
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
  public mass: number;
  public radius: number;
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
   */
  constructor(x: number, y: number, radius: number, color: Color) {
    super(x, y, radius);
    this.color = color;
  }
}
