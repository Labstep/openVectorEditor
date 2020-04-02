"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('ve-sequence-utils'),
    getReverseComplementSequenceAndAnnotations = _require.getReverseComplementSequenceAndAnnotations;

module.exports = function addDashesForMatchStartAndEndForTracks(alignmentTracks) {
  return alignmentTracks.map(function (track, i) {
    // .filter by the user-specified mismatch overrides (initially [])
    return _extends({}, track, addDashesForMatchStartAndEnd(track, alignmentTracks[0], //send in the ref/template seq every time
    i === 0));
  });
};

function addDashesForMatchStartAndEnd(_ref, template, isTemplate) {
  var alignmentData = _ref.alignmentData,
      _sequenceData = _ref.sequenceData;

  var sequenceData = _sequenceData;
  var sequenceDataTemplate = template.sequenceData,
      alignmentDataTemplate = template.alignmentData;
  var _alignmentData$matchS = alignmentData.matchStart,
      matchStart = _alignmentData$matchS === undefined ? 0 : _alignmentData$matchS,
      _alignmentData$matchE = alignmentData.matchEnd,
      matchEnd = _alignmentData$matchE === undefined ? 0 : _alignmentData$matchE,
      strand = alignmentData.strand;

  if (strand === -1) {
    sequenceData = getReverseComplementSequenceAndAnnotations(sequenceData);
    var oldMatchEnd = matchEnd;
    matchEnd = matchStart;
    matchStart = oldMatchEnd;
  }
  var _alignmentDataTemplat = alignmentDataTemplate.matchStart,
      matchStartTemplate = _alignmentDataTemplat === undefined ? 0 : _alignmentDataTemplat,
      _alignmentDataTemplat2 = alignmentDataTemplate.matchEnd,
      matchEndTemplate = _alignmentDataTemplat2 === undefined ? 0 : _alignmentDataTemplat2;

  var newAlignmentData = void 0;
  if (isTemplate) {
    newAlignmentData = _extends({}, alignmentData, {
      sequence: sequenceDataTemplate.sequence.slice(0, matchStartTemplate) + alignmentData.sequence + sequenceDataTemplate.sequence.slice(matchEndTemplate + 1)
    });
  } else {
    newAlignmentData = _extends({}, alignmentData, {
      sequence: sequenceData.sequence.slice(0, matchStart) + alignmentData.sequence + sequenceData.sequence.slice(matchEnd + 1)
    });
    newAlignmentData = _extends({}, alignmentData, {
      sequence: "-".repeat(Math.max(matchStartTemplate - matchStart, 0)) + newAlignmentData.sequence + "-".repeat(Math.max(sequenceDataTemplate.sequence.slice(matchEndTemplate + 1).length - (sequenceData.sequence.length - matchEnd) + 1, 0))
    });
  }

  return { alignmentData: newAlignmentData, sequenceData: sequenceData };
}