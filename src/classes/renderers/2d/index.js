import { toRadians, Vector, vectorAngle, vectorDistance, normalizeAngle } from "../../utils/Math"
import Ray from "../raycast/Ray"
import Map from "../../Map"
export default class TwoD {
  constructor(handler, ctx, map, scale, configs = {}) {
    this.__handler = handler
    this.__camera = this.__handler.getCamera()
    this.__scale = scale
    this.__width = this.__handler.getGame().width
    this.__height = this.__handler.getGame().height
    this.__camerasize = Map.TILE_SIZE
    this.__ctx = ctx
    this.__configs = configs
    this.__entities = []
    this.__rays = []
    this.__map = map
  }
  changeConfig(configs) {
    this.__configs = { ...this.__configs, ...configs }
  }
  drawRays(ctx) {
    var rayAngle = this.__camera.rotation - this.__camera.fov / 2
    this.__rays = []
    this.__handler.getRays().forEach((ray) => {
      ctx.strokeStyle = "white"
      ctx.globalAlpha = 0.1
      ray.drawRay(ctx, this.__scale)
    })
  }
  render(ctx) {
    this.drawRays(ctx)
    ctx.save()
    ctx.globalAlpha = 0.6
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, this.__map.getWidth() * this.__scale, this.__map.getHeight() * this.__scale)
    ctx.strokeStyle = this.__configs.strokeStyle || ""
    this.__map.grid.forEach((columns, rowIndex) => {
      columns.map((wall, columnIndex) => {
        if (wall > 0) {
          ctx.fillStyle = "blue"
          ctx.fillRect(
            columnIndex * Map.TILE_SIZE * this.__scale,
            rowIndex * Map.TILE_SIZE * this.__scale,
            Map.TILE_SIZE * this.__scale,
            Map.TILE_SIZE * this.__scale
          )
          ctx.strokeRect(
            columnIndex * Map.TILE_SIZE * this.__scale,
            rowIndex * Map.TILE_SIZE * this.__scale,
            Map.TILE_SIZE * this.__scale,
            Map.TILE_SIZE * this.__scale
          )
        }
      })
    })
    this.__entities.forEach((entity) => {
      const position = new Vector(
        entity.position.x - entity.width / 2,
        entity.position.y - entity.height / 2
      )
      ctx.fillStyle = entity.color
      ctx.fillRect(
        position.x * this.__scale,
        position.y * this.__scale,
        entity.width * this.__scale,
        entity.height * this.__scale
      )
      ctx.strokeRect(
        position.x * this.__scale,
        position.y * this.__scale,
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
      (this.__camera.position.x + Math.cos(this.__camera.rotation) * this.__camerasize) *
        this.__scale,

      (this.__camera.position.y + Math.sin(this.__camera.rotation) * this.__camerasize) *
        this.__scale
    )
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle = "white"
    ctx.stroke()
    ctx.restore()
    ctx.globalAlpha = 1
  }

  addEntity(entity) {
    entity.color = entity.color || "grey"
    this.__entities.push(entity)
  }
}
