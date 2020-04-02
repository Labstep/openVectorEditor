"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _teselagenReactComponents = require("teselagen-react-components");

var _Caret = require("./Caret");

var _Caret2 = _interopRequireDefault(_Caret);

var _sector = require("paths-js/sector");

var _sector2 = _interopRequireDefault(_sector);

var _getRangeAnglesSpecial = require("./getRangeAnglesSpecial");

var _getRangeAnglesSpecial2 = _interopRequireDefault(_getRangeAnglesSpecial);

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

function SelectionLayer(_ref) {
  var isDraggable = _ref.isDraggable,
      selectionLayer = _ref.selectionLayer,
      sequenceLength = _ref.sequenceLength,
      radius = _ref.radius,
      hideTitle = _ref.hideTitle,
      innerRadius = _ref.innerRadius,
      onRightClicked = _ref.onRightClicked,
      onClick = _ref.onClick,
      index = _ref.index,
      isProtein = _ref.isProtein;
  var color = selectionLayer.color,
      start = selectionLayer.start,
      end = selectionLayer.end,
      _selectionLayer$hideC = selectionLayer.hideCarets,
      hideCarets = _selectionLayer$hideC === undefined ? false : _selectionLayer$hideC,
      style = selectionLayer.style,
      className = selectionLayer.className;

  var _getRangeAngles = (0, _getRangeAnglesSpecial2.default)(selectionLayer, sequenceLength),
      startAngle = _getRangeAngles.startAngle,
      endAngle = _getRangeAngles.endAngle,
      totalAngle = _getRangeAngles.totalAngle;

  var section = (0, _sector2.default)({
    center: [0, 0], //the center is always 0,0 for our annotations :) we rotate later!
    r: innerRadius,
    R: radius,
    start: 0,
    end: totalAngle
  });

  var selectionMessage = (0, _editorUtils.getSelectionMessage)({
    sequenceLength: sequenceLength,
    selectionLayer: selectionLayer,
    isProtein: isProtein
  });
  // let section2 = sector({
  //   center: [0, 0], //the center is always 0,0 for our annotations :) we rotate later!
  //   r: innerRadius,
  //   R: radius,
  //   start: 0,
  //   end: Math.PI * 2 - totalAngle
  // });
  return _react2.default.createElement(
    "g",
    {
      onContextMenu: function onContextMenu(event) {
        onRightClicked && onRightClicked({
          annotation: selectionLayer,
          event: event
        });
      },
      onClick: onClick ? function (event) {
        onClick({
          annotation: selectionLayer,
          event: event
        });
      } : undefined,
      key: "veSelectionLayer" + index,
      className: "veSelectionLayer " + className
    },
    !hideTitle && _react2.default.createElement(
      "title",
      null,
      selectionMessage
    ),
    _react2.default.createElement("path", _extends({}, (0, _PositionAnnotationOnCircle2.default)({
      sAngle: startAngle,
      eAngle: endAngle,
      height: 0
    }), {
      className: "selectionLayer",
      style: _extends({ opacity: 0.3 }, style),
      d: section.path.print(),
      fill: color
    })),
    !hideCarets && _react2.default.createElement(_Caret2.default, {
      key: "caret1",
      className: className + " selectionLayerCaret " + (isDraggable ? _draggableClassnames2.default.selectionStart : ""),
      isSelection: true,
      onClick: onClick ? _teselagenReactComponents.noop : _editorUtils.preventDefaultStopPropagation,
      selectionMessage: selectionMessage,
      caretPosition: start,
      sequenceLength: sequenceLength,
      innerRadius: innerRadius,
      outerRadius: radius
    }),
    !hideCarets && _react2.default.createElement(_Caret2.default, {
      key: "caret2",
      className: className + " selectionLayerCaret " + (isDraggable ? _draggableClassnames2.default.selectionEnd : ""),
      isSelection: true,
      onClick: onClick ? _teselagenReactComponents.noop : _editorUtils.preventDefaultStopPropagation,
      selectionMessage: selectionMessage,
      caretPosition: end + 1,
      sequenceLength: sequenceLength,
      innerRadius: innerRadius,
      outerRadius: radius
    })
  );
}

exports.default = (0, _pureNoFunc2.default)(SelectionLayer);
module.exports = exports["default"];