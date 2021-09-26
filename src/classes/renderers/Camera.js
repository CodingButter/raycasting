import { toDegrees, toRadians, Vector } from "../utils/Math";
export default class Camera {
  constructor(x, y, z, width, height, fov, angle) {
    this.__position = new Vector(x, y, z);
    this.__fov = fov;
    this.__width = width;
    this.__height = height;
    this.__angle = toRadians(angle);
  }

  followEntity(entity) {
    this.__position = entity.position;
    this.__angle = entity.angle;
  }
  updateFov(angle) {
    this.__fov = angle;
  }
  get position() {
    return this.__position;
  }
  get angle() {
    return this.__angle;
  }

  get fov() {
    return toDegrees(this.__fov);
  }

  set position(val) {
    this.__position = val;
  }
  set angle(deg) {
    this.__angle = toRadians(deg);
  }

  set fov(degs) {
    this.__fov = toRadians(degs);
  }
}
