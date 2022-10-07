import * as THREE from "three"
import ThreeElement from "./ThreeElement"
export default class Cube extends ThreeElement {
  constructor(texture, width, height) {
    super(width, height)
    this.__texture = texture
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    this.__cube = new THREE.Mesh(geometry, material)
    this.__scene.add(this.__cube)
    this.__camera.position.z = 2
    console.log(this.getCanvas())
    this.render()
  }
  get mesh() {
    return this.__cube
  }
}
