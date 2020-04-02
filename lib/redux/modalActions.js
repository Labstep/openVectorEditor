"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.showAddOrEditFeatureDialog = showAddOrEditFeatureDialog;
exports.showAddOrEditPartDialog = showAddOrEditPartDialog;
exports.showPrintDialog = showPrintDialog;
exports.showRemoveDuplicatesDialog = showRemoveDuplicatesDialog;
exports.showAddOrEditPrimerDialog = showAddOrEditPrimerDialog;
exports.showMergeFeaturesDialog = showMergeFeaturesDialog;
exports.showCreateAlignmentDialog = showCreateAlignmentDialog;
exports.showRenameSequenceDialog = showRenameSequenceDialog;
exports.showGoToDialog = showGoToDialog;
exports.showSelectDialog = showSelectDialog;

var _veRangeUtils = require("ve-range-utils");

// ------------------------------------
// Actions
// ------------------------------------

function showAddOrEditFeatureDialog(annotation, _ref) {
  var editorName = _ref.editorName;

  return {
    type: "TG_SHOW_MODAL",
    name: "AddOrEditFeatureDialog", //you'll need to pass a unique dialogName prop to the compoennt
    props: {
      editorName: editorName,
      dialogProps: {
        title: annotation && annotation.id ? "Edit Feature" : "New Feature"
      },
      initialValues: _extends({}, annotation ? _extends({}, (0, _veRangeUtils.convertRangeTo1Based)(annotation), annotation.locations && {
        locations: annotation.locations.map(_veRangeUtils.convertRangeTo1Based)
      }) : {})
    }
  };
}
function showAddOrEditPartDialog(annotation, _ref2) {
  var editorName = _ref2.editorName;

  return {
    type: "TG_SHOW_MODAL",
    name: "AddOrEditPartDialog", //you'll need to pass a unique dialogName prop to the compoennt
    props: {
      editorName: editorName,
      dialogProps: {
        title: annotation && annotation.id ? "Edit Part" : "New Part"
      },
      initialValues: annotation ? _extends({}, (0, _veRangeUtils.convertRangeTo1Based)(annotation)) : {}
    }
  };
}
function showPrintDialog() {
  return {
    type: "TG_SHOW_MODAL",
    name: "PrintDialog" //you'll need to pass a unique dialogName prop to the compoennt
  };
}
function showRemoveDuplicatesDialog(props) {
  return {
    type: "TG_SHOW_MODAL",
    name: "RemoveDuplicatesDialog",
    props: props //you'll need to pass a unique dialogName prop to the compoennt
  };
}

function showAddOrEditPrimerDialog(annotation, _ref3) {
  var editorName = _ref3.editorName;

  return {
    type: "TG_SHOW_MODAL",
    name: "AddOrEditPrimerDialog", //you'll need to pass a unique dialogName prop to the compoennt
    props: {
      editorName: editorName,
      dialogProps: {
        title: annotation && annotation.id ? "Edit Primer" : "New Primer"
      },
      initialValues: annotation ? _extends({}, (0, _veRangeUtils.convertRangeTo1Based)(annotation)) : {}
    }
  };
}
function showMergeFeaturesDialog(annotation, _ref4) {
  var editorName = _ref4.editorName;

  return {
    type: "TG_SHOW_MODAL",
    name: "MergeFeaturesDialog", //you'll need to pass a unique dialogName prop to the compoennt
    props: {
      editorName: editorName,
      dialogProps: {
        title: "Merge Features"
      }
    }
  };
}

function showCreateAlignmentDialog(props) {
  return {
    type: "TG_SHOW_MODAL",
    name: "CreateAlignmentDialog", //you'll need to pass a unique dialogName prop to the compoennt
    props: props
  };
}

function showRenameSequenceDialog(props) {
  return {
    type: "TG_SHOW_MODAL",
    name: "RenameSeqDialog", //you'll need to pass a unique dialogName prop to the compoennt
    props: props
  };
}

function showGoToDialog(props) {
  return {
    type: "TG_SHOW_MODAL",
    name: "GoToDialog", //you'll need to pass a unique dialogName prop to the compoennt
    props: props
  };
}

function showSelectDialog(props) {
  return {
    type: "TG_SHOW_MODAL",
    name: "SelectDialog", //you'll need to pass a unique dialogName prop to the compoennt
    props: props
  };
}