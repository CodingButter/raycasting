import Entity from "./index"
import Geometries from "../graphics/ThreeDElements"
import Sprite from "../graphics/Sprite"
import Texture from "../graphics/Texture"
export default class ThreeDEntity extends Entity {
  constructor(handler, x, y, width, height, speed = 0, rotation = 0, geometry) {
    super(handler, x, y, width, height, speed, rotation)
    this.__geometry = new Geometries[geometry]("", width, height)
    const texture = new Texture(this.__geometry.getCanvas())
    this.__sprite = new Sprite(texture)
  }

  set angle(angle) {
    this.__angle = angle
  }
  set rotation(rotation) {
    this.__rotation = rotation
  }
  render() {
    this.__geometry.render()
  }
}
