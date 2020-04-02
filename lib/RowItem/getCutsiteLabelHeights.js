"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //tnr: not actually used yet. I don't think it is necessary
// for the cutsite label heights to be perfect

exports.default = getCutsiteLabelHeights;

var _getXStartAndWidthOfRowAnnotation = require("./getXStartAndWidthOfRowAnnotation");

var _getXStartAndWidthOfRowAnnotation2 = _interopRequireDefault(_getXStartAndWidthOfRowAnnotation);

var _nodeIntervalTree = require("node-interval-tree");

var _nodeIntervalTree2 = _interopRequireDefault(_nodeIntervalTree);

var _getYOffset = require("../CircularView/getYOffset");

var _getYOffset2 = _interopRequireDefault(_getYOffset);

var _forEach = require("lodash/forEach");

var _forEach2 = _interopRequireDefault(_forEach);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCutsiteLabelHeights(_ref) {
  var bpsPerRow = _ref.bpsPerRow,
      charWidth = _ref.charWidth,
      annotationRanges = _ref.annotationRanges,
      annotationHeight = _ref.annotationHeight,
      spaceBetweenAnnotations = _ref.spaceBetweenAnnotations,
      textWidth = _ref.textWidth;

  var rowLength = bpsPerRow * charWidth;
  var counter = 0;
  var maxAnnotationYOffset = 0;
  var rowCenter = rowLength / 2;
  var iTree = new _nodeIntervalTree2.default(rowCenter);
  (0, _forEach2.default)(annotationRanges, function (annotationRange) {
    counter++;
    if (counter > 50) return;
    var annotation = annotationRange.annotation;
    if (!annotation) {
      annotation = annotationRange;
    }
    var labelLength = annotation.restrictionEnzyme.name.length * textWidth;

    var _getXStartAndWidthOfR = (0, _getXStartAndWidthOfRowAnnotation2.default)(annotationRange, bpsPerRow, charWidth),
        xStart = _getXStartAndWidthOfR.xStart;

    var xEnd = xStart + labelLength;

    if (xEnd > rowLength) {
      xStart = xStart - (xEnd - rowLength);
      xEnd = rowLength;
    }
    var yOffset = (0, _getYOffset2.default)(iTree, xStart, xEnd);
    iTree.insert(xStart, xEnd, _extends({}, annotationRange, {
      yOffset: yOffset
    }));

    if (yOffset > maxAnnotationYOffset) {
      maxAnnotationYOffset = yOffset;
    }
    var height = yOffset * (annotationHeight + spaceBetweenAnnotations);
    annotation.height = height;
  });
  var containerHeight = (maxAnnotationYOffset + 1) * (annotationHeight + spaceBetweenAnnotations);
  return containerHeight;
}
module.exports = exports["default"];