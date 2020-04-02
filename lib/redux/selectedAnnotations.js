"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.annotationDeselectAll = exports.annotationDeselect = exports.updateSelectedAnnotation = exports.annotationSelect = undefined;

var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.replacementLayerRightClicked = replacementLayerRightClicked;

var _teselagenReactComponents = require("teselagen-react-components");

var _without = require("lodash/without");

var _without2 = _interopRequireDefault(_without);

var _reduxAct = require("redux-act");

var _createMetaAction = require("./utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ------------------------------------
// Actions
// ------------------------------------
var annotationSelect = exports.annotationSelect = (0, _createMetaAction2.default)("VE_ANNOTATION_SELECT");
var updateSelectedAnnotation = exports.updateSelectedAnnotation = (0, _createMetaAction2.default)("VE_ANNOTATION_UPDATE_SELECTED");
var annotationDeselect = exports.annotationDeselect = (0, _createMetaAction2.default)("VE_ANNOTATION_DESELECT");
var annotationDeselectAll = exports.annotationDeselectAll = (0, _createMetaAction2.default)("VE_ANNOTATION_DESELECT_ALL");

function replacementLayerRightClicked(_ref, meta) {
  var event = _ref.event,
      annotation = _ref.annotation;

  event.preventDefault();
  event.stopPropagation();
  return function (dispatch /* getState */) {
    var items = [{
      text: "Remove Edit",
      onClick: function onClick() {
        dispatch({
          type: "REPLACEMENT_LAYER_DELETE",
          meta: meta,
          payload: _extends({}, annotation)
        });
      }
    }];

    (0, _teselagenReactComponents.showContextMenu)(items, undefined, event);
  };
}

// ------------------------------------
// Reducer
// ------------------------------------
var startingState = {
  idMap: {},
  idStack: []
};
exports.default = (0, _reduxAct.createReducer)((_createReducer = {}, _defineProperty(_createReducer, annotationSelect, function (state, payload) {
  if (!payload.id) throw new Error("Annotation must have an id!");
  var newState = {
    idMap: _extends({}, state.idMap, _defineProperty({}, payload.id, payload)),
    idStack: [].concat(_toConsumableArray(state.idStack), [payload.id])
  };
  return newState;
}), _defineProperty(_createReducer, annotationDeselect, function (state, payload) {
  var id = payload.id || payload;
  var idMap = _extends({}, state.idMap);
  delete idMap[id];
  var idStack = (0, _without2.default)(state.idStack, id);
  return {
    idMap: idMap,
    idStack: idStack
  };
}), _defineProperty(_createReducer, updateSelectedAnnotation, function (state, payload) {
  var id = payload.id;
  var idMap = _extends({}, state.idMap);
  if (!idMap[id]) {
    return state;
  }
  return {
    idMap: _extends({}, idMap, _defineProperty({}, id, _extends({}, idMap[id], payload))),
    idStack: state.idStack
  };
}), _defineProperty(_createReducer, annotationDeselectAll, function () {
  return startingState;
}), _createReducer), startingState);