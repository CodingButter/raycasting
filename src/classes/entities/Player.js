import Entity from "./index";
export class Player extends Entity {
  constructor(handler, x, y, width, height) {
    super(handler, x, y, width, height, 100, 0, "blue");
  }
}
