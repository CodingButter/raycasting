import Entity from "../entities"
import { Player } from "../entities/Player"
import Camera from "../renderers/Camera"
import Controller from "../controller/FPS"
import TwoD from "../renderers/2d"
import RayCast from "../renderers/raycast"
import Map from "../Map"
import { toRadians } from "../utils/Math"
export default class GameState {
  constructor(handler) {
    this.__handler = handler
  }
  deconstruct() {
    this.__controller.deconstruct()
  }
  setup() {
    this.__scale = 0.3
    this.__fov = toRadians(90)
    this.__map = new Map(this.__handler)

    this.__player = this.__map.getPlayer()

    this.__camera = new Camera(
      0,
      0,
      this.__handler.getGame().width,
      this.__handler.getGame().height,
      Map.TILE_SIZE * 0.5,
      this.__fov,
      0
    )
    this.__handler.setCamera(this.__camera)
    this.__controller = new Controller(this.__handler.getGame().canvas.getCanvas())
    const renderConfigs = {
      stroke: "2px",
      strokeColor: "black",
    }

    this.__controller.attachEntity(this.__player)
    this.__minimapRenderer = new TwoD(
      this.__handler,
      this.__ctx,
      this.__map,
      this.__scale,
      renderConfigs
    )
    this.__raycastRenderer = new RayCast(
      this.__handler,
      this.__ctx,
      this.__map,
      this.__scale,
      renderConfigs
    )

    this.__map.getEntities().enemies.forEach((enemy) => {
      this.__minimapRenderer.addEntity(enemy)
      this.__raycastRenderer.addEntity(enemy)
    })
    this.__camera.followEntity(this.__player)
  }

  update(dt) {
    this.__player.update(dt, this.__map)
    this.__camera.followEntity(this.__player)
    this.__raycastRenderer.castAllRays()
  }

  draw(ctx) {
    this.__raycastRenderer.render(ctx)
    this.__minimapRenderer.render(ctx)
  }
  get map() {
    return this.__map
  }
  get camera() {
    return this.__camera
  }
}
