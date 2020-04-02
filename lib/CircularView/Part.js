"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = CircularPart;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash");

var _drawDirectedPiePiece = require("./drawDirectedPiePiece");

var _drawDirectedPiePiece2 = _interopRequireDefault(_drawDirectedPiePiece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function CircularPart(_ref) {
  var radius = _ref.radius,
      _ref$arrowheadLength = _ref.arrowheadLength,
      arrowheadLength = _ref$arrowheadLength === undefined ? 0.5 : _ref$arrowheadLength,
      annotationHeight = _ref.annotationHeight,
      totalAngle = _ref.totalAngle,
      color = _ref.color,
      rest = _objectWithoutProperties(_ref, ["radius", "arrowheadLength", "annotationHeight", "totalAngle", "color"]);

  var path = (0, _drawDirectedPiePiece2.default)({
    radius: radius,
    annotationHeight: annotationHeight,
    totalAngle: totalAngle,
    arrowheadLength: arrowheadLength,
    tailThickness: 1 //feature specific
  });
  var colorToUse = (0, _lodash.startsWith)(color, "override_") ? color.replace("override_", "") : "purple";
  return _react2.default.createElement("path", _extends({}, rest, {
    className: "vePart veCircularViewPart",
    strokeWidth: "0.5",
    stroke: colorToUse,
    fill: colorToUse,
    fillOpacity: 0,
    d: path.print()
  }));
}
module.exports = exports["default"];