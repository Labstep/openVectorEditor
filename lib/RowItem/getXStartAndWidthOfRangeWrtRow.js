"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getXStartAndWidthOfRangeWrtRow;

var _veRangeUtils = require("ve-range-utils");

var _lodash = require("lodash");

function getXStartAndWidthOfRangeWrtRow(range, row, bpsPerRow, charWidth, sequenceLength) {
  var gapsBefore = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  var gapsInside = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;

  var xStart = ((!(0, _lodash.isNumber)(gapsBefore) ? 0 : gapsBefore) + (0, _veRangeUtils.normalizePositionByRangeLength)(range.start - row.start, sequenceLength)) * charWidth;
  var obj = {
    xStart: xStart,
    width: (gapsInside + (0, _veRangeUtils.normalizePositionByRangeLength)(range.end + 1 - range.start, sequenceLength + 1)) * charWidth
  };
  return obj;
}
module.exports = exports["default"];