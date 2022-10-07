import * as THREE from "three"

export default class ThreeElement {
  constructor(width, height) {
    this.__width = width * 16
    this.__height = height * 16
    this.__canvas = document.createElement("canvas")
    this.__canvas.width = this.__width
    this.__canvas.height = this.__height
    this.__scene = new THREE.Scene()
    this.__camera = new THREE.PerspectiveCamera(40, this.__width / this.__height, 0.1, 500)
    this.__renderer = new THREE.WebGLRenderer({ canvas: this.__canvas, alpha: true })
    this.__renderer.setSize(this.__width, this.__height)
    this.render()
  }
  getCanvas() {
    return this.__canvas
  }
  render() {
    this.__renderer.render(this.__scene, this.__camera)
  }
}
