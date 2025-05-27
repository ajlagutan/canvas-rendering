import { DisplayableObject } from "./DisplayableObject";
/**
 * A container class object for all kinds of displayable object.
 *
 *
 *
 * @abstract
 * @class
 */
export abstract class DisplayableObjectContainer extends DisplayableObject {
  private _children: Array<DisplayableObject> = [];
  /**
   * Adds the child object to the collection.
   *
   *
   *
   * @param o The child object to add to the collection.
   * @returns void
   */
  public add(o: DisplayableObject): void {
    if (this._children.indexOf(o) === -1) {
      this._children.push(o);
    }
  }
  /**
   * Clears the child objects.
   *
   *
   *
   * @returns void
   */
  public clear(): void {
    this._children = [];
  }
  /**
   * Draws the child objects to the graphics context.
   *
   *
   *
   * @param context The graphics context.
   * @returns void
   */
  public draw(context: CanvasRenderingContext2D): void {
    for (const s of this._children) {
      s.draw(context);
    }
  }
  /**
   * Gets the child object at the specified {@link index} parameter.
   *
   *
   *
   * @param index The zero-based index of the desired child object.
   * @returns Sprite | null
   */
  public get(index: number): DisplayableObject | null {
    return this._children.length > index && index > -1
      ? this._children[index]
      : null;
  }
  /**
   * Removes the child object from the collection.
   *
   *
   *
   * @param o The child object to remove from the collection.
   * @returns void
   */
  public remove(o: DisplayableObject): void {
    let index = this._children.indexOf(o);
    if (index !== -1) {
      this._children.splice(index, 1);
    }
  }
  /**
   * Removes the child object at the specified {@link index} parameter.
   *
   *
   *
   * @param index The zero-based index of the desired child object.
   * @returns void
   */
  public removeAt(index: number): void {
    if (this._children.length > index && index > -1) {
      this._children.splice(index, 1);
    }
  }
}
