"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultCopyOptions = exports.toggleCopyOption = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //./caretPosition.js


var _reduxAct = require("redux-act");

var _createMetaAction = require("./utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ------------------------------------
// Actions
// ------------------------------------
var toggleCopyOption = exports.toggleCopyOption = (0, _createMetaAction2.default)("TOGGLE_COPY_OPTION"); //NOTE!!:: second argument sanitizes actions so no payload is passed

var defaultCopyOptions = exports.defaultCopyOptions = {
  features: true,
  partialFeatures: true,
  parts: true,
  partialParts: true
};

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)(_defineProperty({}, toggleCopyOption, function (state, type) {
  return _extends({}, state, type === "partialFeatures" && !state[type] && { features: true }, type === "partialParts" && !state[type] && { parts: true }, type === "features" && { partialFeatures: !state[type] }, type === "parts" && { partialParts: !state[type] }, _defineProperty({}, type, !state[type]));
}), defaultCopyOptions);