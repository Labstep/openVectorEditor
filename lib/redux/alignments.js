"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alignmentRunUpdate = exports.updateAlignmentViewVisibility = exports.upsertAlignmentRun = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _veSequenceUtils = require("ve-sequence-utils");

var _addDashesForMatchStartAndEndForTracks = require("./utils/addDashesForMatchStartAndEndForTracks");

var _addDashesForMatchStartAndEndForTracks2 = _interopRequireDefault(_addDashesForMatchStartAndEndForTracks);

var _reduxAct = require("redux-act");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import createAction from "./utils/createMetaAction";
// import createMergedDefaultStateReducer from "./utils/createMergedDefaultStateReducer";
// import ab1ParsedGFPuv54 from "../ToolBar/ab1ParsedGFPuv54.json";
// import ab1ParsedGFPuv58 from "../ToolBar/ab1ParsedGFPuv58.json";
// import ab1ParsedGFPvv50 from "../ToolBar/ab1ParsedGFPvv50.json";
// import ab1ParsedGFPvv60 from "../ToolBar/ab1ParsedGFPvv60.json";
// import { magicDownload } from "teselagen-react-components";

var alignmentAnnotationSettings = {
  axis: true,
  axisNumbers: true,
  chromatogram: false,
  dnaColors: false,
  features: false,
  parts: false,
  reverseSequence: false,
  sequence: true,
  translations: true,
  orfs: false,
  orfTranslations: false,
  cdsFeatureTranslations: false,
  cutsites: false,
  primers: false
};

var defaultVisibilities = {
  alignmentAnnotationVisibility: alignmentAnnotationSettings,
  pairwise_alignmentAnnotationVisibility: alignmentAnnotationSettings,
  alignmentAnnotationLabelVisibility: {
    features: false,
    parts: false,
    cutsites: false
  },
  pairwise_alignmentAnnotationLabelVisibility: {
    features: false,
    parts: false,
    cutsites: false
  }
};
var defaultVisibilityTypes = Object.keys(defaultVisibilities);

try {
  defaultVisibilityTypes.forEach(function (type) {
    var newVal = JSON.parse(window.localStorage.getItem(type));
    if (newVal) defaultVisibilities[type] = _extends({}, defaultVisibilities[type], newVal);
  });
} catch (e) {
  console.error("error setting localstorage visibility config", e);
}

// ------------------------------------
// Actions
// ------------------------------------
var upsertAlignmentRun = exports.upsertAlignmentRun = (0, _reduxAct.createAction)("UPSERT_ALIGNMENT_RUN");
var updateAlignmentViewVisibility = exports.updateAlignmentViewVisibility = (0, _reduxAct.createAction)("UPDATE_ALIGNMENT_VIEW_VISIBILITY");
var alignmentRunUpdate = exports.alignmentRunUpdate = (0, _reduxAct.createAction)("ALIGNMENT_RUN_UPDATE");

var highlightRangeProps = {
  color: "red",
  hideCarets: true,
  ignoreGaps: true
};
function addHighlightedDifferences(alignmentTracks) {
  return alignmentTracks.map(function (track) {
    var sequenceData = (0, _veSequenceUtils.tidyUpSequenceData)(track.sequenceData);
    var matchHighlightRanges = getRangeMatchesBetweenTemplateAndNonTemplate(alignmentTracks[0].alignmentData.sequence, track.alignmentData.sequence);
    // .filter by the user-specified mismatch overrides (initially [])
    var mismatches = matchHighlightRanges.filter(function (_ref) {
      var isMatch = _ref.isMatch;
      return !isMatch;
    });
    return _extends({}, track, {
      sequenceData: sequenceData,
      matchHighlightRanges: matchHighlightRanges,
      additionalSelectionLayers: matchHighlightRanges.filter(function (_ref2) {
        var isMatch = _ref2.isMatch;
        return !isMatch;
      }).map(function (range) {
        return _extends({}, range, highlightRangeProps);
      }),
      mismatches: mismatches
    });
  });
}

// alignmentTracks = addHighlightedDifferences(alignmentTracks);

// ------------------------------------
// Reducer
// ------------------------------------

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref3 = arguments[1];
  var _ref3$payload = _ref3.payload,
      payload = _ref3$payload === undefined ? {} : _ref3$payload,
      type = _ref3.type;

  if (type === "ALIGNMENT_RUN_UPDATE") {
    var alignmentId = payload.alignmentId;

    var newState = _extends({}, state, _defineProperty({}, alignmentId, _extends({}, state[alignmentId], payload)));
    return newState;
  }

  if (type === "UPDATE_ALIGNMENT_VIEW_VISIBILITY") {
    defaultVisibilityTypes.forEach(function (type) {
      if (type.startsWith("pairwise_") && payload.pairwiseAlignments || !type.startsWith("pairwise_") && !payload.pairwiseAlignments) {
        defaultVisibilities[type] = _extends({}, defaultVisibilities[type], payload[type.replace("pairwise_", "")]);

        localStorage.setItem(type, JSON.stringify(_extends({}, defaultVisibilities[type], payload[type.replace("pairwise_", "")])));
      }
    });
    return _extends({}, state, _defineProperty({}, payload.id, _extends({}, payload)));
  }

  if (type === "UPSERT_ALIGNMENT_RUN") {
    var payloadToUse = _extends({}, defaultVisibilityTypes.reduce(function (acc, type) {
      if (type.startsWith("pairwise_") && payload.pairwiseAlignments || !type.startsWith("pairwise_") && !payload.pairwiseAlignments) {
        acc[type.replace("pairwise_", "")] = defaultVisibilities[type];
      }
      return acc;
    }, {}), payload);
    if (payloadToUse.pairwiseAlignments) {
      if (payloadToUse.pairwiseAlignments[0][0].alignmentData.matchStart !== undefined) {
        payloadToUse.pairwiseAlignments = payloadToUse.pairwiseAlignments.map(_addDashesForMatchStartAndEndForTracks2.default);
      }
      var templateSeq = payloadToUse.pairwiseAlignments[0][0];
      //we need to get all of the sequences in a single alignment (turning inserts into single BP red highlights)
      var pairwiseOverviewAlignmentTracks = [_extends({}, templateSeq, {
        sequenceData: (0, _veSequenceUtils.tidyUpSequenceData)(templateSeq.sequenceData),
        alignmentData: { sequence: templateSeq.sequenceData.sequence //remove the gaps from the template sequence
        } })]; // start with just the template seq in there!

      payloadToUse.pairwiseAlignments.forEach(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            template = _ref5[0],
            alignedSeq = _ref5[1];

        var condensedSeq = (0, _veSequenceUtils.condensePairwiseAlignmentDifferences)(template.alignmentData.sequence, alignedSeq.alignmentData.sequence);
        var re = /r+/gi;
        var match = void 0;
        var additionalSelectionLayers = [];
        while ((match = re.exec(condensedSeq)) != null) {
          additionalSelectionLayers.push(_extends({
            start: match.index,
            end: match.index + match[0].length - 1
          }, highlightRangeProps));
        }
        re = /g+/gi;
        // let match;
        while ((match = re.exec(condensedSeq)) != null) {
          additionalSelectionLayers.push(_extends({
            start: match.index,
            end: match.index + match[0].length - 1
          }, highlightRangeProps, {
            color: "grey"
          }));
        }

        var alignedSeqMinusInserts = _extends({}, alignedSeq, {
          sequenceData: _extends({}, (0, _veSequenceUtils.tidyUpSequenceData)(alignedSeq.sequenceData), {
            sequence: template.sequenceData.sequence
          }),
          additionalSelectionLayers: additionalSelectionLayers,
          alignmentData: {
            sequence: condensedSeq
          }
        });
        pairwiseOverviewAlignmentTracks.push(alignedSeqMinusInserts);
      });
      payloadToUse.pairwiseOverviewAlignmentTracks = pairwiseOverviewAlignmentTracks;
      payloadToUse.pairwiseAlignments = payloadToUse.pairwiseAlignments.map(addHighlightedDifferences);
    }
    if (payloadToUse.alignmentTracks) {
      payloadToUse.alignmentTracks = addHighlightedDifferences(payloadToUse.alignmentTracks);
    }
    //check for issues
    var hasError = checkForIssues(payloadToUse.alignmentTracks, payload.alignmentType);
    (payloadToUse.pairwiseAlignments || []).forEach(function (alignment) {
      var error = alignment;
      if (error) {
        hasError = error;
      }
    });

    // payloadToUse.pairwiseAlignments && magicDownload(JSON.stringify(payloadToUse), 'myFile.json')
    return _extends({}, state, _defineProperty({}, payload.id, _extends({}, payloadToUse, { hasError: hasError })));
  }
  return state;
};

//returns an array like so: [{start: 0, end: 4, isMatch: false}, {start,end,isMatch} ... etc]


function getRangeMatchesBetweenTemplateAndNonTemplate(tempSeq, nonTempSeq) {
  //assume all sequences are the same length (with gap characters "-" in some places)
  //loop through all non template sequences and compare them with the template

  var seqLength = nonTempSeq.length;
  var ranges = [];
  // const startIndex = "".match/[-]/ Math.max(0, .indexOf("-"));
  var nonTempSeqWithoutLeadingDashes = nonTempSeq.replace(/^-+/g, "");
  var nonTempSeqWithoutTrailingDashes = nonTempSeq.replace(/-+$/g, "");

  var startIndex = seqLength - nonTempSeqWithoutLeadingDashes.length;
  var endIndex = seqLength - (seqLength - nonTempSeqWithoutTrailingDashes.length);
  for (var index = startIndex; index < endIndex; index++) {
    var isMatch = tempSeq[index].toLowerCase() === nonTempSeq[index].toLowerCase();
    var previousRange = ranges[ranges.length - 1];
    if (previousRange) {
      if (previousRange.isMatch === isMatch) {
        previousRange.end++;
      } else {
        ranges.push({
          start: index,
          end: index,
          isMatch: isMatch
        });
      }
    } else {
      ranges.push({
        start: startIndex,
        end: startIndex,
        isMatch: isMatch
      });
    }
  }
  return ranges;
}

function checkForIssues(alignmentTracks, alignmentType) {
  if (!alignmentTracks || !alignmentTracks[0] || !alignmentTracks[0].alignmentData) {
    return;
  }

  var alignmentTrackLength = alignmentTracks[0].alignmentData.sequence.length;
  var hasError = void 0;
  alignmentTracks.some(function (track) {
    if (track.alignmentData.sequence.length !== alignmentTrackLength) {
      console.error("incorrect length", alignmentTracks);

      return "incorrect length";
    }
    if (track.chromatogramData && track.sequenceData.sequence.length !== track.chromatogramData.baseCalls.length) {
      console.error("incorrect chromatogram length", alignmentTracks);

      return "incorrect chromatogram length";
    }
    if (alignmentType !== "Parallel Part Creation" && track.sequenceData.sequence.length !== track.alignmentData.sequence.replace(/-/g, "").length) {
      console.error("sequence data length does not match alignment data w/o gaps");
      console.error("track.sequenceData.sequence:", track.sequenceData.sequence);
      console.error("track.sequenceData.sequence.length:", track.sequenceData.sequence.length);
      console.error("track.alignmentData.sequence:", track.alignmentData.sequence);
      console.error('track.alignmentData.sequence.replace(/-/g,""):', track.alignmentData.sequence.replace(/-/g, ""));
      console.error('track.alignmentData.sequence.replace(/-/g,"").length:', track.alignmentData.sequence.replace(/-/g, "").length);
      hasError = "sequence data length does not match alignment data w/o gaps";
      return true;
    }
    return false;
  });
  if (hasError) {
    return hasError;
  }
}