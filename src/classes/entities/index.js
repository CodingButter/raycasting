import { toRadians, Vector } from "../utils/Math";
export default class Entity {
  constructor(
    handler,
    x,
    y,
    width,
    height,
    speed = 0,
    angle = 0,
    color = "grey"
  ) {
    this.__handler = handler;
    this.__position = new Vector(x, y);
    this.__width = width;
    this.__height = height;
    this.__angle = angle;
    this.__tilt = 0;
    this.__speed = speed;
    this.__direction = {
      walk: 0,
      strafe: 0,
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
    this.move(
      Math.cos(this.__angle) * this.__speed * this.direction.walk * dt || 0,
      Math.sin(this.__angle) * this.__speed * this.direction.walk * dt || 0,
      map
    );
    this.move(
      Math.cos(this.__angle + toRadians(90)) *
        this.__speed *
        this.direction.strafe *
        dt || 0,
      Math.sin(this.__angle + toRadians(90)) *
        this.__speed *
        this.direction.strafe *
        dt || 0,
      map
    );
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
  get tilt() {
    return this.__tilt;
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
  set tilt(val) {
    this.__tilt = val;
    this.__tilt = this.__tilt;
    if (this.__tilt > 200) this.__tilt = 200;
    if (this.__tilt < -200) this.__tilt = -200;
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
