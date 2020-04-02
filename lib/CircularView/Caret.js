"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isNumber = require("lodash/isNumber");

var _isNumber2 = _interopRequireDefault(_isNumber);

var _veRangeUtils = require("ve-range-utils");

var _PositionAnnotationOnCircle = require("./PositionAnnotationOnCircle");

var _PositionAnnotationOnCircle2 = _interopRequireDefault(_PositionAnnotationOnCircle);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _draggableClassnames = require("../constants/draggableClassnames");

var _draggableClassnames2 = _interopRequireDefault(_draggableClassnames);

var _pureNoFunc = require("../utils/pureNoFunc");

var _pureNoFunc2 = _interopRequireDefault(_pureNoFunc);

var _editorUtils = require("../utils/editorUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Caret(_ref) {
  var caretPosition = _ref.caretPosition,
      sequenceLength = _ref.sequenceLength,
      className = _ref.className,
      onClick = _ref.onClick,
      isSelection = _ref.isSelection,
      innerRadius = _ref.innerRadius,
      outerRadius = _ref.outerRadius,
      isProtein = _ref.isProtein,
      selectionMessage = _ref.selectionMessage;

  var _getRangeAngles = (0, _veRangeUtils.getRangeAngles)({ start: caretPosition, end: caretPosition }, sequenceLength || 1),
      startAngle = _getRangeAngles.startAngle,
      endAngle = _getRangeAngles.endAngle;

  if (!(0, _isNumber2.default)(startAngle)) {
    console.error("we've got a problem!");
  }
  return _react2.default.createElement(
    "g",
    _extends({}, (0, _PositionAnnotationOnCircle2.default)({
      sAngle: startAngle,
      eAngle: endAngle,
      height: 0
    }), {
      onClick: onClick,
      className: className + " veCaret " + _draggableClassnames2.default.caret
    }),
    _react2.default.createElement(
      "title",
      null,
      selectionMessage || (0, _editorUtils.getSelectionMessage)({ caretPosition: caretPosition, isProtein: isProtein, sequenceLength: sequenceLength })
    ),
    _react2.default.createElement("line", {
      strokeWidth: "1.5px",
      x1: 0,
      y1: -innerRadius,
      x2: 0,
      y2: -outerRadius
      // stroke="black"
    }),
    isSelection ? _react2.default.createElement("polygon", {
      className: "vePolygonCaretHandle",
      fill: "black",
      points: "0," + (-outerRadius + 2) + " 5," + (-outerRadius - 10) + " -5," + (-outerRadius - 10)
    }) : null
  );
}

exports.default = (0, _pureNoFunc2.default)(Caret);
module.exports = exports["default"];