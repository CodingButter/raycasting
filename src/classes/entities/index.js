import { toRadians, Vector, vectorDistance } from "../utils/Math"
export default class Entity {
  constructor(handler, x, y, width, height, speed = 0, rotation = 0, sprite) {
    this.__handler = handler
    this.__position = new Vector(x, y)
    this.__width = width
    this.__height = height
    this.__rotation = rotation
    this.__angle = 0
    this.__sprite = sprite
    this.__distance = 0.002
    this.__tilt = 0
    this.__movement = new Vector(0, 0)
    this.__speed = speed
    this.__direction = {
      walk: 0,
      strafe: 0,
    }
  }
  moveX(x) {
    this.__position.x += x
    this.__movement.x = x
  }
  moveY(y) {
    this.__position.y += y
    this.__movement.y = y
  }
  move(x, y, map) {
    if (!map.hasWallAt(this.__position.x + x, this.__position.y + y)) {
      this.moveX(x)
      this.moveY(y)
    }
  }
  render() {
    // for 3d entities
  }
  update(dt, map) {
    this.move(
      Math.cos(this.__rotation) * this.__speed * this.direction.walk * dt || 0,
      Math.sin(this.__rotation) * this.__speed * this.direction.walk * dt || 0,
      map
    )
    this.move(
      Math.cos(this.__rotation + toRadians(90)) * this.__speed * this.direction.strafe * dt || 0,
      Math.sin(this.__rotation + toRadians(90)) * this.__speed * this.direction.strafe * dt || 0,
      map
    )
  }
  get angle() {
    return this.__angle
  }
  get sprite() {
    return this.__sprite
  }
  get currentSpeed() {
    return this.__movement.magnitude
  }
  get movement() {
    return this.__movement
  }
  get position() {
    return this.__position
  }
  get width() {
    return this.__width
  }
  get height() {
    return this.__height
  }
  get rotation() {
    return this.__rotation
  }
  get tilt() {
    return this.__tilt
  }
  get distance() {
    return this.__distance
  }
  get direction() {
    return this.__direction
  }
  set angle(val) {
    this.__angle = val
  }
  set distance(val) {
    if (val === 0) val = 0.001
    this.__distance = val
  }
  set direction(val) {
    this.__direction = val
  }
  set rotation(val) {
    this.__rotation = val
    if (this.__rotation < -Math.PI) this.__rotation += Math.PI * 2
    if (this.__rotation > Math.PI) this.__rotation -= Math.PI * 2
  }

  set tilt(val) {
    this.__tilt = val
    this.__tilt = this.__tilt
    if (this.__tilt > 200) this.__tilt = 200
    if (this.__tilt < -200) this.__tilt = -200
  }
  set position(val) {
    this.__position = val
  }
  set width(val) {
    this.__width = width
  }
  set height(val) {
    this.__height = height
  }
}
