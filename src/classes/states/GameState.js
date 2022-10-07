import { vectorAngle } from "../utils/Math"
import Camera from "../renderers/Camera"
import Controller from "../controller/FPS"
import TwoD from "../renderers/2d"
import RayCast from "../renderers/raycast"
import Map from "../Map"
import { toRadians, vectorDistance } from "../utils/Math"
import Ray from "../renderers/raycast/Ray"
export default class GameState {
  constructor(handler) {
    this.__handler = handler
  }
  deconstruct() {
    this.__controller.deconstruct()
  }
  setup() {
    this.__scale = 0.35
    this.__fov = toRadians(90)
    this.__map = new Map(this.__handler)
    this.__width = this.__handler.getGame().width
    this.__height = this.__handler.getGame().height
    this.__player = this.__map.getPlayer()
    this.__camera = new Camera(
      this.__player.position.x,
      this.__player.position.y,
      this.__width,
      this.__height,
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
    Object.keys(this.__map.getEntities()).forEach((key) => {
      this.__map.getEntities()[key].forEach((entity) => {
        entity.distance = vectorDistance(this.__camera.position, entity.position)
        entity.angle = vectorAngle(this.__camera.position, entity.position)
        //}
      })
    })
  }

  draw(ctx) {
    this.__handler.setRays(Ray.castAllRays(this.__width, this.__height, this.__camera, this.__map))
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
