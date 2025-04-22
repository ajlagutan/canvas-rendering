/**
 * Represents a vector with two single-precision floating-point values.
 */
export class Vector2 {
  /** The X component of the vector. */
  public x: number;
  /** The Y component of the vector. */
  public y: number;
  /**
   * Creates a new instance of Vector2 class.
   * @param x The value to assign to the X component of the vector.
   * @param y The value to assign to the Y component of the vector.
   */
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }
}
/**
 * Represents a vector with three single-precision floating-point values.
 */
export class Vector3 {
  /** The X component of the vector. */
  public x: number;
  /** The Y component of the vector. */
  public y: number;
  /** The Z component of the vector. */
  public z: number;
  /**
   * Creates a new instance of Vector3 class.
   * @param x The value to assign to the X component of the vector.
   * @param y The value to assign to the Y component of the vector.
   * @param z The value to assign to the Z component of the vector.
   */
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
/**
 * Represents a vector with four single-precision floating-point values.
 */
export class Vector4 {
  /** The W component of the vector. */
  public w: number;
  /** The X component of the vector. */
  public x: number;
  /** The Y component of the vector. */
  public y: number;
  /** The Z component of the vector. */
  public z: number;
  constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
}