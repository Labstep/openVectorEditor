"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetFeatureTypesToHide = exports.showFeatureTypes = exports.hideFeatureTypes = exports.annotationVisibilityShow = exports.annotationVisibilityHide = exports.annotationVisibilityToggle = exports.visibilityDefaultValues = undefined;

var _createMergedDefaultS;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//./caretPosition.js

var _lodash = require("lodash");

var _createMetaAction = require("./utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

var _createMergedDefaultStateReducer = require("./utils/createMergedDefaultStateReducer");

var _createMergedDefaultStateReducer2 = _interopRequireDefault(_createMergedDefaultStateReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var visibilityDefaultValues = exports.visibilityDefaultValues = {
  featureTypesToHide: {},
  features: true,
  warnings: true,
  assemblyPieces: true,
  lineageAnnotations: true,
  translations: true,
  parts: true,
  orfs: false,
  orfTranslations: false,
  cdsFeatureTranslations: true,
  axis: true,
  cutsites: true,
  cutsitesInSequence: true,
  primers: true,
  dnaColors: false,
  sequence: true,
  reverseSequence: true,
  axisNumbers: true
};

// ------------------------------------
// Actions
// ------------------------------------
var annotationVisibilityToggle = exports.annotationVisibilityToggle = (0, _createMetaAction2.default)("annotationVisibilityToggle");
//eg: annotationVisibilityToggle('features')
var annotationVisibilityHide = exports.annotationVisibilityHide = (0, _createMetaAction2.default)("annotationVisibilityHide");
var annotationVisibilityShow = exports.annotationVisibilityShow = (0, _createMetaAction2.default)("annotationVisibilityShow");
var hideFeatureTypes = exports.hideFeatureTypes = (0, _createMetaAction2.default)("hideFeatureTypes");
var showFeatureTypes = exports.showFeatureTypes = (0, _createMetaAction2.default)("showFeatureTypes");
var resetFeatureTypesToHide = exports.resetFeatureTypesToHide = (0, _createMetaAction2.default)("resetFeatureTypesToHide");

// ------------------------------------
// Reducer
// ------------------------------------
var annotationVisibility = (0, _createMergedDefaultStateReducer2.default)((_createMergedDefaultS = {}, _defineProperty(_createMergedDefaultS, resetFeatureTypesToHide, function (state) {
  return _extends({}, state, {
    featureTypesToHide: {}
  });
}), _defineProperty(_createMergedDefaultS, showFeatureTypes, function (state, payload) {
  return _extends({}, state, {
    featureTypesToHide: (0, _lodash.omit)(state.featureTypesToHide, payload)
  });
}), _defineProperty(_createMergedDefaultS, hideFeatureTypes, function (state, payload) {
  return _extends({}, state, {
    featureTypesToHide: _extends({}, state.featureTypesToHide, payload.reduce(function (acc, key) {
      acc[key] = true;
      return acc;
    }, {}))
  });
}), _defineProperty(_createMergedDefaultS, annotationVisibilityToggle, function (state, payload) {
  return _extends({}, state, _defineProperty({}, payload, !state[payload]));
}), _defineProperty(_createMergedDefaultS, annotationVisibilityHide, function (state, payload) {
  return _extends({}, state, _defineProperty({}, payload, false));
}), _defineProperty(_createMergedDefaultS, annotationVisibilityShow, function (state, payload) {
  return _extends({}, state, _defineProperty({}, payload, true));
}), _createMergedDefaultS), visibilityDefaultValues);

exports.default = annotationVisibility;