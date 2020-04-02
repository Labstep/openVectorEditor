"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleExternalLabels = undefined;

var _reduxAct = require("redux-act");

var _createMetaAction = require("./utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ------------------------------------
// Actions
// ------------------------------------
var toggleExternalLabels = exports.toggleExternalLabels = (0, _createMetaAction2.default)("toggleExternalLabels");

var newVal = window.localStorage.getItem("externalLabels");

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)(_defineProperty({}, toggleExternalLabels, function (state, payload) {
  localStorage.setItem("externalLabels", payload);
  return payload;
}), newVal || "noPreference" //  noPreference || true || false
);