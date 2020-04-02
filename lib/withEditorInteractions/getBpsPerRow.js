"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBpsPerRow;

var _rowviewContants = require("../constants/rowviewContants");

function getBpsPerRow(_ref) {
  var _ref$charWidth = _ref.charWidth,
      charWidth = _ref$charWidth === undefined ? _rowviewContants.defaultCharWidth : _ref$charWidth,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? _rowviewContants.defaultContainerWidth : _ref$width,
      _ref$dimensions = _ref.dimensions;
  _ref$dimensions = _ref$dimensions === undefined ? {} : _ref$dimensions;
  var width2 = _ref$dimensions.width,
      _ref$marginWidth = _ref.marginWidth,
      marginWidth = _ref$marginWidth === undefined ? _rowviewContants.defaultMarginWidth : _ref$marginWidth,
      sequenceData = _ref.sequenceData;

  var toRet = Math.floor(((width2 || width) - marginWidth) / (sequenceData.isProtein ? charWidth * 3 : charWidth));
  return sequenceData.isProtein ? toRet * 3 : toRet;
}
module.exports = exports["default"];