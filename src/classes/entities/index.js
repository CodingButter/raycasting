import { toRadians, Vector } from "../utils/Math";
export default class Entity {
  constructor(
    handler,
    x,
    y,
    z = 0,
    width,
    height,
    speed = 0,
    angle = 0,
    color = "grey"
  ) {
    this.__handler = handler;
    this.__position = new Vector(x, y, z);
    this.__width = width;
    this.__height = height;
    this.__angle = angle;
    this.__speed = speed;
    this.__direction = {
      forward: false,
      backward: false,
      left: false,
      right: false,
    };
  }
  moveX(x) {
    this.__position.x += x;
  }
  moveY(y) {
    this.__position.y += y;
  }
  move(x, y, map) {
    if (!map.hasWallAt(this.__position.x + x, this.__position.y + y)) {
      this.moveX(x);
      this.moveY(y);
    }
  }
  update(dt, map) {
    if (this.__direction.forward) {
      this.move(
        Math.cos(this.__angle) * this.__speed * dt,
        Math.sin(this.__angle) * this.__speed * dt,
        map
      );
    }
    if (this.direction.backward) {
      this.move(
        Math.cos(this.__angle) * -this.__speed * dt,
        Math.sin(this.__angle) * -this.__speed * dt,
        map
      );
    }
    if (this.direction.left) {
      this.move(
        Math.cos(this.__angle + toRadians(90)) * -this.__speed * dt,
        Math.sin(this.__angle + toRadians(90)) * -this.__speed * dt,
        map
      );
    }
    if (this.direction.right) {
      this.move(
        Math.cos(this.__angle + toRadians(90)) * this.__speed * dt,
        Math.sin(this.__angle + toRadians(90)) * this.__speed * dt,
        map
      );
    }
  }
  get position() {
    return this.__position;
  }
  get width() {
    return this.__width;
  }
  get height() {
    return this.__height;
  }
  get angle() {
    return this.__angle;
  }
  get direction() {
    return this.__direction;
  }
  set direction(val) {
    this.__direction = val;
  }
  set angle(val) {
    this.__angle = val;
  }
  set position(val) {
    this.__position = val;
  }
  set width(val) {
    this.__width = width;
  }
  set height(val) {
    this.__height = height;
  }
}
