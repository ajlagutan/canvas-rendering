/**
 * Utility functions for extending console.log method.
 *
 *
 *
 * @namespace
 */
export namespace logger {
  /**
   * Debug level log.
   *
   *
   *
   * @param data The data to write to the browser console.
   */
  export function debug(this: any, ...data: any[]): void {
    console.debug(`[${this.name}]`, ...data);
  }
  /**
   * Information level log.
   *
   *
   *
   * @param data The data to write to the browser console.
   */
  export function info(this: any, ...data: any[]): void {
    console.info(`[${this.name}]`, ...data);
  }
  /**
   * Error level log.
   *
   *
   *
   * @param data The data to write to the browser console.
   */
  export function error(this: any, ...data: any[]): void {
    console.error(`[${this.name}]`, ...data);
  }
}
/**
 * Utility functions for generating random numbers.
 *
 *
 *
 * @namespace
 */
export namespace rng {
  /**
   * Generates a random floating number between the minimum and maximum value.
   *
   *
   *
   * @param min The minimum value, inclusive.
   * @param max The maximum value, inclusive.
   * @returns number
   */
  export function float(min: number, max: number): number {
    if (min >= max) {
      throw new Error("Invalid range: min must be less than max");
    }
    return Math.random() * (max - min) + min;
  }
  /**
   * Generates a random integer between the minimum (inclusive) and maximum (exclusive) value.
   *
   *
   *
   * @param min The minimum value, inclusive.
   * @param max The maximum value, exclusive.
   * @returns number
   */
  export function int(min: number, max: number): number {
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
   *
   *
   *
   * @param min The minimum value, inclusive.
   * @param max The maximum value, exclusive.
   * @returns number
   */
  export function nonzero(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    if (min >= max) {
      throw new Error("Invalid range: min must be less than max");
    }
    if (min <= 0 && max >= 0 && max - min === 1) {
      throw new Error("Only possible result is zero, which is not allowed");
    }
    let num: number;
    do {
      num = Math.floor(Math.random() * (max - min)) + min;
    } while (num === 0);
    return num;
  }
}
/**
 * Clamps a value between the minimum and maximum value.
 *
 *
 *
 * @param value The current value to clamp.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns number
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
/**
 * Converts a degree value to radian.
 * 
 * 
 * 
 * @param deg The value to convert to radian.
 * @returns number
 */
export function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
/**
 * Computes the remainder of the dividend and divisor using the modulo operator.
 *
 *
 *
 * @param dividend The dividend value.
 * @param divisor The divisor value.
 * @returns number
 */
export function mod(dividend: number, divisor: number): number {
  return ((dividend % divisor) + divisor) % divisor;
}
/**
 * Converts a radian value to degree.
 * 
 * 
 * 
 * @param rad The value to convert to degree.
 * @returns number
 */
export function rad2deg(rad: number): number {
  return rad * (180 / Math.PI);
}
