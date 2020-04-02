"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _color = require("color");

var _color2 = _interopRequireDefault(_color);

var _withHover = require("../../helperComponents/withHover");

var _withHover2 = _interopRequireDefault(_withHover);

var _getAnnotationNameAndStartStopString = require("../../utils/getAnnotationNameAndStartStopString");

var _getAnnotationNameAndStartStopString2 = _interopRequireDefault(_getAnnotationNameAndStartStopString);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PointedAnnotation = function (_React$PureComponent) {
  _inherits(PointedAnnotation, _React$PureComponent);

  function PointedAnnotation() {
    _classCallCheck(this, PointedAnnotation);

    return _possibleConstructorReturn(this, (PointedAnnotation.__proto__ || Object.getPrototypeOf(PointedAnnotation)).apply(this, arguments));
  }

  _createClass(PointedAnnotation, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          className = _props.className,
          widthInBps = _props.widthInBps,
          charWidth = _props.charWidth,
          height = _props.height,
          rangeType = _props.rangeType,
          forward = _props.forward,
          _props$name = _props.name,
          name = _props$name === undefined ? "" : _props$name,
          onMouseLeave = _props.onMouseLeave,
          onMouseOver = _props.onMouseOver,
          id = _props.id,
          hideName = _props.hideName,
          _props$pointiness = _props.pointiness,
          pointiness = _props$pointiness === undefined ? 8 : _props$pointiness,
          _props$color = _props.color,
          color = _props$color === undefined ? "orange" : _props$color,
          fill = _props.fill,
          stroke = _props.stroke,
          opacity = _props.opacity,
          _onClick = _props.onClick,
          textColor = _props.textColor,
          onRightClick = _props.onRightClick,
          gapsInside = _props.gapsInside,
          gapsBefore = _props.gapsBefore,
          annotation = _props.annotation,
          externalLabels = _props.externalLabels,
          onlyShowLabelsThatDoNotFit = _props.onlyShowLabelsThatDoNotFit;


      var width = (widthInBps + gapsInside) * charWidth;
      var charWN = charWidth; //charWN is normalized
      if (charWidth < 15) {
        //allow the arrow width to adapt
        if (width > 15) {
          charWN = 15; //tnr: replace 15 here with a non-hardcoded number..
        } else {
          charWN = width;
        }
      }
      var widthMinusOne = width - charWN;
      var path = void 0;
      var hasAPoint = false;
      // starting from the top left of the annotation
      if (rangeType === "middle") {
        //draw a rectangle
        path = "\n          M 0,0 \n          L " + (width - pointiness / 2) + ",0\n          Q " + (width + pointiness / 2) + "," + height / 2 + " " + (width - pointiness / 2) + "," + height + "\n          L " + 0 + "," + height + "\n          Q " + pointiness + "," + height / 2 + " " + 0 + "," + 0 + "\n          z";
      } else if (rangeType === "start") {
        path = "\n          M 0,0 \n          L " + (width - pointiness / 2) + ",0 \n          Q " + (width + pointiness / 2) + "," + height / 2 + " " + (width - pointiness / 2) + "," + height + "\n          L 0," + height + " \n          z";
      } else if (rangeType === "beginningAndEnd") {
        hasAPoint = true;
        path = "\n          M 0,0 \n          L " + widthMinusOne + ",0 \n          L " + width + "," + height / 2 + " \n          L " + widthMinusOne + "," + height + " \n          L 0," + height + " \n          z";
      } else {
        hasAPoint = true;
        path = "\n        M 0,0 \n        L " + widthMinusOne + ",0 \n        L " + width + "," + height / 2 + " \n        L " + widthMinusOne + "," + height + " \n        L 0," + height + " \n        Q " + pointiness + "," + height / 2 + " " + 0 + "," + 0 + "\n        z";
      }
      var nameToDisplay = name;
      var textOffset = width / 2 - name.length * 5 / 2 - (hasAPoint ? pointiness / 2 * (forward ? 1 : -1) : 0);
      if (!(0, _utils.doesLabelFitInAnnotation)(name, { width: width }, charWidth) || externalLabels && !onlyShowLabelsThatDoNotFit && ["parts", "features"].includes(annotation.annotationTypePlural)) {
        textOffset = 0;
        nameToDisplay = "";
      }

      return _react2.default.createElement(
        "g",
        _extends({ onMouseLeave: onMouseLeave, onMouseOver: onMouseOver }, {
          className: " clickable " + className,
          dataId: id,
          onClick: function onClick(event) {
            _onClick({ annotation: annotation, event: event, gapsBefore: gapsBefore, gapsInside: gapsInside });
          },
          onContextMenu: function onContextMenu(event) {
            onRightClick({ annotation: annotation, event: event, gapsBefore: gapsBefore, gapsInside: gapsInside });
          }
        }),
        _react2.default.createElement(
          "title",
          null,
          (0, _getAnnotationNameAndStartStopString2.default)(annotation)
        ),
        _react2.default.createElement("path", {
          strokeWidth: "1",
          stroke: stroke || "black",
          opacity: opacity,
          fill: fill || color,
          transform: forward ? null : "translate(" + width + ",0) scale(-1,1) ",
          d: path
        }),
        !hideName && nameToDisplay && _react2.default.createElement(
          "text",
          {
            className: "ve-monospace-font",
            style: {
              fontSize: ".9em",
              fill: textColor || ((0, _color2.default)(color).isDark() ? "white" : "black")
            },
            transform: "translate(" + textOffset + "," + (height - 2) + ")"
          },
          nameToDisplay
        )
      );
    }
  }]);

  return PointedAnnotation;
}(_react2.default.PureComponent);

exports.default = (0, _withHover2.default)(PointedAnnotation);
module.exports = exports["default"];