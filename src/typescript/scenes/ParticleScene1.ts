import * as lil from "lil-gui";
import { SceneBase, Vector3 } from "../core";
import { Color, PolygonalParticle } from "../objects";
import {
  chris_courses,
  clamp,
  distance,
  randomFloat,
  randomNonZero,
} from "../utils";
import { ParticleSceneUpdateMode } from "./_common";
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
  private _particles: Array<PolygonalParticle> = [];
  private _updatingParticles: boolean = false;

  public controller(gui: lil.GUI): void {
    gui.addColor(Options.Scene, "background");
    gui.addColor(Options.Scene, "foreground");

    const particles = gui.addFolder("particles");
    const particleCount = new Vector3(5, 100, 1);
    const particleRadius = new Vector3(10, 60, 1);
    const particleSides = new Vector3(3, 9, 1);
    const particleDistance = new Vector3(50, 1000, 1);
    const particleVelocity = new Vector3(100, 1000, 1);

    particles
      .add(
        Options.Particles,
        "count",
        particleCount.x,
        particleCount.y,
        particleCount.z
      )
      .onFinishChange(this.updateParticles.bind(this, "particleCount"));

    particles
      .add(
        Options.Particles,
        "radius",
        particleRadius.x,
        particleRadius.y,
        particleRadius.z
      )
      .onChange(this.updateParticles.bind(this, "particleRadius"));

    particles
      .add(
        Options.Particles,
        "sides",
        particleSides.x,
        particleSides.y,
        particleSides.z
      )
      .onChange(this.updateParticles.bind(this, "particleSides"));

    particles
      .add(
        Options.Particles,
        "maxDistance",
        particleDistance.x,
        particleDistance.y,
        particleDistance.z
      )
      .name("max. distance");

    particles
      .add(
        Options.Particles,
        "maxVelocity",
        particleVelocity.x,
        particleVelocity.y,
        particleVelocity.z
      )
      .onFinishChange(this.updateParticles.bind(this, "particleVelocity"))
      .name("max. velocity");
  }

  public initialize(): void {
    this.updateParticles("particleCount");
  }

  public render(context: CanvasRenderingContext2D): void {
    context.save();
    context.fillStyle = Options.Scene.background;
    context.fillRect(0, 0, this.width, this.height);
    context.restore();
    for (let p of this._particles) {
      for (let q of this._particles) {
        if (p === q) continue;
        let totalDistance =
          distance(p.x, p.y, q.x, q.y) - (p.radius + q.radius);
        let totalAlpha = 1 - totalDistance / Options.Particles.maxDistance;
        let color = Color.fromHtmlString(Options.Scene.foreground);
        color.w = clamp(totalAlpha, 0, 1);
        context.beginPath();
        context.moveTo(p.x, p.y);
        context.lineTo(q.x, q.y);
        context.closePath();
        context.save();
        context.lineWidth = 3 * totalAlpha;
        context.strokeStyle = color.toString();
        context.stroke();
        context.restore();
      }
      context.save();
      context.fillStyle = Options.Scene.foreground;
      context.fill(p.path);
      context.restore();
    }
  }

  public update(time: number): void {
    if (this._updatingParticles) {
      return;
    }
    for (let p of this._particles) {
      for (let q of this._particles) {
        if (p === q) continue;
        if (distance(p.x, p.y, q.x, q.y) - (p.radius + q.radius) < 0) {
          chris_courses.resolveCollision(p, q);
        }
      }
      if (p.x < p.radius || p.x > this.width - p.radius) {
        p.x = clamp(p.x, p.radius, this.width - p.radius);
        p.velocity.x = -p.velocity.x;
      }
      if (p.y < p.radius || p.y > this.height - p.radius) {
        p.y = clamp(p.y, p.radius, this.height - p.radius);
        p.velocity.y = -p.velocity.y;
      }
      p.x += p.velocity.x * time;
      p.y += p.velocity.y * time;
    }
  }

  private updateParticles(mode: ParticleSceneUpdateMode): void {
    if (mode === "particleCount") {
      this._updatingParticles = true;
      const diff = Math.abs(Options.Particles.count - this._particles.length);
      if (Options.Particles.count > this._particles.length) {
        const color = Color.transparent;
        const radius = Options.Particles.radius;
        const sides = Options.Particles.sides;
        const velocity = Options.Particles.maxVelocity;
        for (let i = 0; i < diff; i++) {
          const x = randomFloat(radius, this.width - radius);
          const y = randomFloat(radius, this.height - radius);
          const p = new PolygonalParticle(x, y, radius, sides, color);
          p.mass = 1;
          p.velocity.x = randomNonZero(-1, 2) * velocity;
          p.velocity.y = randomNonZero(-1, 2) * velocity;
          this._particles.push(p);
        }
      } else if (Options.Particles.count < this._particles.length) {
        for (let i = 0; i < diff; i++) {
          const p = this._particles.length - 1;
          this._particles.splice(p, 1);
        }
      }
    } else {
      this._updatingParticles = true;
      for (let p of this._particles) {
        if (mode === "particleRadius") {
          p.radius = Options.Particles.radius;
          continue;
        }
        if (mode === "particleSides") {
          p.sides = Options.Particles.sides;
          continue;
        }
        if (mode === "particleVelocity") {
          p.velocity.x = randomNonZero(-1, 2) * Options.Particles.maxVelocity;
          p.velocity.y = randomNonZero(-1, 2) * Options.Particles.maxVelocity;
          continue;
        }
      }
    }
    this._updatingParticles = false;
  }
}
/**
 * A namespace for the scene options.
 *
 * @namespace
 */
namespace Options {
  export abstract class Particles {
    public static count: number = 100;
    public static maxDistance: number = 150;
    public static maxVelocity: number = 300;
    public static radius: number = 10;
    public static sides: number = 6;
  }

  export abstract class Scene {
    public static background: string = "#ffffff";
    public static foreground: string = "#000000";
  }
}
