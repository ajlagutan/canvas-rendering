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
