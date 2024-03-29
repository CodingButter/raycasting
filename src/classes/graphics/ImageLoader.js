export default class ImageLoader {
  static async loadImage(path) {
    return await new Promise((resolve, reject) => {
      const image = new Image()
      image.crossOrigin = "Anonymous"
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      image.onload = () => {
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
        resolve(canvas)
      }

      image.src = path
    })
  }
  static async LoadImages(images) {
    return await Promise.all(images.map((image) => ImageLoader.loadImage(image)))
  }
}
