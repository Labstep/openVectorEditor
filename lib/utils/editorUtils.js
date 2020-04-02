"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSelectionMessage = getSelectionMessage;
exports.preventDefaultStopPropagation = preventDefaultStopPropagation;
exports.getNodeToRefocus = getNodeToRefocus;
exports.getEmptyText = getEmptyText;
exports.tryToRefocusEditor = tryToRefocusEditor;

var _veRangeUtils = require("ve-range-utils");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _proteinUtils = require("./proteinUtils");

var _veSequenceUtils = require("ve-sequence-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSelectionMessage(_ref) {
  var _ref$caretPosition = _ref.caretPosition,
      caretPosition = _ref$caretPosition === undefined ? -1 : _ref$caretPosition,
      _ref$selectionLayer = _ref.selectionLayer,
      selectionLayer = _ref$selectionLayer === undefined ? { start: -1, end: -1 } : _ref$selectionLayer,
      customTitle = _ref.customTitle,
      sequenceLength = _ref.sequenceLength,
      sequenceData = _ref.sequenceData,
      showGCContent = _ref.showGCContent,
      GCDecimalDigits = _ref.GCDecimalDigits,
      isProtein = _ref.isProtein;

  var isSelecting = selectionLayer.start > -1;
  if (isSelecting) {
    var length = (0, _veRangeUtils.getRangeLength)(selectionLayer, sequenceLength);
    var GCContent = function GCContent() {
      var numDecimalDigits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return (0, _veSequenceUtils.calculatePercentGC)((0, _veSequenceUtils.getSequenceDataBetweenRange)(sequenceData, selectionLayer).sequence).toFixed(numDecimalDigits);
    };
    var seqLen = (0, _proteinUtils.divideBy3)(length, isProtein);
    return (customTitle || "Selecting") + " " + seqLen + " " + ((isProtein ? "AA" : "bp") + (seqLen === 1 ? "" : "s")) + " from " + ((0, _proteinUtils.divideBy3)(selectionLayer.start, isProtein) + 1) + " to " + (0, _proteinUtils.divideBy3)(selectionLayer.end + 1, isProtein) + (showGCContent && !isProtein ? " (" + GCContent(GCDecimalDigits) + "% GC)" : "");
  } else if (caretPosition > -1) {
    var insertBetween = (0, _veSequenceUtils.getInsertBetweenVals)(caretPosition, selectionLayer, sequenceLength);
    return "Caret Between " + (isProtein ? "AAs " + (0, _proteinUtils.divideBy3)(insertBetween[0], true) + " and " + (0, _proteinUtils.divideBy3)(insertBetween[1] + 2, true) : "Bases " + insertBetween[0] + " and " + insertBetween[1]);
  } else {
    return "No Selection";
  }
}

function preventDefaultStopPropagation(e) {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
}

function getNodeToRefocus(caretEl) {
  var nodeToReFocus = void 0;
  if (caretEl && caretEl.closest && caretEl.closest(".veVectorInteractionWrapper")) {
    nodeToReFocus = caretEl.closest(".veVectorInteractionWrapper");
  }
  return nodeToReFocus;
}

function getEmptyText(_ref2) {
  var sequenceData = _ref2.sequenceData,
      caretPosition = _ref2.caretPosition;

  return sequenceData.sequence.length === 0 && caretPosition === -1 ? _react2.default.createElement(
    "div",
    { className: "veEmptySeqText" },
    "Insert Sequence Here"
  ) : null;
}

function tryToRefocusEditor() {
  var ed = document.querySelector(".veVectorInteractionWrapper");
  ed && ed.focus();
}