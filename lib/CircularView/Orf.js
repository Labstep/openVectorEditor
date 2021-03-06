"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = CircularPrimer;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _drawDirectedPiePiece = require("./drawDirectedPiePiece");

var _drawDirectedPiePiece2 = _interopRequireDefault(_drawDirectedPiePiece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function CircularPrimer(_ref) {
  var _ref$color = _ref.color,
      color = _ref$color === undefined ? "orange" : _ref$color,
      radius = _ref.radius,
      annotationHeight = _ref.annotationHeight,
      totalAngle = _ref.totalAngle,
      rest = _objectWithoutProperties(_ref, ["color", "radius", "annotationHeight", "totalAngle"]);

  return _react2.default.createElement("path", _extends({
    className: "veOrf",
    strokeWidth: ".5",
    stroke: color,
    fill: color,
    d: (0, _drawDirectedPiePiece2.default)({
      radius: radius,
      annotationHeight: annotationHeight,
      totalAngle: totalAngle,
      arrowheadLength: 0.4,
      tailThickness: 0.4
    }).print()
  }, rest));
}
module.exports = exports["default"];