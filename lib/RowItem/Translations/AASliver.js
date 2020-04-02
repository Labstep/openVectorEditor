"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _pureNoFunc = require("../../utils/pureNoFunc");

var _pureNoFunc2 = _interopRequireDefault(_pureNoFunc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import PropTypes from "prop-types";
function AASliver(props) {
  var forward = props.forward,
      aminoAcidIndex = props.aminoAcidIndex,
      _props$showAAColors = props.showAAColors,
      showAAColors = _props$showAAColors === undefined ? true : _props$showAAColors,
      onClick = props.onClick,
      onContextMenu = props.onContextMenu,
      width = props.width,
      height = props.height,
      isFiller = props.isFiller,
      isTruncatedStart = props.isTruncatedStart,
      isTruncatedEnd = props.isTruncatedEnd,
      relativeAAPositionInTranslation = props.relativeAAPositionInTranslation,
      title = props.title,
      color = props.color,
      showAminoAcidNumbers = props.showAminoAcidNumbers,
      letter = props.letter;


  if (letter === "-") {
    return null;
  }
  return _react2.default.createElement(
    "g",
    {
      onClick: onClick,
      onContextMenu: onContextMenu,
      transform: "scale(" + width / 100 * 1.25 + ", " + height / 100 + ") translate(" + ((forward ? -20 : -50) + (relativeAAPositionInTranslation - 1) * 100 / 1.25) + ",0)"
    },
    _react2.default.createElement(
      "title",
      null,
      title
    ),
    showAAColors && _react2.default.createElement("polyline", {
      className: letter,
      transform: forward ? "scale(3,1)" : "translate(300,0) scale(-3,1) ",
      points: isFiller ? "25,0 49,0 60,50 49,100 25,100 38,50 25,0" : isTruncatedStart ? "0,0 50,0 60,50 50,100 00,100 16,50 0,0" : isTruncatedEnd ? "24,0 74,0 84,50 74,100 24,100 40,50 24,0" : "0,0 74,0 85,50 74,100 0,100 16,50 0,0",
      strokeWidth: "5",
      opacity: 0.5,
      fill: color || "gray"
    }),
    !isFiller && _react2.default.createElement(
      "text",
      {
        fontSize: 25,
        stroke: "black",
        strokeWidth: 2,
        transform: "scale(3,3) translate(" + (forward ? 45 : 55) + ",21)",
        x: "0",
        y: "4",
        style: { textAnchor: "middle" }
      },
      letter
    ),
    showAminoAcidNumbers && (aminoAcidIndex + 1) % 5 === 0 && _react2.default.createElement(
      "text",
      {
        fontSize: 25,
        stroke: "black",
        strokeWidth: 2,
        transform: "scale(3,3) translate(" + (forward ? 45 : 55) + ",51)",
        x: "0",
        y: "4",
        style: { textAnchor: "middle" }
      },
      aminoAcidIndex + 1
    )
  );
}

exports.default = (0, _pureNoFunc2.default)(AASliver);
module.exports = exports["default"];