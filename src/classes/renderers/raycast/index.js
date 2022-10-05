import { rangeMap, toRadians } from "../../utils/Math"
import Ray from "../raycast/Ray"
import Map from "../../Map"
import Plane from "./Plane"

export default class RayCast {
  constructor(handler, ctx, map, scale, configs = {}) {
    this.__handler = handler
    this.__camera = this.__handler.getCamera()
    this.__width = this.__handler.getGame().width
    this.__height = this.__handler.getGame().height
    this.__ctx = ctx
    this.__configs = configs
    this.entities = []
    this.__rays = []
    this.__scale = scale
    this.__siteDistance = (this.__width * 0.5) / Math.tan(toRadians(30))
    this.__map = map
    this.__wallShade = 0.7
    this.__floorPlane = new Plane(this.__handler, this.__map.floorMap)
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
    //var gradient = ctx.createLinearGradient(0, 0, 0, this.__height)

    // Add three color stops
    const multiplier = this.__camera.tilt / 10
    const rgbval = 180 - multiplier
    const rgb = `rgb(${rgbval},${rgbval},${rgbval})`
    // gradient.addColorStop(0, rgb)
    // gradient.addColorStop(rangeMap(this.__camera.tilt, -200, 200, 1, 0), "#222222")
    // gradient.addColorStop(1, rgb)
    // // Set the fill style and draw a rectangle
    // ctx.fillStyle = gradient
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, this.__width, this.__height)

    for (var column = 0; column < this.__rays.length; column++) {
      const ray = this.__rays[column]
      const rayDistance = ray.distance * Math.cos(ray.angle - this.__camera.angle)
      const wallHeight = (Map.TILE_SIZE / rayDistance) * this.__camera.projectionDistance
      //console.log(rayDistance);
      var wallPosition = this.__height * 0.5 - wallHeight * 0.5
      wallPosition -= (rayDistance * this.__camera.tilt) / rayDistance
      const fillShade = rangeMap(
        Math.min(rayDistance, this.__siteDistance),
        0,
        this.__siteDistance,
        0,
        1
      )
      ray.texture.drawImageSlice(ctx, ray.textureOffset, column, wallPosition, 1, wallHeight)
      if (!ray.verticalHit) fillShade += 0.2
      ctx.globalAlpha = fillShade
      ctx.fillStyle = "black"
      ctx.fillRect(column, wallPosition, 1, wallHeight)
      ctx.globalAlpha = 1
    }
  }

  addEntity(entity) {
    entity.color = entity.color || "grey"
    this.entities.push(entity)
  }
}
