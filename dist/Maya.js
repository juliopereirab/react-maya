"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Maya = Maya;

var _react = _interopRequireWildcard(require("react"));

var _UseTick = require("./UseTick");

var _MayaCreator = require("./MayaCreator");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Maya(_ref) {
  var width = _ref.width,
      height = _ref.height,
      _ref$triangleWidth = _ref.triangleWidth,
      triangleWidth = _ref$triangleWidth === void 0 ? 100 : _ref$triangleWidth,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? {
    red: 175,
    green: 50,
    blue: 255
  } : _ref$color,
      _ref$brightness = _ref.brightness,
      brightness = _ref$brightness === void 0 ? 0.50 : _ref$brightness;
  var index = (0, _UseTick.useTick)(60, 0);
  var m = (0, _react.useMemo)(function () {
    return new _MayaCreator.MayaCreator(triangleWidth, width, height, color, brightness);
  }, []);
  (0, _react.useEffect)(function () {
    if (index % 50 === 0) {
      m.randomDirection();
    }
  }, [index]);
  var content = m.getNewNodes(m.direction);
  return /*#__PURE__*/_react["default"].createElement("svg", {
    width: width,
    height: height,
    style: {
      backgroundColor: "#333"
    },
    dangerouslySetInnerHTML: {
      __html: content
    }
  });
}