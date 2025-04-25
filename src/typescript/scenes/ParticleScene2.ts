import * as lil from "lil-gui";
import { Mouse, SceneBase } from "../core";
import { Color, ColoredParticle } from "../objects";
import {
  clamp,
  distance,
  randomFloat,
  randomInt,
  randomNonZero,
} from "../utils";
/**
 *
 */
type Palette = {
  name: string;
  color: PaletteEntry | null;
  colors: Array<PaletteEntry>;
};
/**
 *
 */
type PaletteEntry = { x: number; y: number; z: number; w: number };
/**
 *
 */
type ParticleUpdateType = "count" | "palette" | "velocity" | "alpha";
/**
 *
 */
export class ParticleScene2 extends SceneBase {
  private _loading: boolean = false;
  private _mousedx: number = 0;
  private _mousedy: number = 0;
  private _mousepx: number = 0;
  private _mousepy: number = 0;
  private _mousex: number = 0;
  private _mousey: number = 0;
  private _paletteController: lil.Controller | null = null;
  private _palette: Array<Color> = [];
  private _palettes: any = {};
  private _particles: Array<ColoredParticle> = [];
  private _request: XMLHttpRequest | null = null;
  private _updatingParticlesArray: boolean = false;

  public controller(gui: lil.GUI): void {
    gui.addColor(ParticleSceneOptions, "background");

    const colors = gui.addFolder("colors");

    this._paletteController = colors
      .add(ParticleSceneOptions, "palette", {})
      .onChange(this.updatePalette.bind(this));

    colors
      .add(ParticleSceneOptions, "blend")
      .name("use blend")
      .onChange(this.updateParticleArray.bind(this, "alpha"));

    colors
      .add(ParticleSceneOptions, "blendAlpha", 0.25, 0.75, 0.01)
      .name("alpha")
      .onChange(this.updateParticleArray.bind(this, "alpha"));

    const particles = gui.addFolder("particles");

    particles
      .add(ParticleSceneOptions, "count", 1000, 10000, 1)
      .onChange(this.updateParticleArray.bind(this, "count"));

    particles
      .add(ParticleSceneOptions, "particleRadius", 50, 200, 1)
      .name("max. radius");

    particles
      .add(ParticleSceneOptions, "velocity", 200, 1000, 1)
      .name("max. velocity")
      .onChange(this.updateParticleArray.bind(this, "velocity"));

    const mouse = gui.addFolder("mouse");

    mouse.add(ParticleSceneOptions, "mouseFollow").name("follow");
    mouse
      .add(ParticleSceneOptions, "mouseVelocity", 0.5, 10.0, 0.1)
      .name("max. velocity");
    mouse
      .add(ParticleSceneOptions, "mouseRadius", 50, 200, 1)
      .name("max. radius");
  }

  public initialize(): void {
    if (Object.keys(this._palettes).length === 0) {
      this._request = new XMLHttpRequest();
      this._request.addEventListener("loadend", this.requestEnded.bind(this));
      this._request.open("GET", "/assets/palette.json");
      this._request.send();
    }
  }

  public render(context: CanvasRenderingContext2D): void {
    context.save();
    context.fillStyle = ParticleSceneOptions.background;
    context.fillRect(0, 0, this.width, this.height);
    context.restore();
    context.save();
    for (let p of this._particles) {
      context.beginPath();
      context.arc(p.x, p.y, Math.max(0, p.radius), 0, Math.PI * 2);
      context.closePath();
      context.fillStyle = p.color.toString();
      context.fill();
    }
    context.restore();
  }

  public update(time: number): void {
    if (ParticleSceneOptions.mouseFollow) {
      this._mousex = Mouse.x || this.width / 2;
      this._mousey = Mouse.y || this.height / 2;
    } else {
      this._mousex = this.width / 2;
      this._mousey = this.height / 2;
    }
    this._mousedx = this._mousex - this._mousepx;
    this._mousedy = this._mousey - this._mousepy;
    this._mousepx += this._mousedx * ParticleSceneOptions.mouseVelocity * time;
    this._mousepy += this._mousedy * ParticleSceneOptions.mouseVelocity * time;
    if (!this._updatingParticlesArray && this._loading) {
      return;
    }
    for (let p of this._particles) {
      if (this._mousex !== undefined && this._mousey !== undefined) {
        let totalDistance = distance(p.x, p.y, this._mousepx, this._mousepy);
        let totalRadius = p.radius + ParticleSceneOptions.mouseRadius;
        if (totalDistance - totalRadius < 0) {
          p.radius++;
        } else {
          p.radius--;
        }
        p.radius = clamp(p.radius, 0, ParticleSceneOptions.particleRadius);
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

  private getColor(alpha: number): Color {
    let color = this._palette[randomInt(0, this._palette.length)].clone();
    color.w = ParticleSceneOptions.blend ? alpha : 1;
    return color;
  }

  private requestEnded(e: ProgressEvent): void {
    if (!this._request) {
      return;
    }
    const palettes: Array<Palette> = JSON.parse(this._request.responseText);
    for (let value of palettes) {
      if (value.color) {
      } else {
        this._palettes[value.name] = [];
        for (let entry of value.colors) {
          let color;
          if (entry.x > 255) {
            color = Color.fromHsla(entry.x, entry.y, entry.z);
          } else {
            color = Color.fromRgba(entry.x, entry.y, entry.z);
          }
          this._palettes[value.name].push(color);
        }
      }
    }
    if (!this._paletteController) {
      return;
    }
    this._loading = false;
    this._paletteController
      .options(Object.keys(this._palettes))
      .setValue(Object.keys(this._palettes)[0]);
    this.updateParticleArray("count");
  }

  private updatePalette(name: string): void {
    this._palette = this._palettes[name];
    this.updateParticleArray("palette");
  }

  private updateParticleArray(category: ParticleUpdateType): void {
    this._updatingParticlesArray = true;
    if (category === "count") {
      let diff = Math.abs(this._particles.length - ParticleSceneOptions.count);
      if (ParticleSceneOptions.count > this._particles.length) {
        for (let i = 0; i < diff; i++) {
          let x = randomFloat(0, this.width);
          let y = randomFloat(0, this.height);
          const p = new ColoredParticle(x, y, 0, Color.transparent);
          p.mass = 1;
          p.color = this.getColor(ParticleSceneOptions.blendAlpha);
          p.velocity.x = randomNonZero(
            -ParticleSceneOptions.velocity,
            ParticleSceneOptions.velocity
          );
          p.velocity.y = randomNonZero(
            -ParticleSceneOptions.velocity,
            ParticleSceneOptions.velocity
          );
          this._particles.push(p);
        }
      } else if (ParticleSceneOptions.count < this._particles.length) {
        for (let i = 0; i < diff; i++) {
          const p = randomInt(0, this._particles.length);
          this._particles.splice(p, 1);
        }
      }
    } else if (category === "velocity") {
      for (let p of this._particles) {
        p.velocity.x = randomFloat(
          -ParticleSceneOptions.velocity,
          ParticleSceneOptions.velocity
        );
        p.velocity.y = randomFloat(
          -ParticleSceneOptions.velocity,
          ParticleSceneOptions.velocity
        );
      }
    } else if (category === "palette") {
      for (let p of this._particles) {
        p.color = this.getColor(ParticleSceneOptions.blendAlpha);
      }
    } else if (category === "alpha") {
      for (let p of this._particles) {
        const color = p.color.clone();
        color.w = ParticleSceneOptions.blend
          ? ParticleSceneOptions.blendAlpha
          : 1;
        p.color = color;
      }
    }
    this._updatingParticlesArray = false;
  }
}
/**
 * A particle scene options.
 *
 *
 *
 *
 *
 * @abstract
 * @class
 */
abstract class ParticleSceneOptions {
  private static _background: string = "#000000";
  private static _blend: boolean = true;
  private static _blendAlpha: number = 0.7;
  private static _count: number = 10000;
  private static _mouseFollow: boolean = false;
  private static _mouseRadius: number = 200;
  private static _mouseVelocity: number = 10;
  private static _palette: string | null = null;
  private static _particleRadius: number = 100;
  private static _velocity: number = 1000;
  /**
   * Gets or sets the background color of the scene.
   *
   *
   *
   *
   *
   * @returns string
   */
  public static get background(): string {
    return this._background;
  }
  /**
   * @param value The background color of the scene.
   */
  public static set background(value: string) {
    this._background = value;
  }
  /**
   * Gets or sets the blend mode of the scene.
   *
   *
   *
   *
   *
   * @returns boolean
   */
  public static get blend(): boolean {
    return this._blend;
  }
  /**
   * @param value The state of the blend mode of the scene.
   */
  public static set blend(value: boolean) {
    this._blend = value;
  }
  /**
   * Gets or sets the blending alpha.
   *
   *
   *
   *
   *
   * @returns number
   */
  public static get blendAlpha(): number {
    return this._blendAlpha;
  }
  /**
   * @param value The blending alpha.
   */
  public static set blendAlpha(value: number) {
    this._blendAlpha = value;
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
  public static get count(): number {
    return this._count;
  }
  /**
   * @param value The particle count.
   */
  public static set count(value: number) {
    this._count = value;
  }
  /**
   * Gets or sets the switch to follow the mouse movement.
   *
   *
   *
   *
   *
   * @returns boolean
   */
  public static get mouseFollow(): boolean {
    return this._mouseFollow;
  }
  /**
   * @param value The switch to follow the mouse movement.
   */
  public static set mouseFollow(value: boolean) {
    this._mouseFollow = value;
  }
  /**
   * Gets or sets the mouse radius.
   *
   *
   *
   *
   *
   * @returns number
   */
  public static get mouseRadius(): number {
    return this._mouseRadius;
  }
  /**
   * @param value The mouse radius.
   */
  public static set mouseRadius(value: number) {
    this._mouseRadius = value;
  }
  /**
   * Gets or sets the mouse follow velocity.
   *
   *
   *
   *
   *
   * @returns number
   */
  public static get mouseVelocity(): number {
    return this._mouseVelocity;
  }
  /**
   * @param value The mouse follow velocity.
   */
  public static set mouseVelocity(value: number) {
    this._mouseVelocity = value;
  }
  /**
   * Gets or sets the color palette to use.
   *
   *
   *
   *
   *
   * @returns string
   */
  public static get palette(): string | null {
    return this._palette;
  }
  /**
   * @param value The name of the color palette to use.
   */
  public static set palette(value: string | null) {
    this._palette = value;
  }
  /**
   * Gets or sets the maximum particle radius.
   *
   *
   *
   *
   *
   * @returns number
   */
  public static get particleRadius(): number {
    return this._particleRadius;
  }
  /**
   * @param value The maximum particle radius.
   */
  public static set particleRadius(value: number) {
    this._particleRadius = value;
  }
  /**
   * Gets or sets the particle's base velocities.
   *
   *
   *
   *
   *
   * @returns number
   */
  public static get velocity(): number {
    return this._velocity;
  }
  /**
   * @param value The particle's base velocity.
   */
  public static set velocity(value: number) {
    this._velocity = value;
  }
}
