import * as lil from "lil-gui";
import { Mouse, Rectangle, SceneBase, Vector2 } from "../core";
import { clamp, mod, randomFloat, randomInt } from "../utils";
import { Particle } from "../objects";

export class TestScene extends SceneBase {
  private _cartesian: HTMLCanvasElement | null = null;
  private _cartesianGrid: Path2D | null = null;
  private _viewport: Rectangle = Rectangle.empty;

  public controller(gui: lil.GUI): void {
    gui.addColor(Options.Scene, "background");

    const cartesian = gui.addFolder("cartesian plane");
    const cartesianMin = this._viewport.width / -2;
    const cartesianMax = this._viewport.width / 2;

    cartesian
      .addColor(Options.Cartesian, "background")
      .onChange(this.updateCartesianPlane.bind(this));

    cartesian
      .add(Options.Cartesian, "gridStep", 15, cartesianMax / 4, 5)
      .onFinishChange(this.updateCartesianGrid.bind(this))
      .name("grid step");

    const shapes = gui.addFolder("shapes");

    shapes.addColor(Options.Shapes, "borderColor").name("border color");

    shapes.add(Options.Shapes, "borderWidth", 5, 15, 1).name("border width");
    shapes.add(Options.Shapes, "radius", 20, 50, 1).name("radius");

    const primary = shapes.addFolder("primary");

    primary.addColor(Options.Shapes, "primaryColor").name("color");

    primary
      .add(Options.Shapes.primaryVector, "x", cartesianMin, cartesianMax, 1)
      .listen();

    primary
      .add(Options.Shapes.primaryVector, "y", cartesianMin, cartesianMax, 1)
      .listen();

    primary.add(Options.Shapes, "randomizePrimary").name("randomize");

    const secondary = shapes.addFolder("secondary");

    secondary.addColor(Options.Shapes, "secondaryColor").name("color");

    secondary
      .add(Options.Shapes.secondaryVector, "x", cartesianMin, cartesianMax, 1)
      .listen();

    secondary
      .add(Options.Shapes.secondaryVector, "y", cartesianMin, cartesianMax, 1)
      .listen();

    secondary.add(Options.Shapes, "randomizeSecondary").name("randomize");
  }

  public initialize(): void {
    this._viewport.width = 800;
    this._viewport.height = 800;

    this.updateCartesianGrid();
    this.updateCartesianPlane();

    super.initialize();
  }

  public render(context: CanvasRenderingContext2D): void {
    context.save();
    context.fillStyle = Options.Scene.background;
    context.fillRect(0, 0, this.width, this.height);
    context.restore();
    if (this._cartesian) {
      context.drawImage(this._cartesian, this._viewport.x, this._viewport.y);
    }
    this.renderPrimary(context);
    this.renderSecondary(context);
    this.renderDistance(context);
  }

  public update(time: number): void {
    this._viewport.x = (this.width - this._viewport.width) / 2;
    this._viewport.y = (this.height - this._viewport.height) / 2;
  }

  private computeVector(from: Vector2, to: Vector2): Vector2 {
    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    const px = from.x + Math.cos(angle) * Options.Shapes.radius;
    const py = from.y + Math.sin(angle) * Options.Shapes.radius;
    return new Vector2(px, py);
  }

  private renderCartesian(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.rect(0, 0, this._viewport.width, this._viewport.height);
    context.closePath();
    context.save();
    context.fillStyle = Options.Cartesian.background;
    context.fill();
    if (this._cartesianGrid) {
      context.strokeStyle = Options.Cartesian.grid;
      context.stroke(this._cartesianGrid);
    }
    context.restore();
  }

  private renderDistance(context: CanvasRenderingContext2D): void {
    const cx = this._viewport.x + this._viewport.width / 2;
    const cy = this._viewport.y + this._viewport.height / 2;
    const v1 = this.computeVector(
      Options.Shapes.primaryVector,
      Options.Shapes.secondaryVector
    );
    const v2 = this.computeVector(
      Options.Shapes.secondaryVector,
      Options.Shapes.primaryVector
    );
    context.beginPath();
    context.moveTo(cx + v1.x, cy + v1.y);
    context.lineTo(cx + v2.x, cy + v2.y);
    context.closePath();
    context.save();
    context.lineJoin = "round";
    context.lineWidth = Options.Shapes.borderWidth;
    context.strokeStyle = Options.Shapes.borderColor;
    context.stroke();
    context.restore();
    // context.beginPath();
    // context.moveTo(
    //   cx + Options.Shapes.primaryVector.x,
    //   cy + Options.Shapes.primaryVector.y
    // );
    // context.lineTo(
    //   cx + Options.Shapes.secondaryVector.x,
    //   cy + Options.Shapes.secondaryVector.y
    // );
    // context.closePath();
    // context.save();
    // context.lineJoin = "round";
    // context.lineWidth = Options.Shapes.borderWidth;
    // context.strokeStyle = Options.Shapes.borderColor;
    // context.stroke();
    // context.restore();
  }

  private renderPrimary(context: CanvasRenderingContext2D): void {
    const cx = this._viewport.x + this._viewport.width / 2;
    const cy = this._viewport.y + this._viewport.height / 2;
    context.beginPath();
    context.arc(
      cx + Options.Shapes.primaryVector.x,
      cy + Options.Shapes.primaryVector.y,
      Options.Shapes.radius,
      0,
      Math.PI * 2
    );
    context.closePath();
    context.save();
    context.fillStyle = Options.Shapes.primaryColor;
    context.strokeStyle = Options.Shapes.borderColor;
    context.lineWidth = Options.Shapes.borderWidth;
    context.fill();
    context.stroke();
    context.restore();
  }

  private renderSecondary(context: CanvasRenderingContext2D): void {
    const cx = this._viewport.x + this._viewport.width / 2;
    const cy = this._viewport.y + this._viewport.height / 2;
    context.beginPath();
    context.arc(
      cx + Options.Shapes.secondaryVector.x,
      cy + Options.Shapes.secondaryVector.y,
      Options.Shapes.radius,
      0,
      Math.PI * 2
    );
    context.closePath();
    context.save();
    context.fillStyle = Options.Shapes.secondaryColor;
    context.strokeStyle = Options.Shapes.borderColor;
    context.lineWidth = Options.Shapes.borderWidth;
    context.fill();
    context.stroke();
    context.restore();
  }

  private updateCartesianGrid(): void {
    this._cartesianGrid = new Path2D();

    const horzSrc = new Vector2(this._viewport.width / 2, 0);
    const horzDst = new Vector2(
      this._viewport.width / 2,
      this._viewport.bottom
    );
    this._cartesianGrid.moveTo(horzSrc.x, horzSrc.y);
    this._cartesianGrid.lineTo(horzDst.x, horzDst.y);

    const vertSrc = new Vector2(0, this._viewport.height / 2);
    const vertDst = new Vector2(
      this._viewport.right,
      this._viewport.height / 2
    );
    this._cartesianGrid.moveTo(vertSrc.x, vertSrc.y);
    this._cartesianGrid.lineTo(vertDst.x, vertDst.y);

    const plane = Math.min(this._viewport.width, this._viewport.height);

    const center = new Vector2(
      this._viewport.width / 2,
      this._viewport.height / 2
    );

    const step = Options.Cartesian.gridStep;
    for (let i = step; i < plane; i += step) {
      //  Horizontal Steps
      this._cartesianGrid.moveTo(center.x - i, center.y - 10);
      this._cartesianGrid.lineTo(center.x - i, center.y + 10);
      this._cartesianGrid.moveTo(center.x + i, center.y - 10);
      this._cartesianGrid.lineTo(center.x + i, center.y + 10);
      //  Vertical Steps
      this._cartesianGrid.moveTo(center.x - 10, center.y - i);
      this._cartesianGrid.lineTo(center.x + 10, center.y - i);
      this._cartesianGrid.moveTo(center.x - 10, center.y + i);
      this._cartesianGrid.lineTo(center.x + 10, center.y + i);
    }

    const context = this._cartesian?.getContext("2d");
    if (context) {
      this.renderCartesian(context);
    }
  }

  private updateCartesianPlane(): void {
    this._cartesian = document.createElement("canvas");
    this._cartesian.width = this._viewport.width;
    this._cartesian.height = this._viewport.height;
    const context = this._cartesian?.getContext("2d");
    if (context) {
      this.renderCartesian(context);
    }
  }
}
namespace Options {
  /**
   * Cartesian plane options for the scene.
   *
   * @abstract
   * @class
   */
  export abstract class Cartesian {
    /**
     * Gets or sets the background of the cartesian plane.
     *
     * @returns string
     */
    public static background: string = "#dcdcdc";
    /**
     * Gets or sets the color of the cartesian grid.
     *
     * @returns number
     */
    public static grid: string = "#708090";
    /**
     * Gets or sets the steps of the cartesian grid.
     *
     * @returns number
     */
    public static gridStep: number = 40;
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
    public static background: string = "#ffffff";
  }
  /**
   * Shapes options for the test scene.
   *
   * @abstract
   * @class
   */
  export abstract class Shapes {
    /**
     * Gets or sets the border color of the primary and secondary shape.
     *
     * @returns string
     */
    public static borderColor: string = "#708090";
    /**
     * Gets or sets the border width of the primary and secondary shape.
     *
     * @returns number
     */
    public static borderWidth: number = 5;
    /**
     * Gets or sets the color of the primary shape.
     *
     * @returns string
     */
    public static primaryColor: string = "#ff0000";
    /**
     * Gets or sets the vector of the primary shape.
     *
     * @returns Vector2
     */
    public static primaryVector: Vector2 = new Vector2(-200, 200);
    /**
     * Gets or sets the size of the primary and secondary shape.
     *
     * @returns number
     */
    public static radius: number = 30;
    /**
     * Gets or sets the color of the secondary shape.
     *
     * @returns string
     */
    public static secondaryColor: string = "#ff00ff";
    /**
     * Gets or sets the vector of the secondary shape.
     *
     * @returns Vector2
     */
    public static secondaryVector: Vector2 = new Vector2(200, -200);
    /**
     * Randomizes the vector of primary shape.
     *
     * @returns void
     */
    public static randomizePrimary(): void {
      this.primaryVector.x = randomInt(-400, 401);
      this.primaryVector.y = randomInt(-400, 401);
    }
    /**
     * Randomizes the vector of secondary shape.
     *
     * @returns void
     */
    public static randomizeSecondary(): void {
      this.secondaryVector.x = randomInt(-400, 401);
      this.secondaryVector.y = randomInt(-400, 401);
    }
  }
}
