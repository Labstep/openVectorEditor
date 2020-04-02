"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prepareRowData;

var _veSequenceUtils = require("ve-sequence-utils");

function prepareRowData(sequenceData, bpsPerRow) {
  var sequenceLength = sequenceData.noSequence ? sequenceData.size : sequenceData.sequence.length;
  var totalRows = Math.ceil(sequenceLength / bpsPerRow) || 1; //this check makes sure there is always at least 1 row!
  var rows = [];
  var rowMap = {};
  if (sequenceData.isProtein) {
    rowMap.primaryProteinSequence = (0, _veSequenceUtils.mapAnnotationsToRows)([{
      id: "primaryProteinSequence",
      forward: true,
      start: 0,
      end: sequenceLength - 1,
      proteinSequence: sequenceData.proteinSequence,
      aminoAcids: sequenceData.aminoAcidDataForEachBaseOfDNA
    }], sequenceLength, bpsPerRow);
  }
  _veSequenceUtils.annotationTypes.forEach(function (type) {
    rowMap[type] = (0, _veSequenceUtils.mapAnnotationsToRows)(sequenceData[type], sequenceLength, bpsPerRow);
  });

  var _loop = function _loop(rowNumber) {
    var row = {};
    row.rowNumber = rowNumber;
    row.start = rowNumber * bpsPerRow;
    row.end = (rowNumber + 1) * bpsPerRow - 1 < sequenceLength ? (rowNumber + 1) * bpsPerRow - 1 : sequenceLength - 1;
    if (row.end < 0) {
      row.end = 0;
    }
    _veSequenceUtils.annotationTypes.forEach(function (type) {
      row[type] = rowMap[type][rowNumber] || [];
    });
    if (sequenceData.isProtein) {
      row.isProtein = true;
      row.primaryProteinSequence = rowMap.primaryProteinSequence && (rowMap.primaryProteinSequence[rowNumber] || []);
    }
    row.sequence = sequenceData.noSequence ? {
      length: row.end + 1 - row.start
    } : sequenceData.sequence.slice(row.start, row.end + 1);

    rows[rowNumber] = row;
  };

  for (var rowNumber = 0; rowNumber < totalRows; rowNumber++) {
    _loop(rowNumber);
  }
  return rows;
}
module.exports = exports["default"];