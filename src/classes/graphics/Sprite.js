import Map from "../Map"
export default class Sprite {
  constructor(texture) {
    this.__texture = texture
    this.__width = texture.width
    this.__height = texture.height
    this.__shadeCanvas = document.createElement("canvas")
    this.__shadeCanvas.width = this.__width
    this.__shadeCanvas.height = this.__height
    this.__shadectx = this.__shadeCanvas.getContext("2d")
    this.__brightness = 1
    this.brightness = 1
  }
  drawImage(ctx, x, y, w, h, sx, sy, sw, sh) {
    this.__texture.drawImage(ctx, x, y, w, h, sx, sy, sw, sh)
    ctx.drawImage(this.__shadeCanvas, x, y, w, h, sx, sy, sw, sh)
  }

  drawImageSlice(ctx, textureOffset, x, y, w, h) {
    var sliceWidth = this.__texture.width / Map.TILE_SIZE
    const sliceX = Math.floor(sliceWidth * textureOffset)
    this.drawImage(ctx, sliceX, 0, 1, this.__texture.height, x, y, w, h)
  }
  render() {
    //here for 3d renderable sprites
  }
  get width() {
    return this.__texture.width
  }
  get height() {
    return this.__texture.height
  }
  get brightness() {
    return this.__brightness
  }
  set brightness(value) {
    this.__shadectx.clearRect(0, 0, this.__width, this.__height)
    this.__texture.drawImage(
      this.__shadectx,
      0,
      0,
      this.__width,
      this.__height,
      0,
      0,
      this.__width,
      this.__height
    )
    this.__shadectx.save()
    this.__shadectx.globalCompositeOperation = "source-in"
    this.__shadectx.fillStyle = "#000"
    this.__texture.drawImage(
      this.__shadectx,
      0,
      0,
      this.__width,
      this.__height,
      0,
      0,
      this.__width,
      this.__height
    )
    this.__shadectx.globalAlpha = 1 - value
    this.__shadectx.fillRect(0, 0, this.__width, this.__height)
    this.__shadectx.globalAlpha = 1
    this.__shadectx.restore()
    this.__brightness = value
  }
}
