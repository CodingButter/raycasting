import Entity from "../entities";

export default class FPS {
  constructor(canvas) {
    this.__lastmouse = { x: 0, y: 0 };
    this.__entity = new Entity(0, 0, 0, 0, 0);
    this.__canvas = canvas;
    this.__keys = { W: 0, S: 0, D: 0, A: 0 };

    this.__canvas.addEventListener("mousemove", e => this.rotateCamera(e));
    document.addEventListener("keydown", e => this.startMove(e));
    document.addEventListener("keyup", e => this.stopMove(e));
    this.__canvas.requestPointerLock =
      this.__canvas.requestPointerLock || this.__canvas.mozRequestPointerLock;
    this.__canvas.addEventListener("click", e => this.__click(e));
  }
  __click(e) {
    this.__canvas.requestPointerLock();
  }

  attachEntity(entity) {
    this.__entity = entity;
  }

  rotateCamera({ movementX, movementY }) {
    this.__entity.angle += movementX / 1000;
    this.__entity.tilt += movementY;
  }

  startMove(e) {
    this.__keys[String.fromCharCode(e.keyCode)] = 1;
    this.__entity.direction.walk = this.__keys["W"] - this.__keys["S"];
    this.__entity.direction.strafe = this.__keys["D"] - this.__keys["A"];
  }

  stopMove(e) {
    this.__keys[String.fromCharCode(e.keyCode)] = 0;
    this.__entity.direction.walk = this.__keys["W"] - this.__keys["S"];
    this.__entity.direction.strafe = this.__keys["D"] - this.__keys["A"];
  }
}
