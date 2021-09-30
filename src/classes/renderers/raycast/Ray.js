import Map from "../../Map";
import { Vector, normalizeAngle, vectorDistance } from "../../utils/Math";

export default class Ray {
  constructor(width, height, { x, y }, angle, map) {
    this.__wasHitVertical = false;
    this.__width = width;
    this.__height = height;
    this.__position = new Vector(x, y);
    this.__angle = normalizeAngle(angle);
    this.__map = map;
    this.__distance = 0;
    this.__wallHitX = 0;
    this.__wallHitY = 0;
    this.__tile = 0;
    this.__textureOffset = 0;
    this.__isRayFacingDown = this.__angle > 0 && this.__angle < Math.PI;
    this.__isRayFacingUp = !this.__isRayFacingDown;
    this.__isRayFacingRight =
      this.__angle < 0.5 * Math.PI || this.__angle > 1.5 * Math.PI;
    this.__isRayFacingLeft = !this.__isRayFacingRight;
  }

  cast() {
    ///////////////////////////////////////////////////////
    // HORIZONTAL RAY-GRID INTERSECTION CODE
    ///////////////////////////////////////////////////////
    var foundHorizontalWallHit = false;
    var horizontalWallHit = new Vector(0, 0);
    var yIntercept =
      Math.floor(this.__position.y / Map.TILE_SIZE) * Map.TILE_SIZE;
    yIntercept += this.__isRayFacingDown ? Map.TILE_SIZE : 0;
    var xIntercept =
      this.__position.x +
      (yIntercept - this.__position.y) / Math.tan(this.__angle);
    var yStep = Map.TILE_SIZE;
    yStep *= this.__isRayFacingUp ? -1 : 1;
    var xStep = Map.TILE_SIZE / Math.tan(this.__angle);
    xStep *= this.__isRayFacingLeft && xStep > 0 ? -1 : 1;
    xStep *= this.__isRayFacingRight && xStep < 0 ? -1 : 1;

    var nextHorizontalTouchX = xIntercept;
    var nextHorizontalTouchY = yIntercept;
    // if (this.__isRayFacingUp) console.log("FacingUp");
    //Increment xstep and ystep until we find a wall
    while (
      nextHorizontalTouchX > 0 &&
      nextHorizontalTouchX < this.__map.getWidth() &&
      nextHorizontalTouchY > 0 &&
      nextHorizontalTouchY < this.__map.getHeight()
    ) {
      if (
        this.__map.hasWallAt(
          nextHorizontalTouchX,
          nextHorizontalTouchY - (this.__isRayFacingUp ? 1 : 0)
        )
      ) {
        foundHorizontalWallHit = true;
        var horizontalWallHit = new Vector(
          nextHorizontalTouchX,
          nextHorizontalTouchY
        );
        break;
      } else {
        nextHorizontalTouchX += xStep;
        nextHorizontalTouchY += yStep;
      }
    }

    ///////////////////////////////////////////////////////
    // VERTICAL RAY-GRID INTERSECTION CODE
    ///////////////////////////////////////////////////////
    var foundVerticalWallHit = false;
    var verticalWallHit = new Vector(0, 0);
    var xIntercept =
      Math.floor(this.__position.x / Map.TILE_SIZE) * Map.TILE_SIZE;
    xIntercept += this.__isRayFacingRight ? Map.TILE_SIZE : 0;
    var yIntercept =
      this.__position.y +
      (xIntercept - this.__position.x) * Math.tan(this.__angle);
    var xStep = Map.TILE_SIZE;
    xStep *= this.__isRayFacingLeft ? -1 : 1;
    var yStep = Map.TILE_SIZE * Math.tan(this.__angle);
    yStep *= this.__isRayFacingUp && yStep > 0 ? -1 : 1;
    yStep *= this.__isRayFacingDown && yStep < 0 ? -1 : 1;

    var nextVerticalTouchX = xIntercept;
    var nextVerticalTouchY = yIntercept;

    //Increment xstep and ystep until we find a wall
    while (
      nextVerticalTouchX > 0 &&
      nextVerticalTouchX < this.__map.getWidth() &&
      nextVerticalTouchY > 0 &&
      nextVerticalTouchY < this.__map.getHeight()
    ) {
      if (
        this.__map.hasWallAt(
          nextVerticalTouchX - (this.__isRayFacingLeft ? 1 : 0),
          nextVerticalTouchY
        )
      ) {
        foundVerticalWallHit = true;
        verticalWallHit = new Vector(nextVerticalTouchX, nextVerticalTouchY);
        break;
      } else {
        nextVerticalTouchX += xStep;
        nextVerticalTouchY += yStep;
      }
    }

    const horizontalHitDistance = foundHorizontalWallHit
      ? vectorDistance(this.__position, horizontalWallHit)
      : Number.MAX_VALUE;
    const verticalHitDistance = foundVerticalWallHit
      ? vectorDistance(this.__position, verticalWallHit)
      : Number.MAX_VALUE;

    if (verticalHitDistance < horizontalHitDistance) {
      this.__position.x = verticalWallHit.x;
      this.__position.y = verticalWallHit.y;
      this.__distance = verticalHitDistance;
      this.__wasHitVertical = true;
      if (this.__isRayFacingLeft) {
        this.__textureOffset =
          Map.TILE_SIZE -
          (this.__position.y -
            Math.floor(this.__position.y / Map.TILE_SIZE) * Map.TILE_SIZE);
      } else {
        this.__textureOffset =
          this.__position.y -
          Math.floor(this.__position.y / Map.TILE_SIZE) * Map.TILE_SIZE;
      }
    } else {
      this.__position.x = horizontalWallHit.x;
      this.__position.y = horizontalWallHit.y;
      this.__distance = horizontalHitDistance;
      if (this.__isRayFacingDown) {
        this.__textureOffset =
          Map.TILE_SIZE -
          (this.__position.x -
            Math.floor(this.__position.x / Map.TILE_SIZE) * Map.TILE_SIZE);
      } else {
        this.__textureOffset =
          this.__position.x -
          Math.floor(this.__position.x / Map.TILE_SIZE) * Map.TILE_SIZE;
      }
    }
  }
  get distance() {
    return this.__distance;
  }
  get position() {
    return this.__position;
  }
  get angle() {
    return this.__angle;
  }
  get verticalHit() {
    return this.__wasHitVertical;
  }
  get tile() {
    return this.__tile;
  }
  get textureOffset() {
    return this.__textureOffset;
  }
  get facingDown() {
    return this.__isRayFacingDown;
  }
  get facingUp() {
    return this.__isRayFacingUp;
  }
  get facingLeft() {
    return this.__isRayFacingLeft;
  }
  get facingRight() {
    return this.__isRayFacingRight;
  }
}
