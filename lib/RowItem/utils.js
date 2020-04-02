"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doesLabelFitInAnnotation = undefined;

var _constants = require("./constants");

var _getXStartAndWidthOfRowAnnotation = require("./getXStartAndWidthOfRowAnnotation");

var doesLabelFitInAnnotation = exports.doesLabelFitInAnnotation = function doesLabelFitInAnnotation() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var _ref = arguments[1];
  var range = _ref.range,
      width = _ref.width;
  var charWidth = arguments[2];

  var textLength = text.length * _constants.ANNOTATION_LABEL_FONT_WIDTH;
  var widthMinusOne = (range ? (0, _getXStartAndWidthOfRowAnnotation.getWidth)(range, charWidth, 0) : width) - charWidth;
  return widthMinusOne > textLength;
};