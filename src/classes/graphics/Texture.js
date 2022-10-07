import Map from "../Map"
export default class Texture {
  constructor(canvas) {
    this.__width = canvas.width
    this.__height = canvas.height
    this.__canvas = canvas
    this.__brightness = 1
    const ctx = canvas.getContext("2d")

    this.__imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
  }
  drawImage(ctx, x, y, w, h, sx, sy, sw, sh) {
    ctx.drawImage(this.__canvas, x, y, w, h, sx, sy, sw, sh)
  }

  drawImageSlice(ctx, textureOffset, x, y, w, h) {
    var sliceWidth = this.__width / Map.TILE_SIZE
    const sliceX = Math.floor(sliceWidth * textureOffset)
    this.drawImage(ctx, sliceX, 0, 1, this.__height, x, y, w, h)
  }

  drawPixel(ctx, px, py, x, y, w) {
    ctx.drawImage(this.__canvas, px, py, 1, w, x, y, 1, w)
  }
  getImage() {
    return this.__canvas
  }
  putImageData(ctx, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
    var data = this.__imageData.data
    var height = this.__canvas.height
    var width = this.__canvas.width
    dirtyX = dirtyX || 0
    dirtyY = dirtyY || 0
    dirtyWidth = dirtyWidth !== undefined ? dirtyWidth : width
    dirtyHeight = dirtyHeight !== undefined ? dirtyHeight : height
    var limitBottom = dirtyY + dirtyHeight
    var limitRight = dirtyX + dirtyWidth
    for (var y = dirtyY; y < limitBottom; y++) {
      for (var x = dirtyX; x < limitRight; x++) {
        var pos = y * width + x
        ctx.fillStyle =
          "rgba(" +
          data[pos * 4 + 0] +
          "," +
          data[pos * 4 + 1] +
          "," +
          data[pos * 4 + 2] +
          "," +
          data[pos * 4 + 3] / 255 +
          ")"
        ctx.fillRect(x + dx, y + dy, 1, 1)
      }
    }
  }
  get width() {
    return this.__width
  }
  get height() {
    return this.__height
  }
}
