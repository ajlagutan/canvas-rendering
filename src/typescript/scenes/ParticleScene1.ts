import { SceneBase } from "../core";
import { Color, Particle } from "../objects";
import {
  chris_courses,
  clamp,
  distance,
  randomFloat,
  randomInt,
  randomNonZero,
} from "../utils";
/**
 * Particle scene #1
 *
 *
 *
 *
 *
 * @class
 */
export class ParticleScene1 extends SceneBase {
  private _collisions: boolean = true;
  private _count: number = 50;
  private _initialized: boolean = false;
  private _particles: Array<Particle> = [];
  private _particlesColor: Array<Color> = [];
  private _radius: number = 32;
  private _updatingParticleArray: boolean = false;
  private _updatingParticleArrayLimit: number = 100;
  /**
   * Gets or sets if the particle can pass through one another or not.
   * 
   * 
   * 
   * 
   * 
   * @returns boolean
   */
  public get collisions(): boolean {
    return this._collisions;
  }
  /**
   * @param value The collision switch.
   */
  public set collisions(value: boolean) {
    this._collisions = value;
  }
  /**
   * Gets or sets the particle count.
   *
   *
   *
   *
   *
   * @returns number
   */
  public get count(): number {
    return this._count;
  }
  /**
   * @param value The particle count.
   */
  public set count(value: number) {
    this._count = value;
    this.updateParticleArray();
  }
  /**
   * Gets or sets the particle radius.
   *
   *
   *
   *
   *
   * @returns number
   */
  public get radius(): number {
    return this._radius;
  }
  /**
   * @param value The radius of the particles.
   */
  public set radius(value: number) {
    this._radius = value;
    this._particles.forEach(function (p: Particle) {
      p.radius = value;
    });
  }

  public controller(gui: dat.GUI): void {
    gui.add(this, "collisions", true).name("enable collisions");
    gui.add(this, "count", 1, 1000, 1);
    gui.add(this, "radius", 10, 100, 1);
  }

  public initialize(): void {
    if (!this._initialized) {
      this.updateParticleArray();
      this._initialized = true;
    }
  }

  public render(context: CanvasRenderingContext2D): void {
    context.clearRect(0, 0, this.width, this.height);
    context.save();
    for (
      let i = 0;
      i < this._particles.length && i < this._particlesColor.length;
      i++
    ) {
      const p = this._particles[i];
      const pc = this._particlesColor[i];
      context.beginPath();
      context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      context.closePath();
      context.fillStyle = pc.toString();
      context.fill();
      context.stroke();
    }
    context.restore();
  }

  public update(time: number): void {
    if (this._updatingParticleArray) return;
    for (let i = 0; i < this._count; i++) {
      const pi = this._particles[i];
      if (this._collisions) {
        for (let j = 0; j < this._count; j++) {
          const pj = this._particles[j];
          if (pi === pj) continue;
          if (distance(pi.x, pi.y, pj.x, pj.y) - (pi.radius + pj.radius) < 0) {
            chris_courses.resolveCollision(pi, pj);
          }
        }
      }
      if (pi.x < pi.radius || pi.x > this.width - pi.radius) {
        pi.x = clamp(pi.x, pi.radius, this.width - pi.radius);
        pi.velocity.x = -pi.velocity.x;
      }
      if (pi.y < pi.radius || pi.y > this.height - pi.radius) {
        pi.y = clamp(pi.y, pi.radius, this.height - pi.radius);
        pi.velocity.y = -pi.velocity.y;
      }
      pi.x += pi.velocity.x * time;
      pi.y += pi.velocity.y * time;
    }
  }

  private updateParticleArray(): void {
    this._updatingParticleArray = true;
    let diff = Math.abs(this._particles.length - this._count);
    if (this._count > this._particles.length) {
      for (let i = 0; i < diff; i++) {
        const hue = randomFloat(0, 360);
        const radius = this._radius;
        let x = this.width / 2;
        let y = this.height / 2;
        const p = new Particle(x, y, radius);
        const pc = Color.fromHsla(hue, 100, 50);
        p.mass = 1;
        p.velocity.x = randomNonZero(-50, 50);
        p.velocity.y = randomNonZero(-50, 50);
        this._particles.push(p);
        this._particlesColor.push(pc);
      }
    } else if (this._count < this._particles.length) {
      for (let i = 0; i < diff; i++) {
        const p = randomInt(0, this._particles.length);
        this._particles.splice(p, 1);
      }
    }
    this._updatingParticleArray = false;
  }
}
