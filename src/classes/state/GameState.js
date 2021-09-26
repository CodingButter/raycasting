import Entity from "../entities";
import { Player } from "../entities/Player";
import Camera from "../renderers/Camera";
import Controller from "../controller/FPS";
import TwoD from "../renderers/2d";
import Map from "../Map";
export default class GameState {
  constructor(handler) {
    this.__handler = handler;
    this.__ctx = this.__handler.getGame().canvas.getContext();
    this.__player = new Player(
      this.__handler,
      this.__handler.getGame().width / 2,
      this.__handler.getGame().height / 2 - 50,
      0,
      10,
      10
    );

    this.__camera = new Camera(
      0,
      0,
      0,
      this.__width,
      this.__height,
      this.__fov,
      0
    );
    this.__controller = new Controller(
      this.__handler.getGame().canvas.getCanvas()
    );

    this.__renderer = new TwoD(
      this.__width,
      this.__height,
      this.__camera,
      this.__ctx
    );
    this.__renderer.changeConfig({
      stroke: "2px",
      strokeColor: "black",
    });
    this.setup();
  }
  setup() {
    this.__controller.attachEntity(this.__player);
    this.__map = new Map();
    this.__map.grid.forEach((columns, rowIndex) => {
      columns.map((wall, columnIndex) => {
        if (wall == 1) {
          const entity = new Entity(
            this.__handler,
            columnIndex * Map.TILE_SIZE,
            rowIndex * Map.TILE_SIZE,
            0,
            Map.TILE_SIZE,
            Map.TILE_SIZE,
            "blue"
          );
          this.__renderer.addEntity(entity);
        }
      });
    });
  }

  update(dt) {
    this.__player.update(dt, this.__map);
    this.__camera.followEntity(this.__player);
  }

  draw() {
    this.__renderer.render();
  }
  get map() {
    return this.__map;
  }
}
