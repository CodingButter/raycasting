import Entity from "./index";
export class Player extends Entity {
  constructor(handler, x, y, z = 0, width, height) {
    super(handler, x, y, z, width, height, 45, 0, "blue");
  }
}
