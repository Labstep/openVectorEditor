"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertiesViewTabUpdate = undefined;

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
// export const propertiesViewToggle = createAction(
//   "TOGGLE_PROPERTIES_VIEW",
//   () => {}
// ); //NOTE!!:: second argument sanitizes actions so no payload is passed
// export const propertiesViewOpen = createAction(
//   "Open_PROPERTIES_VIEW",
//   () => {}
// ); //NOTE!!:: second argument sanitizes actions so no payload is passed
var propertiesViewTabUpdate = exports.propertiesViewTabUpdate = (0, _createMetaAction2.default)("propertiesViewTabUpdate"); //NOTE!!:: second argument sanitizes actions so no payload is passed

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _createMergedDefaultStateReducer2.default)(_defineProperty({}, propertiesViewTabUpdate, function (state, tabId, selectedAnnotationOrAnnotationId) {
  return _extends({}, state, {
    selectedAnnotationId: selectedAnnotationOrAnnotationId ? selectedAnnotationOrAnnotationId.id || selectedAnnotationOrAnnotationId : undefined,
    tabId: tabId
  });
}), {
  propertiesSideBarOpen: false,
  // propertiesSideBarOpen: true,
  tabId: "general"
});