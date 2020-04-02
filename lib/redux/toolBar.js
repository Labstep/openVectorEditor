"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openToolbarItemUpdate = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createMetaAction = require("./utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

var _createMergedDefaultStateReducer = require("./utils/createMergedDefaultStateReducer");

var _createMergedDefaultStateReducer2 = _interopRequireDefault(_createMergedDefaultStateReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ------------------------------------
// Actions
// ------------------------------------
var openToolbarItemUpdate = exports.openToolbarItemUpdate = (0, _createMetaAction2.default)("openToolbarItemUpdate");

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _createMergedDefaultStateReducer2.default)(_defineProperty({}, openToolbarItemUpdate, function (state, payload) {
  return _extends({}, state, {
    openItem: payload
  });
}), {
  openItem: ""
});