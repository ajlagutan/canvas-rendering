/**
 * Stores the location and size of a rectangular region.
 */
export class Rectangle {
  private static _empty: Rectangle = new Rectangle(0, 0, 0, 0);
  /** Gets or sets the width of the rectangular region defined by this rectangle. */
  public height: number;
  /** Gets or sets the width of the rectangular region defined by this rectangle. */
  public width: number;
  /** Gets or sets the x-coordinate of the upper-left corner of the rectangular region defined by this rectangle. */
  public x: number;
  /** Gets or sets the y-coordinate of the upper-left corner of the rectangular region defined by this rectangle. */
  public y: number;
  /**
   * Creates a new instance of Rectangle class.
   * @param x The value to assign to the X component of the rectangle.
   * @param y The value to assign to the Y component of the rectangle.
   * @param width The value to assign to the Width component of the rectangle.
   * @param height The value to assign to the Height component of the rectangle.
   */
  constructor(
    x: number = 0,
    y: number = 0,
    width: number = 0,
    height: number = 0
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  public static get empty(): Rectangle {
    return this._empty;
  }
  /**
   * Gets the y-coordinate of the lower-right corner of the rectangular region defined by this rectangle.
   */
  public get bottom(): number {
    return this.y + this.height;
  }
  /**
   * Gets the x-coordinate of the upper-left corner of the rectangular region defined by this rectangle.
   */
  public get left(): number {
    return this.x;
  }
  /**
   * Gets the x-coordinate of the lower-right corner of the rectangular region defined by this rectangle.
   */
  public get right(): number {
    return this.x + this.width;
  }
  /**
   * Gets the y-coordinate of the upper-left corner of the rectangular region defined by this rectangle.
   */
  public get top(): number {
    return this.y;
  }
  /**
   * Clone the rectangle x, y, width, and height components to a new instance.
   * @returns Rectangle
   */
  public clone(): Rectangle {
    return new Rectangle(this.x, this.y, this.width, this.height);
  }
  /**
   * Determines if the specified point is contained within the rectangular region defined by this rectangle.
   * @param x The X coordinate of the point.
   * @param y The Y coordinate of the point.
   * @returns true if the specified point is contained within the rectangular region defined by this rectangle; otherwise, false.
   */
  public contains(x: number, y: number): boolean {
    return (this.x <= x && x <= this.x + this.width)
        && (this.y <= y && y <= this.y + this.height);
  }
  /**
   * Inflates this {@link Rectangle} by the specified amount.
   * @param x The value of the inflation along the horizontal axis.
   * @param y The value of the inflation along the vertical axis.
   */
  public inflate(x: number, y: number): void {
    this.x -= x;
    this.y -= y;
    this.width += x * 2;
    this.height += y * 2;
  }
}
