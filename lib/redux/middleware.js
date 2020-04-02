"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//vectorEditorMiddleware
//used to add undo/redo abilities to OVE

// To Batch actions together use this api:
// deleteFeature([id1, id2], {
//   batchUndoStart: true
// });
// upsertFeature(
// {
//   ...feat1,
//   id: uuid(),
//   start: start - 1,
//   end: end - 1,
//   name
// },
// {
//   batchUndoEnd: true
// }
// );

exports.default = function (store) {
  return function (next) {
    return function (action) {
      if (action.meta && action.meta.disregardUndo) {
        return next(action);
      }
      var disregardUndo = true;
      if (action.type === "VE_UNDO" || action.type === "VE_REDO") {
        var _store$getState = store.getState(),
            VectorEditor = _store$getState.VectorEditor;

        var editorName = action.meta.editorName;
        var editorState = VectorEditor[editorName];
        var stack = editorState.sequenceDataHistory[action.type === "VE_UNDO" ? "past" : "future"] || [];
        var stateToUse = stack[stack.length - 1];
        store.dispatch({
          type: action.type === "VE_UNDO" ? "VE_UNDO_META" : "VE_REDO_META",
          payload: {
            sequenceData: editorState.sequenceData,
            selectionLayer: editorState.selectionLayer,
            caretPosition: editorState.caretPosition
          },
          meta: { editorName: editorName, disregardUndo: disregardUndo }
        });
        store.dispatch({
          type: "SEQUENCE_DATA_UPDATE",
          payload: stateToUse.sequenceData,
          meta: { editorName: editorName, disregardUndo: disregardUndo }
        });
        if (stateToUse.caretPosition > -1) {
          store.dispatch({
            type: "CARET_POSITION_UPDATE",
            payload: stateToUse.caretPosition,
            meta: { editorName: editorName, disregardUndo: disregardUndo }
          });
        } else {
          store.dispatch({
            type: "SELECTION_LAYER_UPDATE",
            payload: _extends({}, stateToUse.selectionLayer, { forceUpdate: Math.random() }),
            meta: { editorName: editorName, disregardUndo: disregardUndo }
          });
        }
        store.dispatch({
          type: "VE_SEQUENCE_CHANGED", //used for external autosave functionality
          payload: {
            sequenceData: stateToUse.sequenceData,
            editorName: editorName
          },
          meta: { editorName: editorName, disregardUndo: true }
        });
        return next(action);
      } else {
        //pass batchUndoStart, batchUndoMiddle and batchUndoEnd to group actions together
        var _ref = action.meta || {},
            batchUndoEnd = _ref.batchUndoEnd,
            batchUndoStart = _ref.batchUndoStart,
            batchUndoMiddle = _ref.batchUndoMiddle;
        //get editor state(s)


        var OldVectorEditor = store.getState().VectorEditor;
        var result = next(action);
        var NewVectorEditor = store.getState().VectorEditor;
        Object.keys(NewVectorEditor).forEach(function (editorName) {
          var newEditorState = NewVectorEditor[editorName];
          var oldEditorState = OldVectorEditor[editorName];
          if (oldEditorState && oldEditorState.sequenceData && oldEditorState.sequenceData !== newEditorState.sequenceData) {
            var sequenceData = oldEditorState.sequenceData,
                selectionLayer = oldEditorState.selectionLayer,
                caretPosition = oldEditorState.caretPosition;

            !batchUndoEnd && !batchUndoMiddle && store.dispatch({
              type: "ADD_TO_UNDO_STACK",
              payload: {
                selectionLayer: selectionLayer,
                sequenceData: sequenceData,
                caretPosition: caretPosition
              },
              meta: { editorName: editorName, disregardUndo: disregardUndo }
            });
            !batchUndoStart && !batchUndoMiddle && store.dispatch({
              type: "VE_SEQUENCE_CHANGED", //used for external autosave functionality
              payload: {
                sequenceData: newEditorState.sequenceData,
                editorName: editorName
              },
              meta: { editorName: editorName, disregardUndo: true }
            });
          }
        });
        return result;
      }
    };
  };
};

module.exports = exports["default"];