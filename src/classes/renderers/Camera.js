import { toDegrees, toRadians, Vector } from "../utils/Math"
export default class Camera {
  constructor(x, y, screenResolutionWidth, screenResolutionHeight, height, fov, angle) {
    this.__position = new Vector(x, y)
    this.__fov = fov
    this.__screenResolutionWidth = screenResolutionWidth
    this.__screenResolutionHeight = screenResolutionHeight
    this.__height = height
    this.__width = this.__screenResolutionWidth
    this.__angle = angle
    this.__tilt = 0

    this.__projectionDistance = (screenResolutionWidth * 0.5) / Math.tan(this.__fov * 0.5)
  }

  followEntity(entity) {
    this.__position = entity.position
    this.__angle = entity.angle
    this.__tilt = entity.tilt
    this.__height = entity.height
  }
  updateFov(angle) {
    this.__fov = angle
  }
  get position() {
    return this.__position
  }
  get angle() {
    return this.__angle
  }
  get tilt() {
    return this.__tilt
  }

  get fov() {
    return this.__fov
  }
  get width() {
    return this.__width
  }
  get height() {
    return this.__height
  }
  get projectionDistance() {
    return this.__projectionDistance
  }
  set position(val) {
    this.__position = val
  }
  set angle(deg) {
    this.__angle = deg
  }

  set fov(degs) {
    this.__fov = degs
  }
  get screenResolutionWidth() {
    this.__screenResolutionWidth
  }
  get screenResolutionHeight() {
    this.__screenResolutionHeight
  }
}
