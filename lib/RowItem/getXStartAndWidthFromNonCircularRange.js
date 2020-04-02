"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getXStartAndWidthFromNonCircularRange;

var _veRangeUtils = require("ve-range-utils");

function getXStartAndWidthFromNonCircularRange(range, charWidth) {
  var rangeLength = (0, _veRangeUtils.getRangeLength)(range);
  return {
    width: rangeLength * charWidth,
    xStart: range.start * charWidth
  };
}
module.exports = exports["default"];