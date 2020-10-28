"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MayaCreator = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function Point(x, y, z) {
  _classCallCheck(this, Point);

  this.x = typeof x === 'number' ? x : 0;
  this.y = typeof y === 'number' ? y : 0;
  this.z = typeof z === 'number' ? z : 0;
  this.baseX = typeof x === 'number' ? x : 0;
  this.baseY = typeof y === 'number' ? y : 0;
};

var Triangle = /*#__PURE__*/function () {
  function Triangle(direction) {
    _classCallCheck(this, Triangle);

    this.direction = _typeof("string") ? direction : "";
    this.points = [];
  }

  _createClass(Triangle, [{
    key: "setPoints",
    value: function setPoints(points) {
      this.points = points;
    }
  }]);

  return Triangle;
}();

var ProjectPoint = function ProjectPoint(point, middleX, middleY) {
  var newX = (point.baseX - middleX) * point.z + middleX;
  var newY = (point.baseY - middleY) * point.z + middleY;
  point.x = newX;
  point.y = newY;
};

var meanDepth = function meanDepth(triangle) {
  var p1 = triangle[0].z > triangle[1].z ? triangle[0].z : triangle[1].z;
  return p1 > triangle[2].z ? p1 : triangle[2].z;
};

function getRandomSubsection(array, subsectionAmount) {
  var indexes = array.map(function (el, i) {
    return i;
  });

  for (var i = 0; i < array.length - subsectionAmount; i++) {
    var randomIndex = Math.ceil(Math.random() * array.length) - 1;
    indexes.splice(randomIndex, 1);
  }

  return indexes.map(function (i) {
    return array[i];
  }).slice(0, subsectionAmount);
}

var MayaCreator = /*#__PURE__*/function () {
  function MayaCreator(pointWidth, totalHeight, totalWidth, color, brightness) {
    _classCallCheck(this, MayaCreator);

    this.totalHeight = totalHeight;
    this.totalWidth = totalWidth;
    this.pointWidth = pointWidth;
    var produceDuplicateKeys = this.produceDuplicateKeys;
    this.tagList = [].concat(_toConsumableArray(produceDuplicateKeys(1)), _toConsumableArray(produceDuplicateKeys(2)), _toConsumableArray(produceDuplicateKeys(3)));
    this.points = this.generateCoordinates(pointWidth);
    this.triangles = this.generateTriangles(pointWidth);
    var keys = Object.keys(this.points);
    this.pointsToAlter = getRandomSubsection(keys, Math.floor(keys.length / 2.5));
    this.direction = true;
    this.totalGap = 0.1;
    this.color = color;
    this.brightness = brightness;
  }

  _createClass(MayaCreator, [{
    key: "randomDirection",
    value: function randomDirection() {
      var keys = Object.keys(this.points);
      this.direction = Math.floor(Math.random() * 2) === 0;
      this.pointsToAlter = getRandomSubsection(keys, Math.floor(keys.length / 3));
    }
  }, {
    key: "resetZValues",
    value: function resetZValues() {
      var keys = Object.keys(this.points);

      for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
        var k = _keys[_i];
        this.points[k].z = 1;
      }
    }
  }, {
    key: "generateShadowIndex",
    value: function generateShadowIndex(triangle) {
      var halfGap = this.totalGap / 2;
      var t = triangle.points;
      var top = triangle.direction === "right" ? 1 : 0;
      var down = triangle.direction === "right" ? 0 : 1;
      var side = 2;
      var angleY = (t[down].z - t[top].z + halfGap) / this.totalGap;
      var angleX = (t[side].z - (t[top].z + t[down].z) / 2 + halfGap) / this.totalGap;
      return (angleY + angleX) / 2;
    }
  }, {
    key: "produceDuplicateKeys",
    value: function produceDuplicateKeys(n) {
      var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      return characters.split("").map(function (l) {
        return l.repeat(n);
      });
    }
  }, {
    key: "generateCoordinates",
    value: function generateCoordinates() {
      var totalHeight = this.totalHeight,
          totalWidth = this.totalWidth,
          pointWidth = this.pointWidth;
      var numberOfRows = totalHeight / pointWidth;
      var numberOfPointsPerRow = totalWidth / pointWidth;
      var toInsert = {};

      for (var i = 0; i < numberOfRows; i++) {
        for (var ii = 0; ii < numberOfPointsPerRow; ii++) {
          var gap = ii % 2 == 0 ? pointWidth / 1.4 : 0;
          toInsert[this.tagList[i] + ii.toString()] = new Point(ii * pointWidth * 1.2, gap + i * pointWidth * 1.5 - pointWidth, 1);
        }
      }

      return toInsert;
    }
  }, {
    key: "generateTriangles",
    value: function generateTriangles(points, w) {
      var triangles = [];
      var numberOfRows = this.totalHeight / w;
      var numberOfPointsPerRow = this.totalWidth / w;

      for (var i = 0; i < numberOfPointsPerRow; i++) {
        for (var ii = 0; ii < numberOfRows; ii++) {
          var newT = new Triangle("right");
          var newTInverse = new Triangle("left");

          if (i % 2 == 0) {
            newT.setPoints([points["".concat(this.tagList[ii]).concat(i)], points["".concat(this.tagList[ii + 1]).concat(i)], points["".concat(this.tagList[ii + 1]).concat(i + 1)]]);
            newTInverse.setPoints([points["".concat(this.tagList[ii]).concat(i)], points["".concat(this.tagList[ii - 1]).concat(i)], points["".concat(this.tagList[ii]).concat(i - 1)]]);
          } else {
            newT.setPoints([points["".concat(this.tagList[ii]).concat(i)], points["".concat(this.tagList[ii - 1]).concat(i)], points["".concat(this.tagList[ii - 1]).concat(i - 1)]]);
            newTInverse.setPoints([points["".concat(this.tagList[ii]).concat(i)], points["".concat(this.tagList[ii + 1]).concat(i)], points["".concat(this.tagList[ii]).concat(i + 1)]]);
          }

          triangles = [].concat(_toConsumableArray(triangles), [newT, newTInverse]);
        }
      }

      return triangles.filter(function (t) {
        return !t.points.some(function (p) {
          return !p;
        });
      });
    }
  }, {
    key: "alterPoint",
    value: function alterPoint(tag, direction, fraction) {
      var r = this.totalGap / (fraction || 20);
      var resultingAmount = direction ? this.points[tag].z + this.points[tag].z * r : this.points[tag].z - this.points[tag].z * r;
      var top = 1 + this.totalGap / 2;
      var bottom = 1 - this.totalGap / 2;
      this.points[tag].z = resultingAmount >= top ? top : resultingAmount <= bottom ? bottom : resultingAmount;
    }
  }, {
    key: "setPointArea",
    value: function setPointArea(direction) {
      // let selectedPoints = getRandomSubsection(Object.keys(this.points), 20);
      var selectedPoints = ["d8", "e4", "h4", "g7"];
      var radio = 3; // console.log(this.points["d15"], this.points["s50"])

      for (var _i2 = 0, _selectedPoints = selectedPoints; _i2 < _selectedPoints.length; _i2++) {
        var p = _selectedPoints[_i2];
        var d2 = p === "g7" ? Math.floor(Math.random() * 2) === 0 : direction;
        var m = p.match(/[0-9]+/);
        var n = parseInt(m && m[0]);
        var letterPosition = this.tagList.indexOf(p.replace(m[0], ""));
        var consideredLetters = this.tagList.slice(letterPosition - radio, letterPosition + radio + 1);
        var consideredNumbers = Array.from(Array(n + radio + 1).keys()).slice(n - radio, n + radio + 1);

        for (var il in consideredLetters) {
          var letter = consideredLetters[il];
          var difL = il > letterPosition ? il - letterPosition : letterPosition - il;

          for (var inum in consideredNumbers) {
            var num = consideredNumbers[inum];
            var difN = inum > n ? inum - n : n - il; // console.log(`${letter}${num}`)

            this.alterPoint("".concat(letter).concat(num), d2, 1 + difN + difL);
          }
        }
      }
    }
  }, {
    key: "alterZValues",
    value: function alterZValues(direction) {
      var _this = this;

      this.pointsToAlter.forEach(function (p) {
        _this.alterPoint(p, direction);
      });
    }
  }, {
    key: "getNewNodes",
    value: function getNewNodes(direction) {
      var _this2 = this;

      // removeAllChildNodes(container)
      var toInsert = "";
      var dx = this.totalWidth / 2;
      var dy = this.totalHeight / 2;
      this.alterZValues(direction); // this.setPointArea(direction);

      this.pointsToAlter.forEach(function (k) {
        ProjectPoint(_this2.points[k], dx, dy);
      });
      var triangles = this.generateTriangles(this.points, this.pointWidth);
      triangles = triangles.sort(function (curr, next) {
        return meanDepth(next.points) - meanDepth(curr.points);
      });
      var _this$color = this.color,
          red = _this$color.red,
          green = _this$color.green,
          blue = _this$color.blue;
      var brightness = this.brightness;

      var _iterator = _createForOfIteratorHelper(triangles),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var triangle = _step.value;
          var t = triangle.points;
          var m = this.generateShadowIndex(triangle);
          toInsert += "<polygon points=\"".concat(t[0].x, ",").concat(t[0].y, " ").concat(t[1].x, ",").concat(t[1].y, " ").concat(t[2].x, ",").concat(t[2].y, "\" style=\"fill:rgb(").concat(red * brightness + red * brightness * m, ", ").concat(green * brightness + green * brightness * m, ", ").concat(blue * brightness + blue * brightness * m, ");stroke:black;stroke-width:1\"\" />");
        } // for(var k of this.pointsToAlter){
        //     let p = m.points[k]
        //     toInsert += `<circle cx="${p.x}" cy="${p.y}" r="5" stroke="black" fill="green" /> `                        
        //     // toInsert += `<text x="${p.x}" y="${p.y}" fill="red">${k}</text>`
        // }

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return toInsert;
    }
  }, {
    key: "render",
    value: function render(container, direction) {
      container.innerHTML = this.getNewNodes(container, direction);
    }
  }]);

  return MayaCreator;
}();

exports.MayaCreator = MayaCreator;