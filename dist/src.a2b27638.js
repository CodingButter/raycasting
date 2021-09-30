// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/classes/utils/Emitter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Emitter = /*#__PURE__*/function () {
  function Emitter() {
    _classCallCheck(this, Emitter);

    this.events = {};
  }

  _createClass(Emitter, [{
    key: "on",
    value: function on(name, listener) {
      if (!this.events[name]) this.events[name] = [];
      this.events[name].push(listener);
      return listener;
    }
  }, {
    key: "emit",
    value: function emit(name, params) {
      this.events[name] && this.events[name].forEach(function (listener) {
        listener(params);
      });
    }
  }, {
    key: "remove",
    value: function remove(name, listenerToRemove) {
      if (!this.events[name]) throw new Error("".concat(name, " event doesn't exist"));
      if (!this.events[name][this.events[name].indexOf(listenerToRemove)]) throw new Error("".concat(name, " listener doesn't exist"));
      this.events[name] = this.events[name].filter(function (listener) {
        return listener !== listenerToRemove;
      });
    }
  }]);

  return Emitter;
}();

exports.default = Emitter;
},{}],"src/classes/GameLoop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Emitter = _interopRequireDefault(require("./utils/Emitter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var stopped = true;
var emitter = new _Emitter.default();

var GameLoop = /*#__PURE__*/function () {
  function GameLoop() {
    _classCallCheck(this, GameLoop);
  }

  _createClass(GameLoop, null, [{
    key: "start",
    value: function start() {
      stopped = false;
      var lastUpdate = Date.now();

      function update() {
        var now = Date.now();
        var dt = (now - lastUpdate) / 1000;
        lastUpdate = now;
        emitter.emit("update", dt);
        !stopped && setTimeout(function () {
          return update(dt);
        }, 30);
      }

      function draw() {
        emitter.emit("draw");
        !stopped && requestAnimationFrame(draw);
      }

      update(Date.now());
      requestAnimationFrame(draw);
    }
  }, {
    key: "pause",
    value: function pause() {
      stopped = true;
    }
  }, {
    key: "on",
    value: function on(name, listener) {
      return emitter.on(name, listener);
    }
  }, {
    key: "remove",
    value: function remove(name, listenerToRemove) {
      emitter.remove(name, listenerToRemove);
    }
  }]);

  return GameLoop;
}();

exports.default = GameLoop;
},{"./utils/Emitter":"src/classes/utils/Emitter.js"}],"src/classes/Handler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Handler = /*#__PURE__*/function () {
  function Handler(game) {
    _classCallCheck(this, Handler);

    this.__game = game;
  }

  _createClass(Handler, [{
    key: "getGame",
    value: function getGame() {
      return this.__game;
    }
  }]);

  return Handler;
}();

exports.default = Handler;
},{}],"src/classes/display/Canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Canvas = /*#__PURE__*/function () {
  function Canvas(width, height, parent) {
    _classCallCheck(this, Canvas);

    this.__width = width;
    this.__height = height;
    this.__parent = parent;
    this.__canvas = document.createElement("canvas");
    this.__canvas.width = width;
    this.__canvas.height = height;
    this.__canvas.style.width = "100%";
    this.__canvas.style.height = "100%";
    this.__ctx = this.__canvas.getContext("2d");

    this.__parent.appendChild(this.__canvas);
  } //Getters


  _createClass(Canvas, [{
    key: "getWidth",
    value: function getWidth() {
      return this.__width;
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      return this.__height;
    }
  }, {
    key: "getCanvas",
    value: function getCanvas() {
      return this.__canvas;
    }
  }, {
    key: "getContext",
    value: function getContext() {
      return this.__ctx;
    }
  }]);

  return Canvas;
}();

exports.default = Canvas;
},{}],"src/classes/utils/Math.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toRadians = toRadians;
exports.toDegrees = toDegrees;
exports.vectorDistance = vectorDistance;
exports.normalizeAngle = normalizeAngle;
exports.rangeMap = rangeMap;
exports.Vector = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function toRadians(degs) {
  return degs * (Math.PI / 180);
}

function toDegrees(rads) {
  return rads * (180 / Math.PI);
}

function vectorDistance(vector1, vector2) {
  var distX = vector1.x - vector2.x;
  var distY = vector1.y - vector2.y;
  return Math.sqrt(distX * distX + distY * distY);
}

function normalizeAngle(angle) {
  angle = angle % (2 * Math.PI);
  if (angle < 0) angle += 2 * Math.PI;
  return angle;
}

function rangeMap(n, start1, stop1, start2, stop2) {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}

var Vector = /*#__PURE__*/function () {
  function Vector() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Vector);

    this.__x = x;
    this.__y = y;
    this.__z = z;
  }

  _createClass(Vector, [{
    key: "x",
    get: function get() {
      return this.__x;
    },
    set: function set(val) {
      this.__x = val;
    }
  }, {
    key: "y",
    get: function get() {
      return this.__y;
    },
    set: function set(val) {
      this.__y = val;
    }
  }, {
    key: "z",
    get: function get() {
      return this.__z;
    },
    set: function set(val) {
      this.__z = val;
    }
  }, {
    key: "add",
    value: function add(vector) {
      return new Vector(this.__x + vector.x, this.__y + vector.y, this.__z + vector.z);
    }
  }, {
    key: "subtract",
    value: function subtract(vector) {
      return new Vector(this.__x - vector.x, this.__y - vector.y, this.__z - vector.z);
    }
  }, {
    key: "multiply",
    value: function multiply(vector) {
      return new Vector(this.__x * vector.x, this.__y * vector.y, this.__z * vector.z);
    }
  }, {
    key: "devide",
    value: function devide(vector) {
      return new Vector(this.__x / vector.x, this.__y / vector.y, this.__z / vector.z);
    }
  }]);

  return Vector;
}();

exports.Vector = Vector;
},{}],"src/classes/entities/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Math = require("../utils/Math");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Entity = /*#__PURE__*/function () {
  function Entity(handler, x, y) {
    var z = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var width = arguments.length > 4 ? arguments[4] : undefined;
    var height = arguments.length > 5 ? arguments[5] : undefined;
    var speed = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var angle = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    var color = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : "grey";

    _classCallCheck(this, Entity);

    this.__handler = handler;
    this.__position = new _Math.Vector(x, y, z);
    this.__width = width;
    this.__height = height;
    this.__angle = angle;
    this.__tilt = 0;
    this.__speed = speed;
    this.__direction = {
      walk: 0,
      strafe: 0
    };
  }

  _createClass(Entity, [{
    key: "moveX",
    value: function moveX(x) {
      this.__position.x += x;
    }
  }, {
    key: "moveY",
    value: function moveY(y) {
      this.__position.y += y;
    }
  }, {
    key: "move",
    value: function move(x, y, map) {
      if (!map.hasWallAt(this.__position.x + x, this.__position.y + y)) {
        this.moveX(x);
        this.moveY(y);
      }
    }
  }, {
    key: "update",
    value: function update(dt, map) {
      this.move(Math.cos(this.__angle) * this.__speed * this.direction.walk * dt || 0, Math.sin(this.__angle) * this.__speed * this.direction.walk * dt || 0, map);
      this.move(Math.cos(this.__angle + (0, _Math.toRadians)(90)) * this.__speed * this.direction.strafe * dt || 0, Math.sin(this.__angle + (0, _Math.toRadians)(90)) * this.__speed * this.direction.strafe * dt || 0, map);
    }
  }, {
    key: "position",
    get: function get() {
      return this.__position;
    },
    set: function set(val) {
      this.__position = val;
    }
  }, {
    key: "width",
    get: function get() {
      return this.__width;
    },
    set: function set(val) {
      this.__width = width;
    }
  }, {
    key: "height",
    get: function get() {
      return this.__height;
    },
    set: function set(val) {
      this.__height = height;
    }
  }, {
    key: "angle",
    get: function get() {
      return this.__angle;
    },
    set: function set(val) {
      this.__angle = val;
    }
  }, {
    key: "tilt",
    get: function get() {
      return this.__tilt;
    },
    set: function set(val) {
      this.__tilt = val;
      this.__tilt = this.__tilt;
      if (this.__tilt > 200) this.__tilt = 200;
      if (this.__tilt < -200) this.__tilt = -200;
    }
  }, {
    key: "direction",
    get: function get() {
      return this.__direction;
    },
    set: function set(val) {
      this.__direction = val;
    }
  }]);

  return Entity;
}();

exports.default = Entity;
},{"../utils/Math":"src/classes/utils/Math.js"}],"src/classes/entities/Player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Player = /*#__PURE__*/function (_Entity) {
  _inherits(Player, _Entity);

  var _super = _createSuper(Player);

  function Player(handler, x, y) {
    var z = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var width = arguments.length > 4 ? arguments[4] : undefined;
    var height = arguments.length > 5 ? arguments[5] : undefined;

    _classCallCheck(this, Player);

    return _super.call(this, handler, x, y, z, width, height, 100, 0, "blue");
  }

  return Player;
}(_index.default);

exports.Player = Player;
},{"./index":"src/classes/entities/index.js"}],"src/classes/renderers/Camera.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Math = require("../utils/Math");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Camera = /*#__PURE__*/function () {
  function Camera(x, y, z, width, height, fov, angle) {
    _classCallCheck(this, Camera);

    this.__position = new _Math.Vector(x, y, z);
    this.__fov = fov;
    this.__width = width;
    this.__height = height;
    this.__angle = angle;
    this.__tilt = 0;
    this.__projectionDistance = this.__width / 2 / Math.tan(this.__fov / 2);
  }

  _createClass(Camera, [{
    key: "followEntity",
    value: function followEntity(entity) {
      this.__position = entity.position;
      this.__angle = entity.angle;
      this.__tilt = entity.tilt;
    }
  }, {
    key: "updateFov",
    value: function updateFov(angle) {
      this.__fov = angle;
    }
  }, {
    key: "position",
    get: function get() {
      return this.__position;
    },
    set: function set(val) {
      this.__position = val;
    }
  }, {
    key: "angle",
    get: function get() {
      return this.__angle;
    },
    set: function set(deg) {
      this.__angle = deg;
    }
  }, {
    key: "tilt",
    get: function get() {
      return this.__tilt;
    }
  }, {
    key: "fov",
    get: function get() {
      return this.__fov;
    },
    set: function set(degs) {
      this.__fov = degs;
    }
  }, {
    key: "width",
    get: function get() {
      return this.__width;
    }
  }, {
    key: "height",
    get: function get() {
      return this.__height;
    }
  }, {
    key: "projectionDistance",
    get: function get() {
      return this.__projectionDistance;
    }
  }]);

  return Camera;
}();

exports.default = Camera;
},{"../utils/Math":"src/classes/utils/Math.js"}],"src/classes/controller/FPS.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _entities = _interopRequireDefault(require("../entities"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FPS = /*#__PURE__*/function () {
  function FPS(canvas) {
    var _this = this;

    _classCallCheck(this, FPS);

    this.__lastmouse = {
      x: 0,
      y: 0
    };
    this.__entity = new _entities.default(0, 0, 0, 0, 0);
    this.__canvas = canvas;
    this.__keys = {
      W: 0,
      S: 0,
      D: 0,
      A: 0
    };

    this.__canvas.addEventListener("mousemove", function (e) {
      return _this.rotateCamera(e);
    });

    document.addEventListener("keydown", function (e) {
      return _this.startMove(e);
    });
    document.addEventListener("keyup", function (e) {
      return _this.stopMove(e);
    });
    this.__canvas.requestPointerLock = this.__canvas.requestPointerLock || this.__canvas.mozRequestPointerLock;

    this.__canvas.addEventListener("click", function (e) {
      return _this.__click(e);
    });
  }

  _createClass(FPS, [{
    key: "__click",
    value: function __click(e) {
      this.__canvas.requestPointerLock();
    }
  }, {
    key: "attachEntity",
    value: function attachEntity(entity) {
      this.__entity = entity;
    }
  }, {
    key: "rotateCamera",
    value: function rotateCamera(_ref) {
      var movementX = _ref.movementX,
          movementY = _ref.movementY;
      this.__entity.angle += movementX / 1000;
      this.__entity.tilt += movementY;
    }
  }, {
    key: "startMove",
    value: function startMove(e) {
      this.__keys[String.fromCharCode(e.keyCode)] = 1;
      this.__entity.direction.walk = this.__keys["W"] - this.__keys["S"];
      this.__entity.direction.strafe = this.__keys["D"] - this.__keys["A"];
    }
  }, {
    key: "stopMove",
    value: function stopMove(e) {
      this.__keys[String.fromCharCode(e.keyCode)] = 0;
      this.__entity.direction.walk = this.__keys["W"] - this.__keys["S"];
      this.__entity.direction.strafe = this.__keys["D"] - this.__keys["A"];
    }
  }]);

  return FPS;
}();

exports.default = FPS;
},{"../entities":"src/classes/entities/index.js"}],"src/classes/Map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TILE_SIZE = 32;

var Map = /*#__PURE__*/function () {
  function Map() {
    _classCallCheck(this, Map);

    this.__grid = "\n11111111111111111111\n10000000000100000001\n10111111100000000001\n10100000111110000001\n10100000000000000001\n10100000000000000001\n10100101111000000001\n10100100001000000001\n10100100001000000001\n10100111111000000001\n10000000000000000001\n11111111111111111111".split("\n").map(function (row) {
      return row.split("");
    }).filter(function (row) {
      return row.length > 0;
    });
  }

  _createClass(Map, [{
    key: "columns",
    get: function get() {
      return this.__grid[0].length;
    }
  }, {
    key: "rows",
    get: function get() {
      return this.__grid.length;
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      return this.columns * Map.TILE_SIZE;
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      return this.rows * Map.TILE_SIZE;
    }
  }, {
    key: "grid",
    get: function get() {
      return this.__grid;
    }
  }, {
    key: "hasWallAt",
    value: function hasWallAt(x, y) {
      var column = Math.floor(x / Map.TILE_SIZE);
      var row = Math.floor(y / Map.TILE_SIZE);
      if (this.__grid[row][column] == 0) return false;
      return true;
    }
  }], [{
    key: "TILE_SIZE",
    get: function get() {
      return TILE_SIZE;
    }
  }]);

  return Map;
}();

exports.default = Map;
},{}],"src/classes/renderers/raycast/Ray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Map = _interopRequireDefault(require("../../Map"));

var _Math = require("../../utils/Math");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ray = /*#__PURE__*/function () {
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

      var yIntercept = Math.floor(this.__position.y / _Map.default.TILE_SIZE) * _Map.default.TILE_SIZE;

      yIntercept += this.__isRayFacingDown ? _Map.default.TILE_SIZE : 0;
      var xIntercept = this.__position.x + (yIntercept - this.__position.y) / Math.tan(this.__angle);
      var yStep = _Map.default.TILE_SIZE;
      yStep *= this.__isRayFacingUp ? -1 : 1;
      var xStep = _Map.default.TILE_SIZE / Math.tan(this.__angle);
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

      var xIntercept = Math.floor(this.__position.x / _Map.default.TILE_SIZE) * _Map.default.TILE_SIZE;

      xIntercept += this.__isRayFacingRight ? _Map.default.TILE_SIZE : 0;
      var yIntercept = this.__position.y + (xIntercept - this.__position.x) * Math.tan(this.__angle);
      var xStep = _Map.default.TILE_SIZE;
      xStep *= this.__isRayFacingLeft ? -1 : 1;
      var yStep = _Map.default.TILE_SIZE * Math.tan(this.__angle);
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
          this.__textureOffset = _Map.default.TILE_SIZE - (this.__position.y - Math.floor(this.__position.y / _Map.default.TILE_SIZE) * _Map.default.TILE_SIZE);
        } else {
          this.__textureOffset = this.__position.y - Math.floor(this.__position.y / _Map.default.TILE_SIZE) * _Map.default.TILE_SIZE;
        }
      } else {
        this.__position.x = horizontalWallHit.x;
        this.__position.y = horizontalWallHit.y;
        this.__distance = horizontalHitDistance;

        if (this.__isRayFacingDown) {
          this.__textureOffset = _Map.default.TILE_SIZE - (this.__position.x - Math.floor(this.__position.x / _Map.default.TILE_SIZE) * _Map.default.TILE_SIZE);
        } else {
          this.__textureOffset = this.__position.x - Math.floor(this.__position.x / _Map.default.TILE_SIZE) * _Map.default.TILE_SIZE;
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
    key: "tile",
    get: function get() {
      return this.__tile;
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

exports.default = Ray;
},{"../../Map":"src/classes/Map.js","../../utils/Math":"src/classes/utils/Math.js"}],"src/classes/renderers/2d/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Math = require("../../utils/Math");

var _Ray = _interopRequireDefault(require("../raycast/Ray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TwoD = /*#__PURE__*/function () {
  function TwoD(width, height, ctx, map, scale) {
    var configs = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

    _classCallCheck(this, TwoD);

    this.__scale = scale;
    this.__width = width;
    this.__height = height;
    this.__camerasize = 10;
    this.__ctx = ctx;
    this.__configs = configs;
    this.entities = [];
    this.__rays = [];
    this.__map = map;
  }

  _createClass(TwoD, [{
    key: "attachCamera",
    value: function attachCamera(camera) {
      this.__camera = camera;
    }
  }, {
    key: "changeConfig",
    value: function changeConfig(configs) {
      this.__configs = _objectSpread(_objectSpread({}, this.__configs), configs);
    }
  }, {
    key: "castAllRays",
    value: function castAllRays() {
      var rayAngle = this.__camera.angle - this.__camera.fov / 2;
      this.__rays = [];

      for (var i = 0; i < this.__camera.width; i++) {
        var ray = new _Ray.default(this.__width, this.__height, this.__camera.position, rayAngle, this.__map);
        ray.cast();

        this.__rays.push(ray);

        rayAngle += this.__camera.fov / this.__camera.width;
      }
    }
  }, {
    key: "render",
    value: function render(ctx) {
      var _this = this;

      this.castAllRays();
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, this.__map.getWidth() * this.__scale, this.__map.getHeight() * this.__scale);
      ctx.strokeStyle = this.__configs.strokeStyle || "";
      this.entities.forEach(function (entity) {
        ctx.fillStyle = entity.color;
        ctx.fillRect(entity.position.x * _this.__scale, entity.position.y * _this.__scale, entity.width * _this.__scale, entity.height * _this.__scale);
        ctx.strokeRect(entity.position.x * _this.__scale, entity.position.y * _this.__scale, entity.width * _this.__scale, entity.height * _this.__scale);
      });
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(this.__camera.position.x * this.__scale, this.__camera.position.y * this.__scale, this.__camerasize / 2 * this.__scale, 0, (0, _Math.toRadians)(360));
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.moveTo(this.__camera.position.x * this.__scale, this.__camera.position.y * this.__scale);
      ctx.lineTo((this.__camera.position.x + Math.cos(this.__camera.angle) * this.__camerasize) * this.__scale, (this.__camera.position.y + Math.sin(this.__camera.angle) * this.__camerasize) * this.__scale);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.stroke();
      ctx.restore();
    }
  }, {
    key: "addEntity",
    value: function addEntity(entity) {
      entity.color = entity.color || "grey";
      this.entities.push(entity);
    }
  }]);

  return TwoD;
}();

exports.default = TwoD;
},{"../../utils/Math":"src/classes/utils/Math.js","../raycast/Ray":"src/classes/renderers/raycast/Ray.js"}],"src/classes/renderers/raycast/Texture.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Map = _interopRequireDefault(require("../../Map"));

var _Math = require("../../utils/Math");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Texture = /*#__PURE__*/function () {
  function Texture(canvas) {
    _classCallCheck(this, Texture);

    this.__width = canvas.width;
    this.__height = canvas.height;
    this.__canvas = canvs;
    this.__imageData = canvas.getImageData(0, 0, width, height);
  }

  _createClass(Texture, [{
    key: "drawImageSlice",
    value: function drawImageSlice(ctx, textureOffset, x, y, w, h) {
      var sliceWidth = this.__width / _Map.default.TILE_SIZE;
      var sliceX = Math.floor(sliceWidth * textureOffset);
      ctx.drawImage(this.__canvas, sliceX, 0, 1, this.__height, x, y, w, h);
    }
  }, {
    key: "putImageData",
    value: function putImageData(ctx, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
      var data = this.__imageData.data;
      var height = this.__height;
      var width = this.__.width;
      dirtyX = dirtyX || 0;
      dirtyY = dirtyY || 0;
      dirtyWidth = dirtyWidth !== undefined ? dirtyWidth : width;
      dirtyHeight = dirtyHeight !== undefined ? dirtyHeight : height;
      var limitBottom = dirtyY + dirtyHeight;
      var limitRight = dirtyX + dirtyWidth;

      for (var y = dirtyY; y < limitBottom; y++) {
        for (var x = dirtyX; x < limitRight; x++) {
          var pos = y * width + x;
          ctx.fillStyle = "rgba(" + data[pos * 4 + 0] + "," + data[pos * 4 + 1] + "," + data[pos * 4 + 2] + "," + data[pos * 4 + 3] / 255 + ")";
          ctx.fillRect(x + dx, y + dy, 1, 1);
        }
      }
    }
  }]);

  return Texture;
}();

exports.default = Texture;
},{"../../Map":"src/classes/Map.js","../../utils/Math":"src/classes/utils/Math.js"}],"src/textures/checkerboard.jpg":[function(require,module,exports) {
module.exports = "/checkerboard.2165cef2.jpg";
},{}],"src/textures/grass.jpg":[function(require,module,exports) {
module.exports = "/grass.377c83e2.jpg";
},{}],"src/classes/graphics/ImageLoader.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ImageLoader = /*#__PURE__*/function () {
  function ImageLoader() {
    _classCallCheck(this, ImageLoader);
  }

  _createClass(ImageLoader, null, [{
    key: "loadImage",
    value: function () {
      var _loadImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return new Promise(function (resolve, reject) {
                  var image = new Image();

                  image.onload = function () {
                    var canvas = document.createElement("canvas");
                    canvas.width = image.width;
                    canvas.height = image.height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    resolve(canvas);
                  };

                  console.log(canvas);
                  image.src = path;
                });

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function loadImage(_x) {
        return _loadImage.apply(this, arguments);
      }

      return loadImage;
    }()
  }]);

  return ImageLoader;
}();

exports.default = ImageLoader;
},{}],"src/classes/renderers/raycast/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Math = require("../../utils/Math");

var _Ray = _interopRequireDefault(require("../raycast/Ray"));

var _Map = _interopRequireDefault(require("../../Map"));

var _Texture = _interopRequireDefault(require("./Texture"));

var _checkerboard = _interopRequireDefault(require("../../../textures/checkerboard.jpg"));

var _grass = _interopRequireDefault(require("../../../textures/grass.jpg"));

var _ImageLoader = _interopRequireDefault(require("../../graphics/ImageLoader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RayCast = /*#__PURE__*/function () {
  function RayCast(width, height, ctx, map, scale) {
    var configs = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

    _classCallCheck(this, RayCast);

    this.__width = width;
    this.__height = height;
    this.__camerasize = 10;
    this.__ctx = ctx;
    this.__configs = configs;
    this.entities = [];
    this.__rays = [];
    this.__scale = scale;
    this.__map = map;
    this.__wallShade = 0.7; //const grass = ImageLoader.loadImage(texture);

    this.__loaded = false;
    this.addImages();
  }

  _createClass(RayCast, [{
    key: "addImages",
    value: function () {
      var _addImages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var grass;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _ImageLoader.default.loadImage(_grass.default);

              case 2:
                grass = _context.sent;
                this.__floorTexture = new _Texture.default(grass);
                this.__texture = new _Texture.default(grass);
                this.__loaded = true;

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addImages() {
        return _addImages.apply(this, arguments);
      }

      return addImages;
    }()
  }, {
    key: "attachCamera",
    value: function attachCamera(camera) {
      this.__camera = camera;
    }
  }, {
    key: "changeConfig",
    value: function changeConfig(configs) {
      this.__configs = _objectSpread(_objectSpread({}, this.__configs), configs);
    }
  }, {
    key: "castAllRays",
    value: function castAllRays() {
      this.__rays = [];

      for (var i = 0; i < this.__camera.width; i++) {
        var rayAngle = this.__camera.angle + Math.atan((i - this.__camera.width / 2) / this.__camera.projectionDistance);
        var ray = new _Ray.default(this.__width, this.__height, this.__camera.position, rayAngle, this.__map);
        ray.cast();

        this.__rays.push(ray);
      }
    }
  }, {
    key: "render",
    value: function render(ctx) {
      if (!this.__loaded) return;
      var gradient = ctx.createLinearGradient(0, 0, 0, this.__height); // Add three color stops

      var multiplier = this.__camera.tilt / 10;
      var rgbval = 180 - multiplier;
      var rgb = "rgb(".concat(rgbval, ",").concat(rgbval, ",").concat(rgbval, ")");
      gradient.addColorStop(0, rgb);
      gradient.addColorStop(0.5 - this.__camera.tilt / 650, "#222222");
      gradient.addColorStop(1, rgb); // Set the fill style and draw a rectangle

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.__width, this.__height);
      this.castAllRays();

      for (var column = 0; column < this.__rays.length; column++) {
        // for (
        //   var column = Math.floor(this.__width / 2);
        //   column < Math.floor(this.__width / 2) + 1;
        //   column++
        // ) {
        var ray = this.__rays[column];
        var rayDistance = ray.distance * Math.cos(ray.angle - this.__camera.angle);
        var wallHeight = _Map.default.TILE_SIZE / rayDistance * this.__camera.projectionDistance;
        var wallPosition = this.__camera.height - this.__height / 2 - wallHeight / 2;
        wallPosition -= rayDistance * this.__camera.tilt / rayDistance;

        this.__texture.drawImageSlice(ctx, ray.textureOffset, column, wallPosition, 1, wallHeight);

        var fillShade = (0, _Math.rangeMap)(rayDistance, 0, this.__width, 0, this.__wallShade);
        ctx.save();
        if (!ray.verticalHit) fillShade += 0.3;
        ctx.globalAlpha = fillShade;
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(column, wallPosition, 1, wallHeight);
        ctx.restore(); //draw floor

        /**
         *              |
         * _____________|_________0
         *              |  _ . *  |
         *           _ .|*        |
         *     _ . *              |
         * . : _________________[]|
         *
         */

        var renderStart = wallPosition + wallHeight;

        for (var y = renderStart; y < this.__height; y++) {
          var screenCenter = wallPosition + wallHeight / 2; //const beta = Math.abs(ray.angle - this.__camera.angle);

          var FloorProjectionRow = y - screenCenter;
          var projDist = this.__camera.projectionDistance;
          var beta = Math.abs(ray.angle - this.__camera.angle);
          var worldDistFromPlayer = projDist * (_Map.default.TILE_SIZE / 2) / FloorProjectionRow;
          var rowActualDistance = Math.cos(beta) * worldDistFromPlayer;
          var pointX = this.__camera.position.x + Math.cos(ray.angle) * rowActualDistance;
          var pointY = this.__camera.position.y + Math.sin(ray.angle) * rowActualDistance;
          ctx.fillStyle = "yellow"; // ctx.fillRect(
          //   pointX * this.__scale,
          //   pointY * this.__scale,
          //   1 * this.__scale,
          //   1 * this.__scale
          // );

          this.__floorTexture.putImageData(ctx, column, y, pointX % this.__floorTexture.__width, pointY % this.__floorTexture.__height, 1, 1);
        }
      }
    }
  }, {
    key: "addEntity",
    value: function addEntity(entity) {
      entity.color = entity.color || "grey";
      this.entities.push(entity);
    }
  }]);

  return RayCast;
}();

exports.default = RayCast;
},{"../../utils/Math":"src/classes/utils/Math.js","../raycast/Ray":"src/classes/renderers/raycast/Ray.js","../../Map":"src/classes/Map.js","./Texture":"src/classes/renderers/raycast/Texture.js","../../../textures/checkerboard.jpg":"src/textures/checkerboard.jpg","../../../textures/grass.jpg":"src/textures/grass.jpg","../../graphics/ImageLoader":"src/classes/graphics/ImageLoader.js"}],"src/classes/states/GameState.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _entities = _interopRequireDefault(require("../entities"));

var _Player = require("../entities/Player");

var _Camera = _interopRequireDefault(require("../renderers/Camera"));

var _FPS = _interopRequireDefault(require("../controller/FPS"));

var _d = _interopRequireDefault(require("../renderers/2d"));

var _raycast = _interopRequireDefault(require("../renderers/raycast"));

var _Map = _interopRequireDefault(require("../Map"));

var _Math = require("../utils/Math");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameState = /*#__PURE__*/function () {
  function GameState(handler) {
    _classCallCheck(this, GameState);

    this.__handler = handler;
    this.setup();
  }

  _createClass(GameState, [{
    key: "setup",
    value: function setup() {
      var _this = this;

      this.__scale = 0.3;
      this.__fov = (0, _Math.toRadians)(60);
      this.__map = new _Map.default();
      this.__player = new _Player.Player(this.__handler, this.__handler.getGame().width / 2, this.__handler.getGame().height / 2 + 25, 0, 10, 10);
      this.__camera = new _Camera.default(0, 0, 0, this.__handler.getGame().width, this.__handler.getGame().height, this.__fov, 0);
      this.__controller = new _FPS.default(this.__handler.getGame().canvas.getCanvas());
      var renderConfigs = {
        stroke: "2px",
        strokeColor: "black"
      };

      this.__controller.attachEntity(this.__player);

      this.__minimapRenderer = new _d.default(this.__handler.getGame().width, this.__handler.getGame().height, this.__ctx, this.__map, this.__scale, renderConfigs);

      this.__minimapRenderer.attachCamera(this.__camera);

      this.__raycastRenderer = new _raycast.default(this.__handler.getGame().width, this.__handler.getGame().height, this.__ctx, this.__map, this.__scale, renderConfigs);

      this.__raycastRenderer.attachCamera(this.__camera);

      this.__map.grid.forEach(function (columns, rowIndex) {
        columns.map(function (wall, columnIndex) {
          if (wall == 1) {
            var entity = new _entities.default(_this.__handler, columnIndex * _Map.default.TILE_SIZE, rowIndex * _Map.default.TILE_SIZE, 0, _Map.default.TILE_SIZE, _Map.default.TILE_SIZE, "blue");

            _this.__minimapRenderer.addEntity(entity);

            _this.__raycastRenderer.addEntity(entity);
          }
        });
      });

      this.__camera.followEntity(this.__player);
    }
  }, {
    key: "update",
    value: function update(dt) {
      this.__player.update(dt, this.__map);

      this.__camera.followEntity(this.__player);
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      this.__raycastRenderer.render(ctx); //this.__minimapRenderer.render(ctx);

    }
  }, {
    key: "map",
    get: function get() {
      return this.__map;
    }
  }]);

  return GameState;
}();

exports.default = GameState;
},{"../entities":"src/classes/entities/index.js","../entities/Player":"src/classes/entities/Player.js","../renderers/Camera":"src/classes/renderers/Camera.js","../controller/FPS":"src/classes/controller/FPS.js","../renderers/2d":"src/classes/renderers/2d/index.js","../renderers/raycast":"src/classes/renderers/raycast/index.js","../Map":"src/classes/Map.js","../utils/Math":"src/classes/utils/Math.js"}],"src/classes/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GameLoop = _interopRequireDefault(require("./GameLoop"));

var _Handler = _interopRequireDefault(require("./Handler"));

var _Canvas = _interopRequireDefault(require("./display/Canvas"));

var _GameState = _interopRequireDefault(require("./states/GameState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game = /*#__PURE__*/function () {
  function Game(app, width, height) {
    _classCallCheck(this, Game);

    this.__handler = new _Handler.default(this);
    this.__width = width;
    this.__height = height;
    this.__fov = 30;
    this.__canvas = new _Canvas.default(width, height, app);
    this.__ctx = this.__canvas.getContext();
    this.__handler = new _Handler.default(this);
    this.__state = new _GameState.default(this.__handler);
  }

  _createClass(Game, [{
    key: "run",
    value: function run() {
      var _this = this;

      _GameLoop.default.start();

      _GameLoop.default.on("update", function (dt) {
        return _this.update(dt);
      });

      _GameLoop.default.on("draw", function () {
        return _this.draw();
      });
    }
  }, {
    key: "update",
    value: function update(dt) {
      this.__state.update(dt);
    }
  }, {
    key: "draw",
    value: function draw() {
      this.__ctx.clearRect(0, 0, this.__width, this.__height);

      this.__state.draw(this.__ctx);
    }
  }, {
    key: "canvas",
    get: function get() {
      return this.__canvas;
    }
  }, {
    key: "width",
    get: function get() {
      return this.__width;
    }
  }, {
    key: "height",
    get: function get() {
      return this.__height;
    }
  }, {
    key: "state",
    get: function get() {
      return this.__state;
    }
  }]);

  return Game;
}();

exports.default = Game;
},{"./GameLoop":"src/classes/GameLoop.js","./Handler":"src/classes/Handler.js","./display/Canvas":"src/classes/display/Canvas.js","./states/GameState":"src/classes/states/GameState.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

var _Game = _interopRequireDefault(require("./classes/Game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolution = {
  width: 380,
  height: 200
};
var appElement = document.getElementById("app");
var game = new _Game.default(appElement, resolution.width, resolution.height);
game.run();
},{"./styles.css":"src/styles.css","./classes/Game":"src/classes/Game.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52079" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map