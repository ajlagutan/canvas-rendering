import { Vector2 } from "../core";
import { Particle } from "../objects";
/**
 * Original codes by: https://gist.github.com/christopher4lis
 *
 * Gist: https://gist.github.com/christopher4lis/f9ccb589ee8ecf751481f05a8e59b1dc
 */
export namespace chris_courses {
  /**
   * Rotates coordinate system for velocities.
   *
   * Takes velocities and alters them as if the coordinate system they're on was rotated.
   *
   * @param velocity The velocity of an individual particle.
   * @param angle The angle of collision between two objects in radians.
   * @returns The altered x and y velocities after the coordinate system has been rotated.
   */
  export function rotate(velocity: Vector2, angle: number): Vector2 {
    return new Vector2(
      velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
      velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    );
  }
  /**
   * Swaps out two colliding particles' X and Y velocities after running through
   * an elastic collision reaction equation.
   *
   * @param particle A particle object with X and Y coordinate, plus velocity
   * @param otherParticle A particle object with X and Y coordinate, plus velocity
   */
  export function resolveCollision(
    particle: Particle,
    otherParticle: Particle
  ): void {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
      // Grab angle between the two colliding particles
      const angle = -Math.atan2(
        otherParticle.y - particle.y,
        otherParticle.x - particle.x
      );

      // Store mass in var for better readability in collision equation
      const m1 = particle.mass;
      const m2 = otherParticle.mass;

      // Velocity before equation
      const u1 = rotate(particle.velocity, angle);
      const u2 = rotate(otherParticle.velocity, angle);

      // Velocity after 1d collision equation
      const v1 = {
        x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
        y: u1.y,
      };
      const v2 = {
        x: (u2.x * (m2 - m1)) / (m1 + m2) + (u1.x * 2 * m1) / (m1 + m2),
        y: u2.y,
      };

      // Final velocity after rotating axis back to original location
      const vFinal1 = rotate(v1, -angle);
      const vFinal2 = rotate(v2, -angle);

      // Swap particle velocities for realistic bounce effect
      particle.velocity.x = vFinal1.x;
      particle.velocity.y = vFinal1.y;

      otherParticle.velocity.x = vFinal2.x;
      otherParticle.velocity.y = vFinal2.y;
    }
  }
}
