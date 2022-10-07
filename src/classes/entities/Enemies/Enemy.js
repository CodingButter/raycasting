import Entity from "../index"
export default class Enemy extends Entity {
  constructor(handler, x, y, width, height, sprite) {
    super(handler, x, y, width, height, 100, 0, sprite)
  }
}
