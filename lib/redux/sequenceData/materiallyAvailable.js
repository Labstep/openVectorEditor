"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAvailability = undefined;

var _reduxAct = require("redux-act");

var _createMetaAction = require("../utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ------------------------------------
// Actions
// ------------------------------------
var updateAvailability = exports.updateAvailability = (0, _createMetaAction2.default)("updateAvailability");

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)(_defineProperty({}, updateAvailability, function (state, payload) {
  return payload;
}), true);