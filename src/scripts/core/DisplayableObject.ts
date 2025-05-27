/**
 * An abstract class object for all kinds of displayable object.
 *
 *
 *
 * @abstract
 * @class
 */
export abstract class DisplayableObject {
  /**
   * Draws the sprite to the graphics context.
   *
   *
   *
   * @param context The graphics context.
   * @returns void
   */
  public abstract draw(context: CanvasRenderingContext2D): void;
}
