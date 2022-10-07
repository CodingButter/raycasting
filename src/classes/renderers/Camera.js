import { normalizerotation, toDegrees, toRadians, Vector } from "../utils/Math"
export default class Camera {
  constructor(x, y, screenResolutionWidth, screenResolutionHeight, height, fov, rotation) {
    this.__position = new Vector(x, y)
    this.__fov = fov
    this.__screenResolutionWidth = screenResolutionWidth
    this.__screenResolutionHeight = screenResolutionHeight
    this.__height = height
    this.__width = this.__screenResolutionWidth
    this.__rotation = rotation
    this.__tilt = 0

    this.__projectionDistance = (screenResolutionWidth * 0.5) / Math.tan(this.__fov * 0.5)
  }

  followEntity(entity) {
    this.__position = entity.position
    this.__rotation = entity.rotation
    this.__tilt = 0 // entity.tilt
    this.__height = entity.height
  }
  updateFov(rotation) {
    this.__fov = rotation
  }
  get position() {
    return this.__position
  }
  get rotation() {
    return this.__rotation
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
  set rotation(deg) {
    this.__rotation = deg
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
