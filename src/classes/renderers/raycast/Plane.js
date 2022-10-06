export default class Plane {
  constructor(handler, texture) {
    this.__handler = handler
    this.__camera = this.__handler.getCamera()
    this.__width = this.__camera.width
    this.__height = this.__camera.height
    this.__texture = texture
    this.__fov = this.__camera.fov / 2
  }

  draw(ctx) {
    const xOffset = this.__camera.position.x
    const yOffset = this.__camera.position.y
    const farX1 =
      this.__camera.position.x +
      Math.cos(this.__camera.angle - this.__fov) * this.__camera.projectionDistance
    const farY1 =
      this.__camera.position.y +
      Math.sin(this.__camera.angle - this.__fov) * this.__camera.projectionDistance
    const nearX1 = this.__camera.position.x + Math.cos(this.__camera.angle - this.__fov) * 0.01
    const nearY1 = this.__camera.position.y + Math.sin(this.__camera.angle - this.__fov) * 0.01
  }
}
