import Entity from "../entities";

export default class FPS {
  constructor(canvas) {
    this.__lastmouse = { x: 0, y: 0 };
    this.__entity = new Entity(0, 0, 0, 0, 0);
    this.__canvas = canvas;
    this.__keys = [];

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

  rotateCamera({ movementX }) {
    this.__lastmouse.x += movementX;
    this.__entity.angle += movementX / 1000;
  }

  startMove(e) {
    if (String.fromCharCode(e.keyCode) === "W") {
      this.__entity.direction.forward = true;
    }
    if (String.fromCharCode(e.keyCode) === "S") {
      this.__entity.direction.backward = true;
    }
    if (String.fromCharCode(e.keyCode) === "A") {
      this.__entity.direction.left = true;
    }
    if (String.fromCharCode(e.keyCode) === "D") {
      this.__entity.direction.right = true;
    }
  }
  stopMove(e) {
    if (String.fromCharCode(e.keyCode) === "W") {
      this.__entity.direction.forward = false;
    }
    if (String.fromCharCode(e.keyCode) === "S") {
      this.__entity.direction.backward = false;
    }
    if (String.fromCharCode(e.keyCode) === "A") {
      this.__entity.direction.left = false;
    }
    if (String.fromCharCode(e.keyCode) === "D") {
      this.__entity.direction.right = false;
    }
  }
}
