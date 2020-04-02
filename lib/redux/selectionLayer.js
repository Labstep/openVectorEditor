"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectionLayerUpdate = exports.selectionLayerClear = undefined;

var _createReducer;

var _reduxAct = require("redux-act");

var _createMetaAction = require("./utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //./selectionLayer.js


// ------------------------------------
// Actions
// ------------------------------------
var selectionLayerClear = exports.selectionLayerClear = (0, _createMetaAction2.default)("SELECTION_LAYER_CLEAR");
var selectionLayerUpdate = exports.selectionLayerUpdate = (0, _createMetaAction2.default)("SELECTION_LAYER_UPDATE");

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)((_createReducer = {
  CARET_POSITION_UPDATE: function CARET_POSITION_UPDATE() {
    //clear the selection layer if the caret is updated!
    return {
      start: -1,
      end: -1
    };
  }
}, _defineProperty(_createReducer, selectionLayerClear, function () {
  return {
    start: -1,
    end: -1
  };
}), _defineProperty(_createReducer, selectionLayerUpdate, function (state, newSelectionLayer) {
  if (!newSelectionLayer || !(newSelectionLayer.start >= 0 && newSelectionLayer.end >= 0)) {
    console.error("we should never be here! selectionLayerUpdate must always be called with a valid selection layer");
    return state;
  }
  return newSelectionLayer;
}), _createReducer), {
  start: -1,
  end: -1
});