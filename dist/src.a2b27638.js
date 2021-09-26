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
},{}],"src/classes/utils/Math.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toRadians = toRadians;
exports.toDegrees = toDegrees;
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
},{}],"src/classes/renderers/Camera.js":[function(require,module,exports) {
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
    this.__angle = (0, _Math.toRadians)(angle);
  }

  _createClass(Camera, [{
    key: "followEntity",
    value: function followEntity(entity) {
      this.__position = entity.position;
      this.__angle = entity.angle;
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
      this.__angle = (0, _Math.toRadians)(deg);
    }
  }, {
    key: "fov",
    get: function get() {
      return (0, _Math.toDegrees)(this.__fov);
    },
    set: function set(degs) {
      this.__fov = (0, _Math.toRadians)(degs);
    }
  }]);

  return Camera;
}();

exports.default = Camera;
},{"../utils/Math":"src/classes/utils/Math.js"}],"src/classes/Canvas.js":[function(require,module,exports) {
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
    this.__speed = speed;
    this.__direction = {
      forward: false,
      backward: false,
      left: false,
      right: false
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
      if (this.__direction.forward) {
        this.move(Math.cos(this.__angle) * this.__speed * dt, Math.sin(this.__angle) * this.__speed * dt, map);
      }

      if (this.direction.backward) {
        this.move(Math.cos(this.__angle) * -this.__speed * dt, Math.sin(this.__angle) * -this.__speed * dt, map);
      }

      if (this.direction.left) {
        this.move(Math.cos(this.__angle + (0, _Math.toRadians)(90)) * -this.__speed * dt, Math.sin(this.__angle + (0, _Math.toRadians)(90)) * -this.__speed * dt, map);
      }

      if (this.direction.right) {
        this.move(Math.cos(this.__angle + (0, _Math.toRadians)(90)) * this.__speed * dt, Math.sin(this.__angle + (0, _Math.toRadians)(90)) * this.__speed * dt, map);
      }
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

    return _super.call(this, handler, x, y, z, width, height, 45, 0, "blue");
  }

  return Player;
}(_index.default);

exports.Player = Player;
},{"./index":"src/classes/entities/index.js"}],"src/classes/controller/FPS.js":[function(require,module,exports) {
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
    this.__keys = [];

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
      var movementX = _ref.movementX;
      this.__lastmouse.x += movementX;
      this.__entity.angle += movementX / 1000;
    }
  }, {
    key: "startMove",
    value: function startMove(e) {
      if (String.fromCharCode(e.keyCode) === "W") {
        this.__entity.direction.forward = true;
      }

      if (String.fromCharCode(e.keyCode) === "S") {
        this.__entity.direction.backward = true;
      }

      if (String.fromCharCode(e.keyCode) === "A") {
        this.__entity.direction.left = true;
      }

      if (String.fromCharCode(e.keyCode) === "D") {
        this.__entity.direction.right = true;
      }
    }
  }, {
    key: "stopMove",
    value: function stopMove(e) {
      if (String.fromCharCode(e.keyCode) === "W") {
        this.__entity.direction.forward = false;
      }

      if (String.fromCharCode(e.keyCode) === "S") {
        this.__entity.direction.backward = false;
      }

      if (String.fromCharCode(e.keyCode) === "A") {
        this.__entity.direction.left = false;
      }

      if (String.fromCharCode(e.keyCode) === "D") {
        this.__entity.direction.right = false;
      }
    }
  }]);

  return FPS;
}();

exports.default = FPS;
},{"../entities":"src/classes/entities/index.js"}],"src/classes/renderers/2d/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Math = require("../../utils/Math");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TwoD = /*#__PURE__*/function () {
  function TwoD(width, height, camera, ctx) {
    var configs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    _classCallCheck(this, TwoD);

    this.__width = width;
    this.__height = height;
    this.__camera = camera;
    this.__camerasize = 10;
    this.__ctx = ctx;
    this.__configs = configs;
    this.entities = [];
  }

  _createClass(TwoD, [{
    key: "changeConfig",
    value: function changeConfig(configs) {
      this.__configs = _objectSpread(_objectSpread({}, this.__configs), configs);
    }
  }, {
    key: "render",
    value: function render() {
      var ctx = this.__ctx;
      ctx.strokeStyle = this.__configs.strokeStyle || "";
      this.entities.forEach(function (entity) {
        ctx.fillStyle = entity.color;
        ctx.fillRect(entity.position.x, entity.position.y, entity.width, entity.height);
        ctx.strokeRect(entity.position.x, entity.position.y, entity.width, entity.height);
      });
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(this.__camera.position.x, this.__camera.position.y, this.__camerasize / 2, 0, (0, _Math.toRadians)(360));
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.moveTo(this.__camera.position.x, this.__camera.position.y);
      ctx.lineTo(this.__camera.position.x + Math.cos(this.__camera.angle) * this.__camerasize, this.__camera.position.y + Math.sin(this.__camera.angle) * this.__camerasize);
      ctx.stroke();
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
},{"../../utils/Math":"src/classes/utils/Math.js"}],"src/classes/Map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TILE_SIZE = 16;

var Map = /*#__PURE__*/function () {
  function Map() {
    _classCallCheck(this, Map);

    this.__grid = "\n1111111111111111\n1000000000010001\n1000011110000001\n1000000010011001\n1000000000000001\n1000000000000001\n1111111111111111".split("\n").map(function (row) {
      return row.split("");
    }).filter(function (row) {
      return row.length > 0;
    });
    console.log(this.__grid);
  }

  _createClass(Map, [{
    key: "width",
    get: function get() {
      return this.__grid[0].length;
    }
  }, {
    key: "height",
    get: function get() {
      return this.__grid.length;
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
      console.log({
        column: column,
        row: row
      });
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
},{}],"src/classes/state/GameState.js":[function(require,module,exports) {
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

var _Map = _interopRequireDefault(require("../Map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameState = /*#__PURE__*/function () {
  function GameState(handler) {
    _classCallCheck(this, GameState);

    this.__handler = handler;
    this.__ctx = this.__handler.getGame().canvas.getContext();
    this.__player = new _Player.Player(this.__handler, this.__handler.getGame().width / 2, this.__handler.getGame().height / 2 - 50, 0, 10, 10);
    this.__camera = new _Camera.default(0, 0, 0, this.__width, this.__height, this.__fov, 0);
    this.__controller = new _FPS.default(this.__handler.getGame().canvas.getCanvas());
    this.__renderer = new _d.default(this.__width, this.__height, this.__camera, this.__ctx);

    this.__renderer.changeConfig({
      stroke: "2px",
      strokeColor: "black"
    });

    this.setup();
  }

  _createClass(GameState, [{
    key: "setup",
    value: function setup() {
      var _this = this;

      this.__controller.attachEntity(this.__player);

      this.__map = new _Map.default();

      this.__map.grid.forEach(function (columns, rowIndex) {
        columns.map(function (wall, columnIndex) {
          if (wall == 1) {
            var entity = new _entities.default(_this.__handler, columnIndex * _Map.default.TILE_SIZE, rowIndex * _Map.default.TILE_SIZE, 0, _Map.default.TILE_SIZE, _Map.default.TILE_SIZE, "blue");

            _this.__renderer.addEntity(entity);
          }
        });
      });
    }
  }, {
    key: "update",
    value: function update(dt) {
      this.__player.update(dt, this.__map);

      this.__camera.followEntity(this.__player);
    }
  }, {
    key: "draw",
    value: function draw() {
      this.__renderer.render();
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
},{"../entities":"src/classes/entities/index.js","../entities/Player":"src/classes/entities/Player.js","../renderers/Camera":"src/classes/renderers/Camera.js","../controller/FPS":"src/classes/controller/FPS.js","../renderers/2d":"src/classes/renderers/2d/index.js","../Map":"src/classes/Map.js"}],"src/classes/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GameLoop = _interopRequireDefault(require("./GameLoop"));

var _Handler = _interopRequireDefault(require("./Handler"));

var _Camera = _interopRequireDefault(require("./renderers/Camera"));

var _Canvas = _interopRequireDefault(require("./Canvas"));

var _GameState = _interopRequireDefault(require("./state/GameState"));

var _d = _interopRequireDefault(require("./renderers/2d"));

var _FPS = _interopRequireDefault(require("./controller/FPS"));

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
    this.__fov = 60;
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

      this.__state.draw();
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
},{"./GameLoop":"src/classes/GameLoop.js","./Handler":"src/classes/Handler.js","./renderers/Camera":"src/classes/renderers/Camera.js","./Canvas":"src/classes/Canvas.js","./state/GameState":"src/classes/state/GameState.js","./renderers/2d":"src/classes/renderers/2d/index.js","./controller/FPS":"src/classes/controller/FPS.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

var _Game = _interopRequireDefault(require("./classes/Game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolution = {
  width: 320,
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60061" + '/');

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