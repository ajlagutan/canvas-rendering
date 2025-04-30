import * as lil from "lil-gui";
import { ParticleSceneUpdateMode } from "./_common";
import {
  Assets,
  AssetsState,
  Mouse,
  SceneBase,
  Vector2,
  Vector3,
} from "../core";
import {
  Color,
  ColoredParticle,
  Particle,
  ParticleRenderCallback,
  PolygonalParticle,
} from "../objects";
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
export class ParticleScene2 extends SceneBase {
  private static DefaultParticleRender: ParticleRenderCallback<PolygonalParticle> =
    () => {};
  private _assets: Assets | null = null;
  private _backgroundColors: Array<string> = [];
  private _backgroundController: lil.Controller | null = null;
  private _mouse: Vector2 = new Vector2(0, 0);
  private _mouseDist: Vector2 = new Vector2(0, 0);
  private _mouseInit: Vector2 = new Vector2(0, 0);
  private _palette: any = {};
  private _paletteColors: Array<Color> = [];
  private _paletteController: lil.Controller | null = null;
  private _paletteSourceController: lil.Controller | null = null;
  private _particleFill: ParticleRenderCallback<PolygonalParticle> =
    this.particleFill;
  private _particleStroke: ParticleRenderCallback<PolygonalParticle> =
    ParticleScene2.DefaultParticleRender;
  private _particles: Array<PolygonalParticle> = [];
  private _updatingParticles: boolean = false;

  public controller(gui: lil.GUI): void {
    this._paletteSourceController = gui
      .add(Options.Scene, "paletteSource", {})
      .onChange(this.updatePaletteSource.bind(this))
      .name("source");

    this._paletteController = gui
      .add(Options.Scene, "palette", {})
      .onChange(this.updatePalette.bind(this))
      .name("palette");

    const background = gui.addFolder("background");

    background
      .add(Options.Scene, "usePaletteForBackground")
      .onChange(this.updateBackgroundMode.bind(this, background))
      .name("use palette");

    this._backgroundController = background
      .addColor(Options.Scene, "background")
      .name("color");

    const colors = gui.addFolder("colors");
    const colorAlpha = new Vector3(0.25, 0.8, 0.01);

    colors
      .add(Options.Colors, "alphaBlended")
      .onChange(this.updateParticles.bind(this, "colorAlpha"))
      .name("use alpha");

    colors
      .add(Options.Colors, "alpha", colorAlpha.x, colorAlpha.y, colorAlpha.z)
      .onChange(this.updateParticles.bind(this, "colorAlpha"));

    const particles = gui.addFolder("particles");
    const particleCount = new Vector3(1000, 10000, 1);
    const particleSide = new Vector3(2, 12, 1);
    const particleRadius = new Vector3(10, 200, 1);
    const particleRadiusFactor = new Vector3(10, 100, 1);
    const particleVelocity = new Vector3(200, 1000, 1);

    particles
      .add(Options.Particles, "mode", [
        "fill",
        "stroke",
        "fill+stroke",
        "fill/stroke",
      ])
      .onChange(this.updateParticleMode.bind(this));

    particles
      .add(
        Options.Particles,
        "count",
        particleCount.x,
        particleCount.y,
        particleCount.z
      )
      .onChange(this.updateParticles.bind(this, "particleCount"));

    particles
      .add(
        Options.Particles,
        "sides",
        particleSide.x,
        particleSide.y,
        particleSide.z
      )
      .onChange(this.updateParticles.bind(this, "particleSides"));

    particles
      .add(
        Options.Particles,
        "maxVelocity",
        particleVelocity.x,
        particleVelocity.y,
        particleVelocity.z
      )
      .onChange(this.updateParticles.bind(this, "particleVelocity"))
      .name("max. velocity");

    const radius = particles.addFolder("radius");

    radius
      .add(
        Options.Particles,
        "maxRadius",
        particleRadius.x,
        particleRadius.y,
        particleRadius.z
      )
      .onChange(this.updateParticles.bind(this, "particleRadius"))
      .name("max")
      .listen();

    radius
      .add(
        Options.Particles,
        "radiusGain",
        particleRadiusFactor.x,
        particleRadiusFactor.y,
        particleRadiusFactor.z
      )
      .onChange(this.updateParticles.bind(this, "particleRadius"))
      .name("gain")
      .listen();

    radius
      .add(
        Options.Particles,
        "radiusDecay",
        particleRadiusFactor.x,
        particleRadiusFactor.y,
        particleRadiusFactor.z
      )
      .onChange(this.updateParticles.bind(this, "particleRadius"))
      .name("decay")
      .listen();

    particles.add(Options.Particles, "resetRadius").name("reset radius");

    const mouse = gui.addFolder("mouse");
    const mouseRadius = new Vector3(50, 200, 1);
    const mouseVelocity = new Vector3(0.5, 10.0, 0.1);

    mouse.add(Options.Mouse, "follow");

    mouse
      .add(Options.Mouse, "radius", mouseRadius.x, mouseRadius.y, mouseRadius.z)
      .name("max. radius");

    mouse
      .add(
        Options.Mouse,
        "velocity",
        mouseVelocity.x,
        mouseVelocity.y,
        mouseVelocity.z
      )
      .name("max. velocity");
  }

  public initialize(): void {
    if (!this._assets) {
      this._assets = Assets.create(
        "/assets/palette.json",
        "/assets/palette.ladygaga.json",
        "/assets/palette.taylorswift.json"
      );
    }
    this._mouse.x = this.width / 2;
    this._mouse.y = this.height / 2;
  }

  public render(context: CanvasRenderingContext2D): void {
    context.save();
    context.fillStyle = Options.Scene.background;
    context.fillRect(0, 0, this.width, this.height);
    context.restore();
    for (let p of this._particles) {
      const i = this._particles.indexOf(p);
      this._particleFill(context, p, i);
      this._particleStroke(context, p, i);
    }
  }

  public update(time: number): void {
    if (this._assets && this._assets.state === "ready") {
      this._assets.load(this.loaded.bind(this));
      return;
    }
    if (this._assets && this._assets.state === "loading") {
      return;
    }
    if (this._updatingParticles) {
      return;
    }
    for (let p of this._particles) {
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
      this.updateParticleRadius(p, time);
    }
    this.updateMouse(time);
  }

  private loaded(state: AssetsState): void {
    if (this._assets && state === "done") {
      let initial: any = null;
      for (let k of this._assets.paths) {
        const json = this._assets.get(k);
        if (!json || json === "") {
          continue;
        }
        const palette: any = {};
        for (let p of JSON.parse(json)) {
          palette[p.name] = p.colors;
        }
        k = k.replace("/assets/", "").replace(".json", "");
        initial = initial || palette;
        this._palette[k] = palette;
      }
      if (this._paletteSourceController) {
        this._paletteSourceController.options(this._palette).setValue(initial);
      }
      this.updateParticles("particleCount");
    }
  }

  private particleFill(
    context: CanvasRenderingContext2D,
    particle: PolygonalParticle,
    index: number
  ): void {
    if (Options.Particles.mode.indexOf("/") > 0 && index % 2 !== 0) {
      return;
    }
    context.fillStyle = particle.color.toString();
    context.fill(particle.path);
  }

  private particleStroke(
    context: CanvasRenderingContext2D,
    particle: PolygonalParticle,
    index: number
  ): void {
    if (Options.Particles.mode.indexOf("/") > 0 && index % 2 === 0) {
      return;
    }
    context.lineJoin = "round";
    context.lineWidth = 3;
    context.strokeStyle = particle.color.clone().toString();
    context.stroke(particle.path);
  }

  private updateBackgroundMode(folder: lil.GUI, value: boolean): void {
    if (value) {
      if (this._backgroundController instanceof lil.ColorController) {
        this._backgroundController.destroy();
        this._backgroundController = null;
      }
      this._backgroundController = folder
        .add(Options.Scene, "background", this._backgroundColors)
        .name("color");
      if (this._backgroundColors.length > 0) {
        this._backgroundController.setValue(this._backgroundColors[0]);
      }
    } else {
      if (this._backgroundController) {
        this._backgroundController.destroy();
        this._backgroundController = null;
      }
      this._backgroundController = folder
        .addColor(Options.Scene, "background")
        .name("color");
    }
  }

  private updateMouse(time: number): void {
    if (Options.Mouse.follow) {
      this._mouseInit.x = Mouse.x || this.width / 2;
      this._mouseInit.y = Mouse.y || this.height / 2;
    } else {
      this._mouseInit.x = this.width / 2;
      this._mouseInit.y = this.height / 2;
    }
    this._mouseDist.x = this._mouseInit.x - this._mouse.x;
    this._mouseDist.y = this._mouseInit.y - this._mouse.y;
    this._mouse.x += this._mouseDist.x * Options.Mouse.velocity * time;
    this._mouse.y += this._mouseDist.y * Options.Mouse.velocity * time;
  }

  private updatePalette(colors: Array<Vector3>): void {
    this._paletteColors.splice(0, this._paletteColors.length);
    this._backgroundColors.splice(0, this._backgroundColors.length);
    for (let c of colors) {
      const color = Color.fromVector3(c);
      this._paletteColors.push(color);
      this._backgroundColors.push(color.toString(true));
    }
    this.updateParticles("colorPalette");
    if (this._backgroundController instanceof lil.OptionController) {
      this._backgroundController.options(this._backgroundColors);
      if (this._backgroundColors.length > 0) {
        this._backgroundController.setValue(this._backgroundColors[0]);
      }
    }
  }

  private updatePaletteSource(source: any): void {
    if (this._paletteController) {
      let initial: any = null;
      for (let p in source) {
        if (initial) {
          continue;
        }
        initial = source[p];
      }
      this._paletteController.options(source).setValue(initial);
    }
  }

  private updateParticleColor(particle: ColoredParticle): void {
    const index = randomInt(0, this._paletteColors.length);
    const color = this._paletteColors[index].clone();
    color.w = Options.Colors.alphaBlended ? Options.Colors.alpha : 1;
    particle.color = color;
  }

  private updateParticleMode(mode: string): void {
    if (mode === "fill") {
      this._particleFill = this.particleFill.bind(this);
      this._particleStroke = ParticleScene2.DefaultParticleRender;
      return;
    }
    if (mode === "stroke") {
      this._particleFill = ParticleScene2.DefaultParticleRender;
      this._particleStroke = this.particleStroke.bind(this);
      return;
    }
    this._particleFill = this.particleFill.bind(this);
    this._particleStroke = this.particleStroke.bind(this);
  }

  private updateParticleRadius(p: Particle, time: number): void {
    let totalDistance = distance(p.x, p.y, this._mouse.x, this._mouse.y);
    let totalRadius = p.radius + Options.Mouse.radius;
    if (totalDistance - totalRadius < 0) {
      p.radius += Options.Particles.radiusGain * time;
    } else {
      p.radius -= Options.Particles.radiusDecay * time;
    }
    p.radius = clamp(p.radius, 0, Options.Particles.maxRadius);
  }

  private updateParticles(mode: ParticleSceneUpdateMode): void {
    if (mode === "particleCount") {
      this._updatingParticles = true;
      const diff = Math.abs(this._particles.length - Options.Particles.count);
      if (Options.Particles.count > this._particles.length) {
        const velocity = Options.Particles.maxVelocity;
        const sides = Options.Particles.sides;
        for (let i = 0; i < diff; i++) {
          const x = randomFloat(0, this.width);
          const y = randomFloat(0, this.height);
          const p = new PolygonalParticle(x, y, 0, sides, Color.transparent);
          p.mass = 1;
          p.velocity.x = randomNonZero(-velocity, velocity);
          p.velocity.y = randomNonZero(-velocity, velocity);
          this.updateParticleColor(p);
          this._particles.push(p);
        }
      } else if (Options.Particles.count < this._particles.length) {
        for (let i = 0; i < diff; i++) {
          const p = randomInt(0, this._particles.length);
          this._particles.splice(p, 1);
        }
      }
    } else {
      this._updatingParticles = true;
      const velocity = Options.Particles.maxVelocity;
      const sides = Options.Particles.sides;
      for (let p of this._particles) {
        if (mode === "colorAlpha") {
          p.color.w = Options.Colors.alphaBlended ? Options.Colors.alpha : 1;
          continue;
        }
        if (mode === "colorPalette") {
          this.updateParticleColor(p);
          continue;
        }
        if (mode === "particleVelocity") {
          p.velocity.x = randomNonZero(-velocity, velocity);
          p.velocity.y = randomNonZero(-velocity, velocity);
          continue;
        }
        if (mode === "particleSides") {
          p.sides = sides;
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
  /**
   * Color options for the scene.
   *
   * @abstract
   * @class
   */
  export abstract class Colors {
    /**
     * Gets or sets the alpha component value of the color.
     *
     * @returns number
     * @default 0.7
     */
    public static alpha: number = 0.7;
    /**
     * Gets or sets whether to set the alpha component of the color.
     *
     * @returns boolean
     * @default true
     */
    public static alphaBlended: boolean = true;
  }
  /**
   * Mouse options for the scene.
   *
   * @abstract
   * @class
   */
  export abstract class Mouse {
    /**
     * Gets or sets whether to follow the mouse pointer.
     *
     * @returns boolean
     */
    public static follow: boolean = false;
    /**
     * Gets or sets the mouse pointer radius (area).
     *
     * @returns number
     */
    public static radius: number = 200;
    /**
     * Gets or sets the mouse movement velocity.
     *
     * @returns number
     */
    public static velocity: number = 2.5;
  }
  /**
   * Particle options for the scene.
   *
   * @abstract
   * @class
   */
  export abstract class Particles {
    /**
     * Gets or sets the particle count.
     *
     * @returns number
     */
    public static count: number = 5000;
    /**
     * Gets or sets the maximum radius the particle could have.
     *
     * @returns number
     */
    public static maxRadius: number = 50;
    /**
     * Gets or sets the maximum velocity the particle could have.
     *
     * @returns number
     */
    public static maxVelocity: number = 1000;
    /**
     * Gets or sets whether the particle should be filled or stroked or both.
     *
     * @returns string
     */
    public static mode: string = "fill";
    /**
     * Gets or sets the decay of the particle radius.
     *
     * @returns number
     */
    public static radiusDecay: number = 50;
    /**
     * Gets or sets the gain of the particle radius.
     *
     * @returns number
     */
    public static radiusGain: number = 50;
    /**
     * Gets or sets the number of sides of a polygon.
     *
     * @returns number
     */
    public static sides: number = 6;
    /**
     * Resets the radius options.
     *
     * @returns void
     */
    public static resetRadius(): void {
      Options.Particles.maxRadius = 50;
      Options.Particles.radiusGain = 50;
      Options.Particles.radiusDecay = 50;
    }
  }
  /**
   * Global options for the scene.
   *
   * @abstract
   * @class
   */
  export abstract class Scene {
    /**
     * Gets or sets the background color of the scene.
     *
     * @returns string
     */
    public static background: string = "#000000";
    /**
     * Gets or sets the color palette of the scene.
     *
     * @returns string | null
     */
    public static palette: string | null;
    /**
     * Gets or sets the color palette source of the scene.
     *
     * @returns string | null
     */
    public static paletteSource: string | null;
    /**
     * Gets or sets whether to use the current palettes for background.
     *
     * @returns boolean
     */
    public static usePaletteForBackground: boolean = false;
  }
}
