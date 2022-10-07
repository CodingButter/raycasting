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
        this.__camera.rotation +
        Math.atan((i - this.__width * 0.5) / this.__camera.projectionDistance)
      var ray = new Ray(this.__width, this.__height, this.__camera.position, rayAngle, this.__map)
      ray.cast()

      this.__rays.push(ray)
    }
  }

  render(ctx) {
    this.__rays = this.__handler.getRays()
    ctx.fillStyle = "rgb(128, 128, 128)"
    ctx.fillRect(0, 0, this.__width, this.__height / 2)
    ctx.fillStyle = "rgb(70,70,70)"
    ctx.fillRect(0, this.__height / 2, this.__width, this.__height / 2)

    for (var column = 0; column < this.__rays.length; column++) {
      const ray = this.__rays[column]
      const rayDistance = ray.distance * Math.cos(ray.angle - this.__camera.rotation)
      const wallHeight = (Map.TILE_SIZE / rayDistance) * this.__camera.projectionDistance
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
    this.__entities
      .filter((entity) => {
        const visibleAngle = this.__camera.rotation - entity.angle
        return visibleAngle < this.__camera.fov / 2 || visibleAngle > -this.__camera.fov / 2
      })
      .sort((a, b) => (a.distance < b.distance ? 1 : -1))
      .forEach((entity) => {
        const angle = vectorAngle(entity.position, this.__camera.position)
        const visibleAngle = this.__camera.rotation - angle
        const entityDistance = entity.distance * Math.cos(angle - this.__camera.rotation)
        const entitySize = (Map.TILE_SIZE / entityDistance) * this.__camera.projectionDistance
        const spriteScreenX = Math.tan(visibleAngle) * this.__camera.projectionDistance
        const entityPositionY = this.__height * 0.5 - entitySize * 0.5
        const spriteLeftX = Math.floor(this.__width / 2 - spriteScreenX)
        const spriteRightX = Math.floor(spriteLeftX + entitySize)
        for (let x = spriteLeftX; x < spriteRightX; x++) {
          if (x >= 0 && x < this.__width) {
            const textelWidth = Map.TILE_SIZE / entitySize
            const textureOffsetX = (x - spriteLeftX) * textelWidth
            const ray = this.__rays[Math.floor(x)]
            if (ray) {
              if (ray.distance > entityDistance) {
                entity.sprite.drawImageSlice(ctx, textureOffsetX, x, entityPositionY, 1, entitySize)
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
