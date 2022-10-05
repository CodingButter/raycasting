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
    this.__fov = toRadians(80)
    this.__map = new Map(this.__handler.getLevel())
    const player = this.__map.getEntities().player
    this.__player = new Player(
      this.__handler,
      player.position.x * Map.TILE_SIZE,
      player.position.y * Map.TILE_SIZE,
      Map.TILE_SIZE * 0.2,
      Map.TILE_SIZE * 0.5
    )

    this.__camera = new Camera(
      0,
      0,
      this.__handler.getGame().width,
      this.__handler.getGame().height,
      Map.TILE_SIZE * 0.5,
      this.__fov,
      0
    )
    this.__controller = new Controller(this.__handler.getGame().canvas.getCanvas())
    const renderConfigs = {
      stroke: "2px",
      strokeColor: "black",
    }

    this.__controller.attachEntity(this.__player)
    this.__minimapRenderer = new TwoD(
      this.__handler.getGame().width,
      this.__handler.getGame().height,
      this.__ctx,
      this.__map,
      this.__scale,
      renderConfigs
    )
    this.__minimapRenderer.attachCamera(this.__camera)
    this.__raycastRenderer = new RayCast(
      this.__handler.getGame().width,
      this.__handler.getGame().height,
      this.__ctx,
      this.__map,
      this.__scale,
      renderConfigs
    )
    this.__raycastRenderer.attachCamera(this.__camera)
    this.__map.grid.forEach((columns, rowIndex) => {
      columns.map((wall, columnIndex) => {
        if (wall == 1) {
          const entity = new Entity(
            this.__handler,
            columnIndex * Map.TILE_SIZE,
            rowIndex * Map.TILE_SIZE,
            Map.TILE_SIZE,
            Map.TILE_SIZE,
            0,
            0,
            "blue"
          )
          this.__minimapRenderer.addEntity(entity)
          this.__raycastRenderer.addEntity(entity)
        }
      })
    })
    this.__map.getEntities().enemies.forEach((enemy) => {
      const entity = new Entity(
        this.__handler,
        enemy.position.x * Map.TILE_SIZE,
        enemy.position.y * Map.TILE_SIZE,
        Map.TILE_SIZE * 0.5,
        Map.TILE_SIZE * 0.5,
        0,
        0,
        "red"
      )
      this.__minimapRenderer.addEntity(entity)
      this.__raycastRenderer.addEntity(entity)
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
}
