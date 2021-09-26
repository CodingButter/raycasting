import { toRadians } from "../../utils/Math";
export default class TwoD {
  constructor(width, height, camera, ctx, configs = {}) {
    this.__width = width;
    this.__height = height;
    this.__camera = camera;
    this.__camerasize = 10;
    this.__ctx = ctx;
    this.__configs = configs;
    this.entities = [];
  }
  changeConfig(configs) {
    this.__configs = { ...this.__configs, ...configs };
  }
  render() {
    const ctx = this.__ctx;
    ctx.strokeStyle = this.__configs.strokeStyle || "";
    this.entities.forEach(entity => {
      ctx.fillStyle = entity.color;
      ctx.fillRect(
        entity.position.x,
        entity.position.y,
        entity.width,
        entity.height
      );
      ctx.strokeRect(
        entity.position.x,
        entity.position.y,
        entity.width,
        entity.height
      );
    });
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(
      this.__camera.position.x,
      this.__camera.position.y,
      this.__camerasize / 2,
      0,
      toRadians(360)
    );
    ctx.fill();

    ctx.strokeStyle = "white";

    ctx.moveTo(this.__camera.position.x, this.__camera.position.y);
    ctx.lineTo(
      this.__camera.position.x +
        Math.cos(this.__camera.angle) * this.__camerasize,

      this.__camera.position.y +
        Math.sin(this.__camera.angle) * this.__camerasize
    );
    ctx.stroke();
  }

  addEntity(entity) {
    entity.color = entity.color || "grey";
    this.entities.push(entity);
  }
}
