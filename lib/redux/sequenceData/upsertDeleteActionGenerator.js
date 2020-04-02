"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = upsertDeleteActionGenerator;

var _omit = require("lodash/omit");

var _omit2 = _interopRequireDefault(_omit);

var _uniqid = require("uniqid");

var _uniqid2 = _interopRequireDefault(_uniqid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ------------------------------------
// Reducer
// ------------------------------------
function upsertDeleteActionGenerator(upsertAction, deleteAction) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, upsertAction, function (state, payload) {
    var idToUse = payload.id || (0, _uniqid2.default)();
    return _extends({}, state, _defineProperty({}, idToUse, _extends({}, state[idToUse] || {}, payload, { id: idToUse })));
  }), _defineProperty(_ref, deleteAction, function (state, payload) {
    var ids = void 0;
    if (Array.isArray(payload)) {
      ids = payload.map(function (val) {
        return val.id || val;
      });
    } else {
      ids = [payload.id || payload];
    }
    return (0, _omit2.default)(state, ids);
  }), _ref;
}
module.exports = exports["default"];