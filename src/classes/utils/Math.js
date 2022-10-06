export function toRadians(degs) {
  return degs * (Math.PI / 180)
}

export function toDegrees(rads) {
  return rads * (180 / Math.PI)
}
export function vectorDistance(vector1, vector2) {
  const distX = vector1.x - vector2.x
  const distY = vector1.y - vector2.y
  return Math.sqrt(distX * distX + distY * distY)
}
export function vectorAngle(vector1, vector2) {
  const distX = vector1.x - vector2.x
  const distY = vector1.y - vector2.y
  return Math.atan2(distY, distX)
}
export function normalizeAngle(theta) {
  return (theta + Math.PI * 2) % (Math.PI * 2)
  // angle = angle % (2 * Math.PI)
  // if (angle < 0) angle += 2 * Math.PI
  // return angle
}
export function rangeMap(n, start1, stop1, start2, stop2) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
}
export class Vector {
  constructor(x = 0, y = 0, z = 0) {
    this.__x = x
    this.__y = y
    this.__z = z
  }
  get x() {
    return this.__x
  }
  get y() {
    return this.__y
  }
  get z() {
    return this.__z
  }

  set x(val) {
    this.__x = val
  }
  set y(val) {
    this.__y = val
  }
  set z(val) {
    this.__z = val
  }

  add(vector) {
    return new Vector(this.__x + vector.x, this.__y + vector.y, this.__z + vector.z)
  }
  subtract(vector) {
    return new Vector(this.__x - vector.x, this.__y - vector.y, this.__z - vector.z)
  }
  multiply(vector) {
    return new Vector(this.__x * vector.x, this.__y * vector.y, this.__z * vector.z)
  }
  devide(vector) {
    return new Vector(this.__x / vector.x, this.__y / vector.y, this.__z / vector.z)
  }
}
