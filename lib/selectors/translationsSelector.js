"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require("lodash");

var _uniqid = require("uniqid");

var _uniqid2 = _interopRequireDefault(_uniqid);

var _sequenceSelector = require("./sequenceSelector");

var _sequenceSelector2 = _interopRequireDefault(_sequenceSelector);

var _orfsSelector = require("./orfsSelector");

var _orfsSelector2 = _interopRequireDefault(_orfsSelector);

var _reselect = require("reselect");

var _veSequenceUtils = require("ve-sequence-utils");

var _each = require("lodash/each");

var _each2 = _interopRequireDefault(_each);

var _translationsRawSelector = require("./translationsRawSelector");

var _translationsRawSelector2 = _interopRequireDefault(_translationsRawSelector);

var _translationSearchMatchesSelector = require("./translationSearchMatchesSelector");

var _translationSearchMatchesSelector2 = _interopRequireDefault(_translationSearchMatchesSelector);

var _veRangeUtils = require("ve-range-utils");

var _cdsFeaturesSelector = require("./cdsFeaturesSelector");

var _cdsFeaturesSelector2 = _interopRequireDefault(_cdsFeaturesSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function translationsSelector(translationSearchMatches, sequence, orfs, showOrfTranslations, showOrfs, cdsFeatures, showCdsFeatureTranslations, showFeatures, translations, frameTranslations) {
  var translationsToPass = _extends({}, translationSearchMatches.reduce(function (acc, match) {
    if (!match) return acc;
    var id = match.id || (0, _uniqid2.default)();
    acc[id] = _extends({}, match, {
      id: id,
      translationType: "AA Search Match",
      isOrf: true, //pass isOrf = true here in order to not have it show up in the properties window
      forward: !match.bottomStrand
    });
    return acc;
  }, {}), (0, _lodash.reduce)(translations, function (acc, translation) {
    if (!translation.isOrf) {
      acc[translation.id] = _extends({}, translation, {
        translationType: "User Created"
      });
    }
    return acc;
  }, {}), showOrfTranslations && showOrfs ? (0, _lodash.reduce)(orfs, function (acc, orf) {
    acc[orf.id] = _extends({}, orf, { translationType: "ORF" });
    return acc;
  }, {}) : {}, showCdsFeatureTranslations && showFeatures && (0, _lodash.reduce)(cdsFeatures, function (acc, cdsFeature) {
    acc[cdsFeature.id] = _extends({}, cdsFeature, {
      translationType: "CDS Feature"
    });
    return acc;
  }, {}), (0, _lodash.reduce)(frameTranslations, function (acc, isActive, frameName) {
    var frameOffset = Number(frameName);
    if (isActive) {
      var id = (0, _uniqid2.default)();
      acc[id] = {
        id: id,
        start: 0 + Math.abs(frameOffset) - 1,
        end: (0, _veRangeUtils.normalizePositionByRangeLength)(sequence.length - 1 + Math.abs(frameOffset) - 1, sequence.length),
        translationType: "Frame",
        forward: frameOffset > 0,
        isOrf: true //pass isOrf = true here in order to not have it show up in the properties window
      };
    }
    return acc;
  }, {}));
  (0, _each2.default)(translationsToPass, function (translation) {
    translation.aminoAcids = (0, _veSequenceUtils.getAminoAcidDataForEachBaseOfDna)(sequence, translation.forward, translation);
  });
  return translationsToPass;
}

exports.default = (0, _reselect.createSelector)(_translationSearchMatchesSelector2.default, _sequenceSelector2.default, _orfsSelector2.default, function (state) {
  return state.annotationVisibility.orfTranslations;
}, function (state) {
  return state.annotationVisibility.orfs;
}, _cdsFeaturesSelector2.default, function (state) {
  return state.annotationVisibility.cdsFeatureTranslations;
}, function (state) {
  return state.annotationVisibility.features;
}, _translationsRawSelector2.default, function (state) {
  return state.frameTranslations;
}, function (state) {
  return state.sequenceData.isProtein;
}, function (state) {
  return state.sequenceData.proteinSequence;
}, translationsSelector);
module.exports = exports["default"];