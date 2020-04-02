"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _getRangeAnglesSpecial = require("./getRangeAnglesSpecial");

var _getRangeAnglesSpecial2 = _interopRequireDefault(_getRangeAnglesSpecial);

var _PositionAnnotationOnCircle = require("./PositionAnnotationOnCircle");

var _PositionAnnotationOnCircle2 = _interopRequireDefault(_PositionAnnotationOnCircle);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _each = require("lodash/each");

var _each2 = _interopRequireDefault(_each);

var _withHover = require("../helperComponents/withHover");

var _withHover2 = _interopRequireDefault(_withHover);

var _pureNoFunc = require("../utils/pureNoFunc");

var _pureNoFunc2 = _interopRequireDefault(_pureNoFunc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Cutsites(_ref) {
  var radius = _ref.radius,
      editorName = _ref.editorName,
      showCutsiteLabels = _ref.showCutsiteLabels,
      cutsiteClicked = _ref.cutsiteClicked,
      cutsiteRightClicked = _ref.cutsiteRightClicked,
      cutsites = _ref.cutsites,
      _ref$cutsiteWidth = _ref.cutsiteWidth,
      cutsiteWidth = _ref$cutsiteWidth === undefined ? 1 : _ref$cutsiteWidth,
      _ref$annotationHeight = _ref.annotationHeight,
      annotationHeight = _ref$annotationHeight === undefined ? 15 : _ref$annotationHeight,
      sequenceLength = _ref.sequenceLength;

  radius += annotationHeight;
  var svgGroup = [];
  var labels = {};
  var index = 0;
  if (!Object.keys(cutsites).length) return null;
  (0, _each2.default)(cutsites, function (annotation /* key */) {
    index++;

    if (!(annotation.topSnipPosition > -1)) {
      //we need this to be present
    }

    var _getRangeAngles = (0, _getRangeAnglesSpecial2.default)({ start: annotation.topSnipPosition, end: annotation.topSnipPosition }, sequenceLength),
        startAngle = _getRangeAngles.startAngle;

    if (showCutsiteLabels) {
      //expand the end angle if annotation spans the origin
      labels[annotation.id] = {
        annotationCenterAngle: startAngle,
        annotationCenterRadius: radius,
        text: annotation.restrictionEnzyme.name,
        color: annotation.restrictionEnzyme.color,
        className: " veCutsiteLabel",
        id: annotation.id,
        onClick: function onClick(event) {
          cutsiteClicked({ event: event, annotation: annotation });
          event.stopPropagation();
        },
        onContextMenu: function onContextMenu(event) {
          cutsiteRightClicked({ event: event, annotation: annotation });
          event.stopPropagation();
        }
      };
    }
    svgGroup.push(_react2.default.createElement(DrawCutsite, _extends({
      key: "cutsite" + index
    }, {
      editorName: editorName,
      id: annotation.id,
      startAngle: startAngle,
      radius: radius,
      cutsiteWidth: cutsiteWidth,
      annotationHeight: annotationHeight
    })));
  });
  return {
    height: annotationHeight,
    labels: labels,
    component: _react2.default.createElement(
      "g",
      { key: "cutsites", className: "cutsites" },
      svgGroup
    )
  };
}

exports.default = Cutsites;


var DrawCutsite = (0, _pureNoFunc2.default)((0, _withHover2.default)(function (_ref2) {
  var className = _ref2.className,
      startAngle = _ref2.startAngle,
      radius = _ref2.radius,
      cutsiteWidth = _ref2.cutsiteWidth,
      annotationHeight = _ref2.annotationHeight,
      onMouseLeave = _ref2.onMouseLeave,
      onMouseOver = _ref2.onMouseOver;

  return _react2.default.createElement("rect", _extends({}, (0, _PositionAnnotationOnCircle2.default)({
    sAngle: startAngle,
    eAngle: startAngle,
    height: radius
  }), { onMouseLeave: onMouseLeave, onMouseOver: onMouseOver }, {
    className: className,
    width: cutsiteWidth,
    height: annotationHeight
  }));
}));
module.exports = exports["default"];