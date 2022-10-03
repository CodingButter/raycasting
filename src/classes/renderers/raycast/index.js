import { rangeMap, toRadians } from "../../utils/Math"
import Ray from "../raycast/Ray"
import Map from "../../Map"
import Texture from "./Texture"
import texture from "../../../textures/checkerboard.jpg"
import goldTexture from "../../../textures/gold.jpg"
import grassTexture from "../../../textures/brick445x445.jpg"
import ImageLoader from "../../graphics/ImageLoader"
export default class RayCast {
  constructor(width, height, ctx, map, scale, configs = {}) {
    this.__width = width
    this.__height = height
    this.__ctx = ctx
    this.__configs = configs
    this.entities = []
    this.__rays = []
    this.__scale = scale
    this.__map = map
    this.__wallShade = 0.7
    this.__texture = this.__map.getWallTextureAt(0, 0)
  }

  attachCamera(camera) {
    this.__camera = camera
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
    var gradient = ctx.createLinearGradient(0, 0, 0, this.__height)
    // Add three color stops
    const multiplier = this.__camera.tilt / 10
    const rgbval = 180 - multiplier
    const rgb = `rgb(${rgbval},${rgbval},${rgbval})`
    gradient.addColorStop(0, rgb)
    gradient.addColorStop(rangeMap(this.__camera.tilt, -200, 200, 1, 0), "#222222")
    gradient.addColorStop(1, rgb)
    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, this.__width, this.__height)

    for (var column = 0; column < this.__rays.length; column++) {
      const ray = this.__rays[column]
      const rayDistance = ray.distance * Math.cos(ray.angle - this.__camera.angle)
      const wallHeight = (Map.TILE_SIZE / rayDistance) * this.__camera.projectionDistance
      //console.log(rayDistance);
      var wallPosition = this.__height * 0.5 - wallHeight * 0.5
      wallPosition -= (rayDistance * this.__camera.tilt) / rayDistance
      this.__map
        .getWallTextureAt(ray.column, ray.row)
        .drawImageSlice(ctx, ray.textureOffset, column, wallPosition, 1, wallHeight)
      const fillShade = rangeMap(rayDistance, 0, this.__width, 0, this.__wallShade)
      if (!ray.verticalHit) fillShade += 0.5
      ctx.globalAlpha = fillShade
      ctx.fillStyle = `rgb(0,0,0)`
      ctx.fillRect(column, wallPosition, 1, wallHeight)
      ctx.globalAlpha = 1
    }
  }

  addEntity(entity) {
    entity.color = entity.color || "grey"
    this.entities.push(entity)
  }
}
