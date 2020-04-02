"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _veSequenceUtils = require("ve-sequence-utils");

var _sequenceSelector = require("./sequenceSelector");

var _sequenceSelector2 = _interopRequireDefault(_sequenceSelector);

var _reselect = require("reselect");

var _circularSelector = require("./circularSelector");

var _circularSelector2 = _interopRequireDefault(_circularSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function searchLayersSelector(sequence, isCircular, isOpen, searchString, ambiguousOrLiteral, dnaOrAA, isProtein, proteinSequence) {
  if (!searchString || !isOpen) {
    return [];
  }
  if (isProtein) {
    var searchingDna = dnaOrAA === "DNA";
    var _matches = (0, _veSequenceUtils.findSequenceMatches)(searchingDna ? sequence : proteinSequence, searchString, {
      isCircular: false,
      isProteinSequence: true,
      isAmbiguous: ambiguousOrLiteral === "AMBIGUOUS",
      // isProteinSearch: dnaOrAA !== "DNA",
      searchReverseStrand: false
    }).sort(function (_ref, _ref2) {
      var start = _ref.start;
      var start2 = _ref2.start;

      return start - start2;
    });
    return searchingDna ? _matches : _matches.map(function (_ref3) {
      var start = _ref3.start,
          end = _ref3.end,
          rest = _objectWithoutProperties(_ref3, ["start", "end"]);

      return _extends({}, rest, {
        isSearchLayer: true,
        start: start * 3,
        end: end * 3 + 2
      });
    });
  }
  var matches = (0, _veSequenceUtils.findSequenceMatches)(sequence, searchString, {
    isCircular: isCircular,
    isAmbiguous: ambiguousOrLiteral === "AMBIGUOUS",
    isProteinSearch: dnaOrAA !== "DNA",
    searchReverseStrand: true
  }).sort(function (_ref4, _ref5) {
    var start = _ref4.start;
    var start2 = _ref5.start;

    return start - start2;
  });
  return matches.map(function (match) {
    return _extends({}, match, {
      className: "veSearchLayer " + (match.bottomStrand ? " veSearchLayerBottomStrand" : ""),
      isSearchLayer: true
    });
  });
}

exports.default = (0, _reselect.createSelector)(_sequenceSelector2.default, _circularSelector2.default, function (state) {
  return state.findTool && state.findTool.isOpen;
}, function (state) {
  return state.findTool && state.findTool.searchText;
}, function (state) {
  return state.findTool && state.findTool.ambiguousOrLiteral;
}, function (state) {
  return state.findTool && state.findTool.dnaOrAA;
}, function (state) {
  return state.sequenceData.isProtein;
}, function (state) {
  return state.sequenceData.proteinSequence;
}, searchLayersSelector);
module.exports = exports["default"];