import dat, { GUIController } from "dat.gui";
import { SceneBase } from "../core";
import { clamp, randomFloat } from "../utils";

export class TestScene extends SceneBase {
  public size: number = 25;
  private _x: number = 0;
  private _y: number = 0;
  private _dx: number = 1;
  private _dy: number = 1;
  private _vx: number = 1000;
  private _vy: number = 1000;
  private _initial: boolean = true;
  public controller(gui: dat.GUI): void {
    gui.add(this, "size", 15, 150, 5);
  }
  public render(context: CanvasRenderingContext2D): void {
    context.clearRect(0, 0, this.width, this.height);
    context.save();
    context.fillStyle = "red";
    context.fillRect(this._x, this._y, this.size, this.size);
    context.restore();
  }
  public update(time: number): void {
    if (this._initial) {
      this._x = randomFloat(0, this.width - this.size);
      this._y = randomFloat(0, this.height - this.size);
      this._initial = false;
      return;
    }
    if (this._x < 0 || this._x > this.width - this.size) {
      this._x = clamp(this._x, 0, this.width - this.size);
      this._dx = -this._dx;
    }
    if (this._y < 0 || this._y > this.height - this.size) {
      this._y = clamp(this._y, 0, this.height - this.size);
      this._dy = -this._dy;
    }
    this._x += this._vx * this._dx * time;
    this._y += this._vy * this._dy * time;
  }
}
