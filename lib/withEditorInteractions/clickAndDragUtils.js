"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editorDragStopped = exports.editorDragStarted = exports.editorClicked = exports.editorDragged = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // import { getRangeLength } from "ve-range-utils";
// import {  } from "ve-range-utils";
// import { normalizePositionByRangeLength } from "ve-range-utils";
// import { normalizePositionByRangeLength, getRangeLength } from "ve-range-utils";

exports.handleCaretMoved = handleCaretMoved;
exports.normalizeNewCaretPos = normalizeNewCaretPos;
exports.handleSelectionStartGrabbed = handleSelectionStartGrabbed;
exports.handleNoSelectionLayerYet = handleNoSelectionLayerYet;
exports.handleCaretDrag = handleCaretDrag;
exports.updateSelectionOrCaret = updateSelectionOrCaret;

var _veRangeUtils = require("ve-range-utils");

var draggingEnd = false;
var dragInProgress = false;
var selectionStartGrabbed = void 0;
var selectionEndGrabbed = void 0;
var caretPositionOnDragStart = void 0;
var editorDragged = exports.editorDragged = function editorDragged(_ref) {
  var nearestCaretPos = _ref.nearestCaretPos;
  var _props = this.props,
      _props$caretPosition = _props.caretPosition,
      caretPosition = _props$caretPosition === undefined ? -1 : _props$caretPosition,
      _props$selectionLayer = _props.selectionLayer,
      selectionLayer = _props$selectionLayer === undefined ? { start: -1, end: -1 } : _props$selectionLayer,
      _props$sequenceLength = _props.sequenceLength,
      sequenceLength = _props$sequenceLength === undefined ? this.getSequenceLength && this.getSequenceLength() : _props$sequenceLength;


  if (!dragInProgress) {
    //we're starting the drag, so update the caret position!
    if (!selectionStartGrabbed && !selectionEndGrabbed) {
      //we're not dragging the caret or selection handles
      // caretPositionOnDragStart = nearestCaretPos;
      // this.caretPositionUpdate(nearestCaretPos);
    }
    dragInProgress = true;
    return;
  }
  if (selectionStartGrabbed) {
    handleSelectionStartGrabbed({
      caretPosition: caretPosition,
      selectionLayer: selectionLayer,
      selectionLayerUpdate: this.selectionLayerUpdate,
      nearestCaretPos: nearestCaretPos,
      sequenceLength: sequenceLength
    });
  } else if (selectionEndGrabbed) {
    handleSelectionEndGrabbed({
      caretPosition: caretPosition,
      selectionLayer: selectionLayer,
      selectionLayerUpdate: this.selectionLayerUpdate,
      nearestCaretPos: nearestCaretPos,
      sequenceLength: sequenceLength
    });
  } else {
    // else if (caretGrabbed) {
    //     handleCaretDrag({
    //         caretPosition,
    //         selectionLayer,
    //         selectionLayerUpdate,
    //         nearestCaretPos,
    //         sequenceLength
    //     })
    // }
    //dragging somewhere within the sequence
    //pass the caret position of the drag start
    handleCaretDrag({
      caretPosition: caretPositionOnDragStart,
      selectionLayer: caretPositionOnDragStart ? { start: -1, end: -1 } : selectionLayer,
      selectionLayerUpdate: this.selectionLayerUpdate,
      nearestCaretPos: nearestCaretPos,
      sequenceLength: sequenceLength
    });
    // if (caretPositionOnDragStart !== null && !selectionLayer.start) {
    //   caretPositionOnDragStart = null;
    // }
  }
};

var editorClicked = exports.editorClicked = function editorClicked(_ref2) {
  var nearestCaretPos = _ref2.nearestCaretPos,
      shiftHeld = _ref2.shiftHeld;

  if (!dragInProgress) {
    //we're not dragging the caret or selection handles
    this.updateSelectionOrCaret(shiftHeld, nearestCaretPos);
  }
};

var editorDragStarted = exports.editorDragStarted = function editorDragStarted(opts) {
  document.body.classList.add("sequenceDragging"); //needed to prevent the input bubble from losing focus post user drag
  window.__veDragging = true;
  caretPositionOnDragStart = opts.nearestCaretPos; //bump the drag counter
  selectionStartGrabbed = opts.selectionStartGrabbed;
  selectionEndGrabbed = opts.selectionEndGrabbed;

  // let styleEl = document.getElementById("react-draggable-style-el");
  // if (!styleEl) {
  //   styleEl = document.createElement("style");
  //   styleEl.type = "text/css";
  //   styleEl.id = "react-draggable-style-el";
  //   styleEl.innerHTML =
  //     ".react-draggable-transparent-selection *::-moz-selection {background: transparent;}\n";
  //   styleEl.innerHTML +=
  //     ".react-draggable-transparent-selection *::selection {background: transparent;}\n";
  //   document.getElementsByTagName("head")[0].appendChild(styleEl);
  // }
  // if (document.body)
  //   addClassName(document.body, "react-draggable-transparent-selection");
};
var editorDragStopped = exports.editorDragStopped = function editorDragStopped() {
  document.body.classList.remove("sequenceDragging"); //needed to prevent the input bubble from losing focus post user drag
  window.__veDragging = false;
  caretPositionOnDragStart = null;
  setTimeout(function () {
    dragInProgress = false;
  });

  // //
  // try {
  //   if (document && document.body)
  //     removeClassName(document.body, "react-draggable-transparent-selection");
  //   // $FlowIgnore: IE
  //   if (document.selection) {
  //     // $FlowIgnore: IE
  //     document.selection.empty();
  //   } else {
  //     const selection = window.getSelection();

  //     if (
  //       selection.focusNode &&
  //       selection.focusNode.classList.contains("sequenceInputBubble")
  //     ) {
  //       return; //don't remove the selection if we're focused in the sequenceInputBubble!
  //     }
  //     selection.removeAllRanges(); // remove selection caused by scroll
  //   }
  // } catch (e) {
  //   // probably IE
  // }
};

// function addClassName(el: HTMLElement, className: string) {
//   if (el.classList) {
//     el.classList.add(className);
//   } else {
//     if (!el.className.match(new RegExp(`(?:^|\\s)${className}(?!\\S)`))) {
//       el.className += ` ${className}`;
//     }
//   }
// }

// function removeClassName(el: HTMLElement, className: string) {
//   if (el.classList) {
//     el.classList.remove(className);
//   } else {
//     el.className = el.className.replace(
//       new RegExp(`(?:^|\\s)${className}(?!\\S)`, "g"),
//       ""
//     );
//   }
// }

function handleCaretMoved(_ref3) {
  var moveBy = _ref3.moveBy,
      circular = _ref3.circular,
      sequenceLength = _ref3.sequenceLength,
      caretPosition = _ref3.caretPosition,
      selectionLayer = _ref3.selectionLayer,
      shiftHeld = _ref3.shiftHeld,
      type = _ref3.type,
      caretPositionUpdate = _ref3.caretPositionUpdate,
      selectionLayerUpdate = _ref3.selectionLayerUpdate;

  var newCaretPosition = void 0;
  if (selectionLayer.start > -1) {
    if (shiftHeld) {
      newCaretPosition = normalizeNewCaretPos(Number((selectionLayer.cursorAtEnd ? selectionLayer.end + 1 : selectionLayer.start) + moveBy), sequenceLength, circular);
      // newCaretPosition = normalizeNewCaretPos(Number(caretPosition + moveBy), sequenceLength, circular);
      var anchorPos = void 0;
      if (selectionLayer.start <= selectionLayer.end) {
        //non-circular selection
        //define an anchor pos
        if (selectionLayer.cursorAtEnd) {
          if (newCaretPosition === selectionLayer.start && moveBy < 0) {
            return caretPositionUpdate(newCaretPosition);
          }
          anchorPos = selectionLayer.start;
        } else {
          if (newCaretPosition === selectionLayer.end + 1 && moveBy > 0) {
            return caretPositionUpdate(newCaretPosition);
          }
          anchorPos = selectionLayer.end + 1;
        }
        if (newCaretPosition > anchorPos) {
          if (circular && selectionLayer.start + moveBy < 0) {
            //we've gone around the origin in this case
            selectionLayerUpdate({
              start: newCaretPosition,
              end: anchorPos - 1,
              cursorAtEnd: false
            });
          } else {
            selectionLayerUpdate({
              start: anchorPos,
              end: (0, _veRangeUtils.normalizePositionByRangeLength)(newCaretPosition - 1, sequenceLength),
              cursorAtEnd: true
            });
          }
        } else {
          if (circular && selectionLayer.end + moveBy >= sequenceLength) {
            //we've gone around the origin in this case
            selectionLayerUpdate({
              start: anchorPos,
              end: (0, _veRangeUtils.normalizePositionByRangeLength)(newCaretPosition - 1, sequenceLength),
              cursorAtEnd: true
            });
          } else {
            selectionLayerUpdate({
              start: newCaretPosition,
              end: (0, _veRangeUtils.normalizePositionByRangeLength)(anchorPos - 1, sequenceLength),
              cursorAtEnd: false
            });
          }
        }
      } else {
        //circular selection
        if (selectionLayer.cursorAtEnd) {
          anchorPos = selectionLayer.start;
        } else {
          anchorPos = selectionLayer.end + 1;
        }

        if (newCaretPosition <= anchorPos && !(!selectionLayer.cursorAtEnd && newCaretPosition - moveBy < 0) || // if the move by is crossing the origin then we should make the new selection non circular
        selectionLayer.cursorAtEnd && selectionLayer.end + moveBy < 0) {
          selectionLayerUpdate({
            start: anchorPos,
            end: (0, _veRangeUtils.normalizePositionByRangeLength)(newCaretPosition - 1, sequenceLength),
            cursorAtEnd: true
          });
        } else {
          selectionLayerUpdate({
            start: (0, _veRangeUtils.normalizePositionByRangeLength)(newCaretPosition, sequenceLength),
            end: (0, _veRangeUtils.normalizePositionByRangeLength)(anchorPos - 1, sequenceLength),
            cursorAtEnd: false
          });
        }
      }
    } else {
      //no shiftHeld
      //handle special cases
      if (moveBy === 0) {
        if (type === "moveCaretRightOne") {
          return caretPositionUpdate(selectionLayer.end + 1);
        } else if (type === "moveCaretLeftOne") {
          return caretPositionUpdate(selectionLayer.start);
        } else {
          throw new Error("this case should not be hit...");
        }
      } else if (moveBy > 0) {
        newCaretPosition = normalizeNewCaretPos(Number(selectionLayer.end + moveBy), sequenceLength, circular);
        caretPositionUpdate(1);
      } else {
        newCaretPosition = normalizeNewCaretPos(Number(selectionLayer.start + moveBy), sequenceLength, circular);
        caretPositionUpdate(newCaretPosition);
      }
    }
  } else {
    //no selection layer
    newCaretPosition = normalizeNewCaretPos(Number(caretPosition + moveBy), sequenceLength, circular);
    if (shiftHeld) {
      if (moveBy > 0) {
        if (newCaretPosition === caretPosition) {
          caretPositionUpdate(newCaretPosition);
        } else {
          selectionLayerUpdate({
            start: caretPosition,
            end: (0, _veRangeUtils.normalizePositionByRangeLength)(newCaretPosition - 1, sequenceLength),
            cursorAtEnd: true
          });
        }
      } else {
        //moving to the left
        if (newCaretPosition === caretPosition) {
          caretPositionUpdate(newCaretPosition);
        } else {
          selectionLayerUpdate({
            start: newCaretPosition,
            end: (0, _veRangeUtils.normalizePositionByRangeLength)(caretPosition - 1, sequenceLength),
            cursorAtEnd: false
          });
        }
      }
    } else {
      //no shiftHeld
      caretPositionUpdate(newCaretPosition);
    }
  }
}

function normalizeNewCaretPos(caretPosition, sequenceLength, circular) {
  if (circular) {
    return (0, _veRangeUtils.normalizePositionByRangeLength)(caretPosition, sequenceLength, true);
  } else {
    return (0, _veRangeUtils.trimNumberToFitWithin0ToAnotherNumber)(caretPosition, sequenceLength);
  }
}

function handleSelectionStartGrabbed(_ref4) {
  var caretPosition = _ref4.caretPosition,
      selectionLayer = _ref4.selectionLayer,
      selectionLayerUpdate = _ref4.selectionLayerUpdate,
      nearestCaretPos = _ref4.nearestCaretPos,
      sequenceLength = _ref4.sequenceLength;

  if (selectionLayer.start < 0) {
    handleNoSelectionLayerYet({
      caretPosition: caretPosition,
      selectionLayer: selectionLayer,
      selectionLayerUpdate: selectionLayerUpdate,
      nearestCaretPos: nearestCaretPos,
      sequenceLength: sequenceLength
    });
  } else {
    //there must be a selection layer
    //we need to move the selection layer
    selectionLayerUpdate({
      start: nearestCaretPos,
      end: selectionLayer.end
    });
  }
}

function handleSelectionEndGrabbed(_ref5) {
  var caretPosition = _ref5.caretPosition,
      selectionLayer = _ref5.selectionLayer,
      selectionLayerUpdate = _ref5.selectionLayerUpdate,
      nearestCaretPos = _ref5.nearestCaretPos,
      sequenceLength = _ref5.sequenceLength;

  if (selectionLayer.start < 0) {
    handleNoSelectionLayerYet({
      caretPosition: caretPosition,
      selectionLayerUpdate: selectionLayerUpdate,
      nearestCaretPos: nearestCaretPos,
      sequenceLength: sequenceLength
    });
  } else {
    //there must be a selection layer
    //we need to move the selection layer
    var newEnd = (0, _veRangeUtils.normalizePositionByRangeLength)(nearestCaretPos - 1, sequenceLength);
    selectionLayerUpdate({
      start: selectionLayer.start,
      end: newEnd,
      cursorAtEnd: true
    });
  }
}
function handleNoSelectionLayerYet(_ref6) {
  var caretPosition = _ref6.caretPosition,
      selectionLayerUpdate = _ref6.selectionLayerUpdate,
      nearestCaretPos = _ref6.nearestCaretPos,
      sequenceLength = _ref6.sequenceLength;

  //no selection layer yet, so we'll start one if necessary
  // 0 1 2 3 4 5 6 7 8 9
  //    c
  //        n
  //
  var dragEnd = {
    start: caretPosition,
    end: (0, _veRangeUtils.normalizePositionByRangeLength)(nearestCaretPos - 1, sequenceLength, true)
  };
  var dragStart = {
    start: nearestCaretPos,
    end: (0, _veRangeUtils.normalizePositionByRangeLength)(caretPosition - 1, sequenceLength, true)
  };
  if (caretPosition === nearestCaretPos) {
    return; // do nothing because nearestCaretPos === caretPosition
  } else if ((0, _veRangeUtils.getRangeLength)(dragEnd, sequenceLength) < (0, _veRangeUtils.getRangeLength)(dragStart, sequenceLength)) {
    draggingEnd = true; //the caret becomes the "selection end"
    selectionLayerUpdate(dragEnd);
    caretPositionOnDragStart = null;
  } else {
    draggingEnd = false; //the caret becomes the "selection end"
    selectionLayerUpdate(dragStart);
    caretPositionOnDragStart = null;
  }
}
function handleCaretDrag(_ref7) {
  var caretPosition = _ref7.caretPosition,
      selectionLayer = _ref7.selectionLayer,
      selectionLayerUpdate = _ref7.selectionLayerUpdate,
      nearestCaretPos = _ref7.nearestCaretPos,
      sequenceLength = _ref7.sequenceLength;

  if (selectionLayer.start > -1) {
    //there is a selection layer
    draggingEnd ? handleSelectionEndGrabbed({
      caretPosition: caretPosition,
      selectionLayer: selectionLayer,
      selectionLayerUpdate: selectionLayerUpdate,
      nearestCaretPos: nearestCaretPos,
      sequenceLength: sequenceLength
    }) : handleSelectionStartGrabbed({
      caretPosition: caretPosition,
      selectionLayer: selectionLayer,
      selectionLayerUpdate: selectionLayerUpdate,
      nearestCaretPos: nearestCaretPos,
      sequenceLength: sequenceLength
    });
  } else if (caretPosition > -1) {
    handleNoSelectionLayerYet({
      caretPosition: caretPosition,
      selectionLayer: selectionLayer,
      selectionLayerUpdate: selectionLayerUpdate,
      nearestCaretPos: nearestCaretPos,
      sequenceLength: sequenceLength
    });
  } else {
    console.warn("we should never be here...");
  }
}

function updateSelectionOrCaret(_ref8) {
  var shiftHeld = _ref8.shiftHeld,
      sequenceLength = _ref8.sequenceLength,
      newRangeOrCaret = _ref8.newRangeOrCaret,
      caretPosition = _ref8.caretPosition,
      selectionLayer = _ref8.selectionLayer,
      selectionLayerUpdate = _ref8.selectionLayerUpdate,
      caretPositionUpdate = _ref8.caretPositionUpdate;

  var newCaret = void 0;
  var newRange = void 0;
  if ((typeof newRangeOrCaret === "undefined" ? "undefined" : _typeof(newRangeOrCaret)) !== "object") {
    newCaret = newRangeOrCaret;
  } else {
    newRange = {
      start: newRangeOrCaret.start,
      end: newRangeOrCaret.end,
      forceUpdate: newRangeOrCaret.forceUpdate
    };
  }
  if (shiftHeld) {
    if (caretPosition > 0) {
      //there is a caret already down
      if (newCaret > -1) {
        //a new caret is being passed
        handleNoSelectionLayerYet({
          caretPosition: caretPosition,
          selectionLayer: selectionLayer,
          selectionLayerUpdate: selectionLayerUpdate,
          nearestCaretPos: newCaret,
          sequenceLength: sequenceLength
        });
        // if (newCaret === caretPosition) {
        //     //do nothing
        //     return
        // }
        // isRangeShorterIfFlipped(newCaret,caretPosition, sequenceLength)
        //     ? selectionLayerUpdate(caretPosition, newCaret)
        //     : selectionLayerUpdate(caretPosition, newCaret)
      } else {
        simpleUpdate();
      }
    } else if (selectionLayer.start > -1) {
      //there is already a selection layer
      if (newCaret > -1) {
        //new caret passed
        var distanceFromStart = getMinRangeLength(selectionLayer.start, newCaret, sequenceLength);
        var distanceFromEnd = getMinRangeLength(selectionLayer.end, newCaret, sequenceLength);
        if (distanceFromStart < distanceFromEnd) {
          selectionLayerUpdate({
            start: newCaret,
            end: selectionLayer.end
          });
        } else {
          selectionLayerUpdate({
            start: selectionLayer.start,
            end: (0, _veRangeUtils.normalizePositionByRangeLength)(newCaret - 1, sequenceLength, true)
          });
        }
      } else {
        //new range passed
        // return selectionLayerUpdate(newRange);
        var selectionFullyContained = !(0, _veRangeUtils.trimRangeByAnotherRange)(selectionLayer, newRange);
        if (selectionFullyContained) {
          return selectionLayerUpdate(newRange);
        }

        var newRangeFullyContained = !(0, _veRangeUtils.trimRangeByAnotherRange)(newRange, selectionLayer);

        var _expandOrContractRang = (0, _veRangeUtils.expandOrContractRangeToPosition)(selectionLayer, newRange.start, sequenceLength),
            range1 = _expandOrContractRang.newRange;

        var _expandOrContractRang2 = (0, _veRangeUtils.expandOrContractRangeToPosition)(selectionLayer, newRange.end + 1, sequenceLength),
            range2 = _expandOrContractRang2.newRange; //+1 to go from range end to position


        var range1Shorter = (0, _veRangeUtils.getRangeLength)(range1, sequenceLength) < (0, _veRangeUtils.getRangeLength)(range2, sequenceLength);

        if (newRangeFullyContained) {
          range1Shorter ? selectionLayerUpdate(range1) : selectionLayerUpdate(range2);
        } else {
          selectionLayerUpdate({
            start: selectionLayer.start,
            end: newRange.end
          });
        }
      }
    } else {
      //no caret, no selection, so just do a simple update
      simpleUpdate();
    }
  } else {
    //no shift held, so just update the selection or caret
    simpleUpdate();
  }
  function simpleUpdate() {
    //shift not held, so just make a new selection layer or move the caret
    if (newCaret > -1) {
      caretPositionUpdate(newCaret);
    } else {
      selectionLayerUpdate(newRange);
    }
  }
}

// function isRangeShorterIfFlipped(start, end, sequenceLength) {
//   return !(
//     getRangeLength({ start, end }, sequenceLength) <
//     getRangeLength({ start: end, end: start }, sequenceLength)
//   );
// }

function getMinRangeLength(start, end, sequenceLength) {
  var range1 = (0, _veRangeUtils.getRangeLength)({ start: start, end: end }, sequenceLength);
  var range2 = (0, _veRangeUtils.getRangeLength)({ start: end, end: start }, sequenceLength);
  return range1 < range2 ? range1 : range2;
}

// export function handleNoSelectionLayerYet({
//   caretPosition,
//   selectionLayerUpdate,
//   nearestCaretPos,
//   sequenceLength
// }) {
//   //no selection layer yet, so we'll start one if necessary
//   // 0 1 2 3 4 5 6 7 8 9
//   //    c
//   //        n
//   //
//   let dragEnd = {
//     start: caretPosition,
//     end: normalizePositionByRangeLength(
//       nearestCaretPos - 1,
//       sequenceLength,
//       true
//     )
//   };
//   let dragStart = {
//     start: nearestCaretPos,
//     end: normalizePositionByRangeLength(caretPosition - 1, sequenceLength, true)
//   };
//   if (caretPosition === nearestCaretPos) {
//     return; // do nothing because nearestCaretPos === caretPosition
//   } else if (
//     getRangeLength(dragEnd, sequenceLength) <
//     getRangeLength(dragStart, sequenceLength)
//   ) {
//     selectionLayerUpdate(dragEnd);
//   } else {
//     selectionLayerUpdate(dragStart);
//   }
// }