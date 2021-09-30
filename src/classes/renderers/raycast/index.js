import { rangeMap, toRadians } from "../../utils/Math";
import Ray from "../raycast/Ray";
import Map from "../../Map";
import Texture from "./Texture";
import texture from "../../../textures/checkerboard.jpg";
import grassTexture from "../../../textures/grass.jpg";
import ImageLoader from "../../graphics/ImageLoader";
export default class RayCast {
  constructor(width, height, ctx, map, scale, configs = {}) {
    this.__width = width;
    this.__height = height;
    this.__camerasize = 10;
    this.__ctx = ctx;
    this.__configs = configs;
    this.entities = [];
    this.__rays = [];
    this.__scale = scale;
    this.__map = map;
    this.__wallShade = 0.7;
    //const grass = ImageLoader.loadImage(texture);
    this.__loaded = false;
    this.addImages();
  }
  async addImages() {
    const grass = await ImageLoader.loadImage(grassTexture);
    this.__floorTexture = new Texture(grass);
    this.__texture = new Texture(grass);
    this.__loaded = true;
  }
  attachCamera(camera) {
    this.__camera = camera;
  }
  changeConfig(configs) {
    this.__configs = { ...this.__configs, ...configs };
  }
  castAllRays() {
    this.__rays = [];
    for (var i = 0; i < this.__camera.width; i++) {
      var rayAngle =
        this.__camera.angle +
        Math.atan(
          (i - this.__camera.width / 2) / this.__camera.projectionDistance
        );
      var ray = new Ray(
        this.__width,
        this.__height,
        this.__camera.position,
        rayAngle,
        this.__map
      );
      ray.cast();

      this.__rays.push(ray);
    }
  }
  render(ctx) {
    if (!this.__loaded) return;
    var gradient = ctx.createLinearGradient(0, 0, 0, this.__height);

    // Add three color stops
    const multiplier = this.__camera.tilt / 10;
    const rgbval = 180 - multiplier;
    const rgb = `rgb(${rgbval},${rgbval},${rgbval})`;
    gradient.addColorStop(0, rgb);
    gradient.addColorStop(0.5 - this.__camera.tilt / 650, "#222222");
    gradient.addColorStop(1, rgb);
    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.__width, this.__height);
    this.castAllRays();
    for (var column = 0; column < this.__rays.length; column++) {
      // for (
      //   var column = Math.floor(this.__width / 2);
      //   column < Math.floor(this.__width / 2) + 1;
      //   column++
      // ) {
      const ray = this.__rays[column];
      const rayDistance =
        ray.distance * Math.cos(ray.angle - this.__camera.angle);
      const wallHeight =
        (Map.TILE_SIZE / rayDistance) * this.__camera.projectionDistance;
      var wallPosition =
        this.__camera.height - this.__height / 2 - wallHeight / 2;
      wallPosition -= (rayDistance * this.__camera.tilt) / rayDistance;
      this.__texture.drawImageSlice(
        ctx,
        ray.textureOffset,
        column,
        wallPosition,
        1,
        wallHeight
      );
      const fillShade = rangeMap(
        rayDistance,
        0,
        this.__width,
        0,
        this.__wallShade
      );
      ctx.save();
      if (!ray.verticalHit) fillShade += 0.3;
      ctx.globalAlpha = fillShade;
      ctx.fillStyle = `rgb(0,0,0)`;
      ctx.fillRect(column, wallPosition, 1, wallHeight);
      ctx.restore();

      //draw floor
      /**
       *              |
       * _____________|_________0
       *              |  _ . *  |
       *           _ .|*        |
       *     _ . *              |
       * . : _________________[]|
       *
       */

      const renderStart = wallPosition + wallHeight;
      for (var y = renderStart; y < this.__height; y++) {
        const screenCenter = wallPosition + wallHeight / 2;
        //const beta = Math.abs(ray.angle - this.__camera.angle);
        const FloorProjectionRow = y - screenCenter;
        const projDist = this.__camera.projectionDistance;
        const beta = Math.abs(ray.angle - this.__camera.angle);
        const worldDistFromPlayer =
          (projDist * (Map.TILE_SIZE / 2)) / FloorProjectionRow;
        const rowActualDistance = Math.cos(beta) * worldDistFromPlayer;
        const pointX =
          this.__camera.position.x + Math.cos(ray.angle) * rowActualDistance;
        const pointY =
          this.__camera.position.y + Math.sin(ray.angle) * rowActualDistance;
        ctx.fillStyle = "yellow";
        // ctx.fillRect(
        //   pointX * this.__scale,
        //   pointY * this.__scale,
        //   1 * this.__scale,
        //   1 * this.__scale
        // );
        this.__floorTexture.putImageData(
          ctx,
          column,
          y,
          pointX % this.__floorTexture.__width,
          pointY % this.__floorTexture.__height,
          1,
          1
        );
      }
    }
  }

  addEntity(entity) {
    entity.color = entity.color || "grey";
    this.entities.push(entity);
  }
}
