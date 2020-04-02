"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateTickMarkPositionsForGivenRange;

var _veRangeUtils = require("ve-range-utils");

function calculateTickMarkPositionsForGivenRange(_ref) {
  var _ref$tickSpacing = _ref.tickSpacing,
      _tickSpacing = _ref$tickSpacing === undefined ? 10 : _ref$tickSpacing,
      range = _ref.range,
      sequenceLength = _ref.sequenceLength,
      isProtein = _ref.isProtein;

  if (sequenceLength === 0) {
    return [];
  }
  var tickSpacing = _tickSpacing;
  if (isProtein) {
    tickSpacing = Math.floor(_tickSpacing / 2 * 3);
  }
  var rangeLength = (0, _veRangeUtils.getRangeLength)(range, sequenceLength);

  var firstTickOffsetFromRangeStart = void 0;
  if (range.start > range.end) {
    // range spans origin, so make sure the 0 bp is included!
    firstTickOffsetFromRangeStart = (sequenceLength - range.start) % tickSpacing + 1;
  } else {
    firstTickOffsetFromRangeStart = tickSpacing - range.start % tickSpacing;
  }
  var tickMarks = [];
  if (range.start === 0) tickMarks.push(isProtein ? 2 : 0);
  for (var tick = firstTickOffsetFromRangeStart - 1; tick < rangeLength; tick += tickSpacing) {
    tickMarks.push((0, _veRangeUtils.normalizePositionByRangeLength)(tick, sequenceLength));
  }
  return tickMarks;
}
module.exports = exports["default"];