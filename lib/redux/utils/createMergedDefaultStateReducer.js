"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createMergedDefaultStateReducer;

var _reduxAct = require("redux-act");

//simple wrapper function around createReducer to always keep around the default state unless specifically overridden
// example:
// defaultState = {features: true, parts: true}
// newState = {features: false}
// stateToUse = {features: false, parts: true}
// instead of
// stateToUse = {features: false}
// these will also be handled differently in the reducer. The __shouldUseMergedState
// attribute will make them not clear unless full overwritten
function createMergedDefaultStateReducer(handlers, defaultState) {
  var reducer = (0, _reduxAct.createReducer)(handlers);
  function enhancedReducer() {
    var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    return reducer(_extends({}, defaultState, newState), action);
  }
  enhancedReducer.__shouldUseMergedState = true;
  return enhancedReducer;
}
module.exports = exports["default"];