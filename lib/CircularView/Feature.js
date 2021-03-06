"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Feature;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _drawDirectedPiePiece = require("./drawDirectedPiePiece");

var _drawDirectedPiePiece2 = _interopRequireDefault(_drawDirectedPiePiece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Feature(_ref) {
  var _ref$color = _ref.color,
      color = _ref$color === undefined ? "orange" : _ref$color,
      radius = _ref.radius,
      containsLocations = _ref.containsLocations,
      _ref$arrowheadLength = _ref.arrowheadLength,
      arrowheadLength = _ref$arrowheadLength === undefined ? 0.5 : _ref$arrowheadLength,
      annotationHeight = _ref.annotationHeight,
      totalAngle = _ref.totalAngle,
      rest = _objectWithoutProperties(_ref, ["color", "radius", "containsLocations", "arrowheadLength", "annotationHeight", "totalAngle"]);

  if (containsLocations) {
    var _path = (0, _drawDirectedPiePiece2.default)({
      radius: radius,
      annotationHeight: annotationHeight / 8,
      totalAngle: totalAngle,
      arrowheadLength: arrowheadLength,
      tailThickness: 1 //feature specific
    });
    return _react2.default.createElement("path", _extends({}, rest, {
      className: "veFeature veCircularViewFeature",
      strokeWidth: ".5",
      stroke: "black",
      fill: color,
      d: _path.print()
    }));
  }
  var path = (0, _drawDirectedPiePiece2.default)({
    radius: radius,
    annotationHeight: annotationHeight,
    totalAngle: totalAngle,
    arrowheadLength: arrowheadLength,
    tailThickness: 1 //feature specific
  });
  return _react2.default.createElement("path", _extends({}, rest, {
    className: "veFeature veCircularViewFeature",
    strokeWidth: ".5",
    stroke: "black",
    fill: color,
    d: path.print()
  }));
}
module.exports = exports["default"];