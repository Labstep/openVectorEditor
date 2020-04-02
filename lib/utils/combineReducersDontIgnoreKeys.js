"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = combineReducersDontIgnoreKeys;
function combineReducersDontIgnoreKeys(reducers) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    var newState = Object.keys(reducers).reduce(function (acc, key) {
      acc[key] = reducers[key](state[key], action);
      return acc;
    }, {});
    return _extends({}, state, newState);
  };
}
module.exports = exports["default"];