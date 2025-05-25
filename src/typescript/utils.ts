export * from "./utils/math"
export * from "./utils/physics"
export * from "./utils/randomizer"

export function debug(prototype: any, ...data: any[]): void {
  console.debug(`[${prototype.constructor.name}]`, ...data);
}
