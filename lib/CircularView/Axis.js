"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _getAngleForPositionMidpoint = require("./getAngleForPositionMidpoint");

var _getAngleForPositionMidpoint2 = _interopRequireDefault(_getAngleForPositionMidpoint);

var _PositionAnnotationOnCircle = require("./PositionAnnotationOnCircle");

var _PositionAnnotationOnCircle2 = _interopRequireDefault(_PositionAnnotationOnCircle);

var _shouldFlipText = require("./shouldFlipText");

var _shouldFlipText2 = _interopRequireDefault(_shouldFlipText);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _calculateTickMarkPositionsForGivenRange = require("../utils/calculateTickMarkPositionsForGivenRange");

var _calculateTickMarkPositionsForGivenRange2 = _interopRequireDefault(_calculateTickMarkPositionsForGivenRange);

var _proteinUtils = require("../utils/proteinUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Axis(_ref) {
  var radius = _ref.radius,
      sequenceLength = _ref.sequenceLength,
      showAxisNumbers = _ref.showAxisNumbers,
      circularAndLinearTickSpacing = _ref.circularAndLinearTickSpacing,
      _ref$tickMarkHeight = _ref.tickMarkHeight,
      tickMarkHeight = _ref$tickMarkHeight === undefined ? 5 : _ref$tickMarkHeight,
      _ref$tickMarkWidth = _ref.tickMarkWidth,
      tickMarkWidth = _ref$tickMarkWidth === undefined ? 1 : _ref$tickMarkWidth,
      _ref$textOffset = _ref.textOffset,
      textOffset = _ref$textOffset === undefined ? 15 : _ref$textOffset,
      _ref$ringThickness = _ref.ringThickness,
      ringThickness = _ref$ringThickness === undefined ? 4 : _ref$ringThickness,
      isProtein = _ref.isProtein;

  var height = ringThickness + (showAxisNumbers ? textOffset + tickMarkHeight : 0);
  var radiusToUse = showAxisNumbers ? radius + textOffset + tickMarkHeight : radius;
  var tickPositions = (0, _calculateTickMarkPositionsForGivenRange2.default)({
    range: {
      start: 0,
      end: sequenceLength
    },
    tickSpacing: circularAndLinearTickSpacing,
    sequenceLength: sequenceLength,
    isProtein: isProtein
  });
  var tickMarksAndLabels = showAxisNumbers ? tickPositions.map(function (tickPosition, index) {
    var tickAngle = (0, _getAngleForPositionMidpoint2.default)(tickPosition, sequenceLength);
    return _react2.default.createElement(
      "g",
      _extends({
        key: "axis" + index
      }, (0, _PositionAnnotationOnCircle2.default)({
        sAngle: tickAngle,
        eAngle: tickAngle,
        height: radiusToUse
      })),
      _react2.default.createElement(
        "text",
        {
          transform: ((0, _shouldFlipText2.default)(tickAngle) ? "rotate(180)" : "") + (" translate(0, " + ((0, _shouldFlipText2.default)(tickAngle) ? -textOffset : textOffset) + ")"),
          style: {
            textAnchor: "middle",
            dominantBaseline: "central",
            fontSize: "small"
          }
        },
        (0, _proteinUtils.divideBy3)(tickPosition + 1, isProtein) + ""
      ),
      _react2.default.createElement("rect", { width: tickMarkWidth, height: tickMarkHeight })
    );
  }) : null;
  var component = _react2.default.createElement(
    "g",
    { key: "veAxis", className: "veAxis" },
    _react2.default.createElement("circle", {
      className: "veAxisFill",
      id: "circularViewAxis",
      key: "circleOuter",
      r: radiusToUse + ringThickness,
      style: { fill: "white", stroke: "black", strokeWidth: 0.5 }
    }),
    _react2.default.createElement("circle", {
      id: "circularViewAxis",
      key: "circle",
      r: radiusToUse,
      style: { fill: "white", stroke: "black", strokeWidth: 0.5 }
    }),
    tickMarksAndLabels
  );
  return {
    component: component,
    height: height
  };
}

exports.default = Axis;
module.exports = exports["default"];