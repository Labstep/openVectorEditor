"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getXStartAndWidthOfRowAnnotation;
exports.getWidth = getWidth;
function getXStartAndWidthOfRowAnnotation(range, bpsPerRow, charWidth) {
  var gapsBefore = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var gapsInside = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

  var startOffset = range.start % bpsPerRow;
  var toReturn = {
    startOffset: startOffset,
    // xStart: startOffset * charWidth,
    xStart: (startOffset + gapsBefore) * charWidth,
    width: getWidth(range, charWidth, gapsInside)
  };
  return toReturn;
}

function getWidth(range, charWidth) {
  var gapsInside = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  return (range.end + 1 - range.start + gapsInside) * charWidth;
}