export default class Raycast {
  constructor(canvas) {
    this.__canvas = canvas;
    this.__entities = [];
  }
  addCamera(camera) {
    this.__camera = camera;
  }

  draw(ctx) {}
}
