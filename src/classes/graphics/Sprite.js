import Map from "../Map"
export default class Sprite {
  constructor(texture) {
    this.__texture = texture
  }
  drawImage(ctx, x, y, w, h) {
    this.__texture.drawImage(ctx, x, y, w, h)
  }

  drawImageSlice(ctx, textureOffset, x, y, w, h) {
    this.__texture.drawImageSlice(ctx, textureOffset, x, y, w, h)
  }
  get width() {
    return this.__texture.width
  }
  get height() {
    return this.__texture.height
  }
}
