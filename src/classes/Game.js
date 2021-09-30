import GameLoop from "./GameLoop";
import Handler from "./Handler";
import Canvas from "./display/Canvas";
import GameState from "./states/GameState";
export default class Game {
  constructor(app, width, height) {
    this.__handler = new Handler(this);
    this.__width = width;
    this.__height = height;
    this.__fov = 30;
    this.__canvas = new Canvas(width, height, app);
    this.__ctx = this.__canvas.getContext();
    this.__handler = new Handler(this);
    this.__state = new GameState(this.__handler);
  }
  run() {
    GameLoop.start();
    GameLoop.on("update", dt => this.update(dt));
    GameLoop.on("draw", () => this.draw());
  }

  update(dt) {
    this.__state.update(dt);
  }

  draw() {
    this.__ctx.clearRect(0, 0, this.__width, this.__height);
    this.__state.draw(this.__ctx);
  }
  get canvas() {
    return this.__canvas;
  }
  get width() {
    return this.__width;
  }
  get height() {
    return this.__height;
  }
  get state() {
    return this.__state;
  }
}
