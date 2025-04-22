/**
 * Clamps a value between the minimum and maximum value.
 * @param value The current value to clamp.
 * @param min The minimum value.
 * @param max The maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
/**
 * Computes the distance between the initial and final coordinates.
 * @param sx The initial x-coordinate.
 * @param sy The initial y-coordinate.
 * @param dx The final x-coordinate.
 * @param dy The final y-coordinate.
 */
export function distance(
  sx: number,
  sy: number,
  dx: number,
  dy: number
): number {
  let x = dx - sx;
  let y = dy - sy;
  return Math.sqrt(x ** 2 + y ** 2);
}
/**
 * Computes the distance between the initial and final coordinates without using {@link Math.sqrt} method.
 * @param sx The initial x-coordinate.
 * @param sy The initial y-coordinate.
 * @param dx The final x-coordinate.
 * @param dy The final y-coordinate.
 */
export function distance2(
  sx: number,
  sy: number,
  dx: number,
  dy: number
): number {
  return (dx - sx) * (dx - sx) + (dy - sy) * (dy - sy);
}
