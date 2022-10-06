import {
  rangeMap,
  toRadians,
  vectorAngle,
  vectorDistance,
  normalizeAngle,
  toDegrees,
} from "../../utils/Math"
import Ray from "../raycast/Ray"
import Map from "../../Map"

export default class RayCast {
  constructor(handler, ctx, map, scale, configs = {}) {
    this.__handler = handler
    this.__camera = this.__handler.getCamera()
    this.__width = this.__handler.getGame().width
    this.__height = this.__handler.getGame().height
    this.__ctx = ctx
    this.__configs = configs
    this.__entities = []
    this.__rays = []
    this.__scale = scale
    this.__siteDistance = 20 * Map.TILE_SIZE
    this.__map = map
    this.__wallShade = 0.7
  }

  changeConfig(configs) {
    this.__configs = { ...this.__configs, ...configs }
  }
  castAllRays() {
    this.__rays = []
    for (var i = 0; i < this.__width; i++) {
      var rayAngle =
        this.__camera.angle + Math.atan((i - this.__width * 0.5) / this.__camera.projectionDistance)
      var ray = new Ray(this.__width, this.__height, this.__camera.position, rayAngle, this.__map)
      ray.cast()

      this.__rays.push(ray)
    }
  }

  render(ctx) {
    // var gradient = ctx.createLinearGradient(0, 0, 0, this.__height)
    // gradient.addColorStop(0, "rgb(128, 128, 128)")
    // gradient.addColorStop(0.3, "rgb(108, 108, 108)")
    // gradient.addColorStop(0.5, "#000000")
    // gradient.addColorStop(0.7, "rgb(50,50,50)")
    // gradient.addColorStop(1, "rgb(70,70,70)")
    // ctx.fillStyle = gradient
    // ctx.fillRect(0, 0, this.__width, this.__height)
    // Add three color stops
    const multiplier = this.__camera.tilt / 10
    ctx.fillStyle = "rgb(128, 128, 128)"
    ctx.fillRect(0, 0, this.__width, this.__height / 2)
    ctx.fillStyle = "rgb(70,70,70)"
    ctx.fillRect(0, this.__height / 2, this.__width, this.__height / 2)

    for (var column = 0; column < this.__rays.length; column++) {
      const ray = this.__rays[column]
      const rayDistance = ray.distance * Math.cos(ray.angle - this.__camera.angle)
      const wallHeight = (Map.TILE_SIZE / rayDistance) * this.__camera.projectionDistance
      //console.log(rayDistance);
      var wallPosition = this.__height * 0.5 - wallHeight * 0.5
      wallPosition -= (rayDistance * this.__camera.tilt) / rayDistance
      const fillShade = 0.3
      ray.texture.drawImageSlice(ctx, ray.textureOffset, column, wallPosition, 1, wallHeight)
      if (!ray.verticalHit) fillShade *= 2
      ctx.globalAlpha = fillShade
      ctx.fillStyle = "black"
      ctx.fillRect(column, wallPosition, 1, wallHeight)
      ctx.globalAlpha = 1
    }
    this.__entities.forEach((entity) => {
      const angle = vectorAngle(entity.position, this.__camera.position)
      const visibleAngle = this.__camera.angle - angle
      const distance = vectorDistance(this.__camera.position, entity.position)
      const entityDistance = distance * Math.cos(angle - this.__camera.angle)
      const entitySize = (Map.TILE_SIZE / entityDistance) * this.__camera.projectionDistance
      const entityPositionX =
        this.__width * 0.5 - Math.tan(visibleAngle) * this.__camera.projectionDistance
      const entityPositionY = this.__height * 0.5 - entitySize * 0.5
      //console.log({ entityPositionX, width: this.__width })
      if (visibleAngle < this.__camera.fov / 2 || visibleAngle > -this.__camera.fov / 2) {
        if (entityPositionX > 0 && entityPositionX < this.__width) {
          for (var i = 0; i < entitySize; i++) {
            const column = Math.floor(entityPositionX) + i
            if (column > 0 && column < entitySize) {
              const ray = this.__rays[column]
              //drawImageSlice(ctx, ray.textureOffset, column, wallPosition, 1, wallHeight)
              if (distance < ray.distance) {
                entity.sprite.drawImageSlice(
                  ctx,
                  entityPositionX - column,
                  entityPositionX + column,
                  entityPositionY,
                  1,
                  entitySize
                )
              }
            }
          }
        }
      }
    })
  }

  addEntity(entity) {
    this.__entities.push(entity)
  }
}
