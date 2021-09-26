export function toRadians(degs) {
  return degs * (Math.PI / 180);
}

export function toDegrees(rads) {
  return rads * (180 / Math.PI);
}

export class Vector {
  constructor(x = 0, y = 0, z = 0) {
    this.__x = x;
    this.__y = y;
    this.__z = z;
  }
  get x() {
    return this.__x;
  }
  get y() {
    return this.__y;
  }
  get z() {
    return this.__z;
  }

  set x(val) {
    this.__x = val;
  }
  set y(val) {
    this.__y = val;
  }
  set z(val) {
    this.__z = val;
  }

  add(vector) {
    return new Vector(
      this.__x + vector.x,
      this.__y + vector.y,
      this.__z + vector.z
    );
  }
  subtract(vector) {
    return new Vector(
      this.__x - vector.x,
      this.__y - vector.y,
      this.__z - vector.z
    );
  }
  multiply(vector) {
    return new Vector(
      this.__x * vector.x,
      this.__y * vector.y,
      this.__z * vector.z
    );
  }
  devide(vector) {
    return new Vector(
      this.__x / vector.x,
      this.__y / vector.y,
      this.__z / vector.z
    );
  }
}
