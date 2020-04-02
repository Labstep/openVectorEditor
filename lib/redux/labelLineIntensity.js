"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeLabelLineIntensity = undefined;

var _reduxAct = require("redux-act");

var _createMetaAction = require("./utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ------------------------------------
// Actions
// ------------------------------------
var changeLabelLineIntensity = exports.changeLabelLineIntensity = (0, _createMetaAction2.default)("changeLabelLineIntensity");

var newVal = window.localStorage.getItem("labelLineIntensity");

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)(_defineProperty({}, changeLabelLineIntensity, function (state, payload) {
  localStorage.setItem("labelLineIntensity", payload);
  return payload;
}), newVal ? parseFloat(newVal) : 0.1 //  0.1 (low) || 0.4 (med) || 0.7 (high) || 1.0 (full)
);