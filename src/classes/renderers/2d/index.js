import { toRadians } from "../../utils/Math"
import Ray from "../raycast/Ray"

export default class TwoD {
  constructor(handler, ctx, map, scale, configs = {}) {
    this.__handler = handler
    this.__camera = this.__handler.getCamera()
    this.__scale = scale
    this.__width = this.__handler.getGame().width
    this.__height = this.__handler.getGame().height
    this.__camerasize = 10
    this.__ctx = ctx
    this.__configs = configs
    this.entities = []
    this.__rays = []
    this.__map = map
  }
  changeConfig(configs) {
    this.__configs = { ...this.__configs, ...configs }
  }
  castAllRays(ctx) {
    var rayAngle = this.__camera.angle - this.__camera.fov / 2
    this.__rays = []
    for (var i = 0; i < this.__camera.width; i++) {
      var ray = new Ray(this.__width, this.__height, this.__camera.position, rayAngle, this.__map)
      ray.cast()
      ctx.strokeStyle = "white"
      ray.drawRay(ctx, this.__scale)
      this.__rays.push(ray)
      rayAngle += this.__camera.fov / this.__camera.width
    }
  }
  render(ctx) {
    this.castAllRays(ctx)
    ctx.save()
    ctx.globalAlpha = 0.6
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, this.__map.getWidth() * this.__scale, this.__map.getHeight() * this.__scale)
    ctx.strokeStyle = this.__configs.strokeStyle || ""
    this.entities.forEach((entity) => {
      ctx.fillStyle = entity.color
      ctx.fillRect(
        entity.position.x * this.__scale,
        entity.position.y * this.__scale,
        entity.width * this.__scale,
        entity.height * this.__scale
      )
      ctx.strokeRect(
        entity.position.x * this.__scale,
        entity.position.y * this.__scale,
        entity.width * this.__scale,
        entity.height * this.__scale
      )
    })
    ctx.fillStyle = "blue"
    ctx.beginPath()
    ctx.arc(
      this.__camera.position.x * this.__scale,
      this.__camera.position.y * this.__scale,
      (this.__camerasize / 2) * this.__scale,
      0,
      toRadians(360)
    )
    ctx.fill()

    ctx.strokeStyle = "white"

    ctx.moveTo(this.__camera.position.x * this.__scale, this.__camera.position.y * this.__scale)
    ctx.lineTo(
      (this.__camera.position.x + Math.cos(this.__camera.angle) * this.__camerasize) * this.__scale,

      (this.__camera.position.y + Math.sin(this.__camera.angle) * this.__camerasize) * this.__scale
    )
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle = "white"
    ctx.stroke()
    ctx.restore()
  }

  addEntity(entity) {
    entity.color = entity.color || "grey"
    this.entities.push(entity)
  }
}
