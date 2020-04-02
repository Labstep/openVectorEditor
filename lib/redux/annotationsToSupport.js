"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.annotationSupportOff = exports.annotationSupportOn = exports.annotationSupportToggle = undefined;

var _createMergedDefaultS;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createMetaAction = require("./utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

var _createMergedDefaultStateReducer = require("./utils/createMergedDefaultStateReducer");

var _createMergedDefaultStateReducer2 = _interopRequireDefault(_createMergedDefaultStateReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//this determines whether or not to
var initialSupportedTypes = {
  parts: true,
  features: true,
  translations: true,
  primers: true,
  cutsites: true,
  orfs: true
};

// ------------------------------------
// Actions
// ------------------------------------
var annotationSupportToggle = exports.annotationSupportToggle = (0, _createMetaAction2.default)("annotationSupportToggle");
//eg: annotationSupportToggle('features')
var annotationSupportOn = exports.annotationSupportOn = (0, _createMetaAction2.default)("annotationSupportOn");
var annotationSupportOff = exports.annotationSupportOff = (0, _createMetaAction2.default)("annotationSupportOff");

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _createMergedDefaultStateReducer2.default)((_createMergedDefaultS = {}, _defineProperty(_createMergedDefaultS, annotationSupportToggle, function (state, payload) {
  return _extends({}, state, _defineProperty({}, payload, !state[payload]));
}), _defineProperty(_createMergedDefaultS, annotationSupportOn, function (state, payload) {
  return _extends({}, state, _defineProperty({}, payload, false));
}), _defineProperty(_createMergedDefaultS, annotationSupportOff, function (state, payload) {
  return _extends({}, state, _defineProperty({}, payload, true));
}), _createMergedDefaultS), initialSupportedTypes);