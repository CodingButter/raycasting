"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Map = _interopRequireDefault(require("../../Map"));

var _Math = require("../../utils/Math");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ray =
/*#__PURE__*/
function () {
  function Ray(width, height, _ref, angle, map) {
    var x = _ref.x,
        y = _ref.y;

    _classCallCheck(this, Ray);

    this.__wasHitVertical = false;
    this.__width = width;
    this.__height = height;
    this.__position = new _Math.Vector(x, y);
    this.__angle = (0, _Math.normalizeAngle)(angle);
    this.__map = map;
    this.__distance = 0;
    this.__wallHitX = 0;
    this.__wallHitY = 0;
    this.__tile = 0;
    this.__textureOffset = 0;
    this.__isRayFacingDown = this.__angle > 0 && this.__angle < Math.PI;
    this.__isRayFacingUp = !this.__isRayFacingDown;
    this.__isRayFacingRight = this.__angle < 0.5 * Math.PI || this.__angle > 1.5 * Math.PI;
    this.__isRayFacingLeft = !this.__isRayFacingRight;
  }

  _createClass(Ray, [{
    key: "cast",
    value: function cast() {
      ///////////////////////////////////////////////////////
      // HORIZONTAL RAY-GRID INTERSECTION CODE
      ///////////////////////////////////////////////////////
      var foundHorizontalWallHit = false;
      var horizontalWallHit = new _Math.Vector(0, 0);

      var yIntercept = Math.floor(this.__position.y / _Map["default"].TILE_SIZE) * _Map["default"].TILE_SIZE;

      yIntercept += this.__isRayFacingDown ? _Map["default"].TILE_SIZE : 0;
      var xIntercept = this.__position.x + (yIntercept - this.__position.y) / Math.tan(this.__angle);
      var yStep = _Map["default"].TILE_SIZE;
      yStep *= this.__isRayFacingUp ? -1 : 1;
      var xStep = _Map["default"].TILE_SIZE / Math.tan(this.__angle);
      xStep *= this.__isRayFacingLeft && xStep > 0 ? -1 : 1;
      xStep *= this.__isRayFacingRight && xStep < 0 ? -1 : 1;
      var nextHorizontalTouchX = xIntercept;
      var nextHorizontalTouchY = yIntercept; // if (this.__isRayFacingUp) console.log("FacingUp");
      //Increment xstep and ystep until we find a wall

      while (nextHorizontalTouchX > 0 && nextHorizontalTouchX < this.__map.getWidth() && nextHorizontalTouchY > 0 && nextHorizontalTouchY < this.__map.getHeight()) {
        if (this.__map.hasWallAt(nextHorizontalTouchX, nextHorizontalTouchY - (this.__isRayFacingUp ? 1 : 0))) {
          foundHorizontalWallHit = true;
          var horizontalWallHit = new _Math.Vector(nextHorizontalTouchX, nextHorizontalTouchY);
          break;
        } else {
          nextHorizontalTouchX += xStep;
          nextHorizontalTouchY += yStep;
        }
      } ///////////////////////////////////////////////////////
      // VERTICAL RAY-GRID INTERSECTION CODE
      ///////////////////////////////////////////////////////


      var foundVerticalWallHit = false;
      var verticalWallHit = new _Math.Vector(0, 0);

      var xIntercept = Math.floor(this.__position.x / _Map["default"].TILE_SIZE) * _Map["default"].TILE_SIZE;

      xIntercept += this.__isRayFacingRight ? _Map["default"].TILE_SIZE : 0;
      var yIntercept = this.__position.y + (xIntercept - this.__position.x) * Math.tan(this.__angle);
      var xStep = _Map["default"].TILE_SIZE;
      xStep *= this.__isRayFacingLeft ? -1 : 1;
      var yStep = _Map["default"].TILE_SIZE * Math.tan(this.__angle);
      yStep *= this.__isRayFacingUp && yStep > 0 ? -1 : 1;
      yStep *= this.__isRayFacingDown && yStep < 0 ? -1 : 1;
      var nextVerticalTouchX = xIntercept;
      var nextVerticalTouchY = yIntercept; //Increment xstep and ystep until we find a wall

      while (nextVerticalTouchX > 0 && nextVerticalTouchX < this.__map.getWidth() && nextVerticalTouchY > 0 && nextVerticalTouchY < this.__map.getHeight()) {
        if (this.__map.hasWallAt(nextVerticalTouchX - (this.__isRayFacingLeft ? 1 : 0), nextVerticalTouchY)) {
          foundVerticalWallHit = true;
          verticalWallHit = new _Math.Vector(nextVerticalTouchX, nextVerticalTouchY);
          break;
        } else {
          nextVerticalTouchX += xStep;
          nextVerticalTouchY += yStep;
        }
      }

      var horizontalHitDistance = foundHorizontalWallHit ? (0, _Math.vectorDistance)(this.__position, horizontalWallHit) : Number.MAX_VALUE;
      var verticalHitDistance = foundVerticalWallHit ? (0, _Math.vectorDistance)(this.__position, verticalWallHit) : Number.MAX_VALUE;

      if (verticalHitDistance < horizontalHitDistance) {
        this.__position.x = verticalWallHit.x;
        this.__position.y = verticalWallHit.y;
        this.__distance = verticalHitDistance;
        this.__wasHitVertical = true;

        if (this.__isRayFacingLeft) {
          this.__textureOffset = _Map["default"].TILE_SIZE - (this.__position.y - Math.floor(this.__position.y / _Map["default"].TILE_SIZE) * _Map["default"].TILE_SIZE);
        } else {
          this.__textureOffset = this.__position.y - Math.floor(this.__position.y / _Map["default"].TILE_SIZE) * _Map["default"].TILE_SIZE;
        }
      } else {
        this.__position.x = horizontalWallHit.x;
        this.__position.y = horizontalWallHit.y;
        this.__distance = horizontalHitDistance;

        if (this.__isRayFacingDown) {
          this.__textureOffset = _Map["default"].TILE_SIZE - (this.__position.x - Math.floor(this.__position.x / _Map["default"].TILE_SIZE) * _Map["default"].TILE_SIZE);
        } else {
          this.__textureOffset = this.__position.x - Math.floor(this.__position.x / _Map["default"].TILE_SIZE) * _Map["default"].TILE_SIZE;
        }
      }
    }
  }, {
    key: "distance",
    get: function get() {
      return this.__distance;
    }
  }, {
    key: "position",
    get: function get() {
      return this.__position;
    }
  }, {
    key: "angle",
    get: function get() {
      return this.__angle;
    }
  }, {
    key: "verticalHit",
    get: function get() {
      return this.__wasHitVertical;
    }
  }, {
    key: "column",
    get: function get() {
      var column = Math.floor(this.__position.x / _Map["default"].TILE_SIZE);
      if (this.__isRayFacingDown) return column - 1;
      return column;
    }
  }, {
    key: "row",
    get: function get() {
      var row = Math.floor(this.__position.y / _Map["default"].TILE_SIZE);
      if (this.__isRayFacingLeft) return row - 1;
      return row;
    }
  }, {
    key: "textureOffset",
    get: function get() {
      return this.__textureOffset;
    }
  }, {
    key: "facingDown",
    get: function get() {
      return this.__isRayFacingDown;
    }
  }, {
    key: "facingUp",
    get: function get() {
      return this.__isRayFacingUp;
    }
  }, {
    key: "facingLeft",
    get: function get() {
      return this.__isRayFacingLeft;
    }
  }, {
    key: "facingRight",
    get: function get() {
      return this.__isRayFacingRight;
    }
  }]);

  return Ray;
}();

exports["default"] = Ray;