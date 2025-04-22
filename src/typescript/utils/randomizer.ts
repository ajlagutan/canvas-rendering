/**
 * Generates a random floating number between the minimum and maximum value.
 * @param min The minimum value, inclusive.
 * @param max The maximum value, inclusive.
 */
export function randomFloat(min: number, max: number) {
  if (min >= max) {
    throw new Error("Invalid range: min must be less than max");
  }
  return Math.random() * (max - min) + min;
}
/**
 * Generates a random integer between the minimum (inclusive) and maximum (exclusive) value.
 * @param min The minimum value, inclusive.
 * @param max The maximum value, exclusive.
 */
export function randomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= max) {
    throw new Error("Invalid range: min must be less than max");
  }
  return Math.floor(Math.random() * (max - min)) + min;
}
/**
 * Generates a random non-zero integer between 
 * the minimum (inclusive) and maximum (exlusive) value.
 * @param min The minimum value, inclusive.
 * @param max The maximum value, exclusive.
 */
export function randomNonZero(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= max) {
    throw new Error("Invalid range: min must be less than max");
  }
  if (min <= 0 && max >= 0 && max - min === 1) {
    throw new Error("Only possible result is zero, which is not allowed");
  }
  let num;
  do {
    num = Math.floor(Math.random() * (max - min)) + min;
  } while (num === 0);
  return num;
}
