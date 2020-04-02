"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dialogOverrides = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _AddOrEditPrimerDialog = require("../helperComponents/AddOrEditPrimerDialog");

var _AddOrEditPrimerDialog2 = _interopRequireDefault(_AddOrEditPrimerDialog);

var _AddOrEditFeatureDialog = require("../helperComponents/AddOrEditFeatureDialog");

var _AddOrEditFeatureDialog2 = _interopRequireDefault(_AddOrEditFeatureDialog);

var _AddOrEditPartDialog = require("../helperComponents/AddOrEditPartDialog");

var _AddOrEditPartDialog2 = _interopRequireDefault(_AddOrEditPartDialog);

var _MergeFeaturesDialog = require("../helperComponents/MergeFeaturesDialog");

var _MergeFeaturesDialog2 = _interopRequireDefault(_MergeFeaturesDialog);

var _RenameSequenceDialog = require("../helperComponents/RenameSequenceDialog");

var _RenameSequenceDialog2 = _interopRequireDefault(_RenameSequenceDialog);

var _GoToDialog = require("../helperComponents/GoToDialog");

var _GoToDialog2 = _interopRequireDefault(_GoToDialog);

var _SelectDialog = require("../helperComponents/SelectDialog");

var _SelectDialog2 = _interopRequireDefault(_SelectDialog);

var _AddAdditionalEnzymes2 = require("../AddAdditionalEnzymes");

var _AddAdditionalEnzymes3 = _interopRequireDefault(_AddAdditionalEnzymes2);

var _teselagenReactComponents = require("teselagen-react-components");

var _addAdditionalEnzymes = require("../redux/addAdditionalEnzymes");

var _alignmentTool = require("../ToolBar/alignmentTool");

var _PrintDialog = require("../helperComponents/PrintDialog");

var _PrintDialog2 = _interopRequireDefault(_PrintDialog);

var _RemoveDuplicates = require("../helperComponents/RemoveDuplicates");

var _RemoveDuplicates2 = _interopRequireDefault(_RemoveDuplicates);

var _userDefinedHandlersAndOpts = require("../Editor/userDefinedHandlersAndOpts");

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddAdditionalEnzymes = (0, _teselagenReactComponents.withDialog)({
  title: "Add Additional Enzymes"
})(_AddAdditionalEnzymes3.default);

var CreateAlignmentDialog = (0, _teselagenReactComponents.withDialog)({
  title: "Create New Alignment"
})(_alignmentTool.AlignmentToolInner);

var dialogOverrides = exports.dialogOverrides = ["AddOrEditFeatureDialogOverride", "AddOrEditPartDialogOverride", "AddOrEditPrimerDialogOverride"];

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    addAdditionalEnzymesOpen: state.VectorEditor.__allEditorsOptions.addAdditionalEnzymes.isOpen
  };
}, {
  addAdditionalEnzymesClose: _addAdditionalEnzymes.addAdditionalEnzymesClose
})(function (props) {
  var editorName = props.editorName,
      addAdditionalEnzymesOpen = props.addAdditionalEnzymesOpen,
      addAdditionalEnzymesClose = props.addAdditionalEnzymesClose,
      AddOrEditFeatureDialogOverride = props.AddOrEditFeatureDialogOverride,
      AddOrEditPartDialogOverride = props.AddOrEditPartDialogOverride,
      AddOrEditPrimerDialogOverride = props.AddOrEditPrimerDialogOverride;


  var pickedUserDefinedHandlersAndOpts = (0, _lodash.pick)(props, _userDefinedHandlersAndOpts.userDefinedHandlersAndOpts);

  var AddOrEditFeatureDialog = AddOrEditFeatureDialogOverride || _AddOrEditFeatureDialog2.default;
  var AddOrEditPartDialog = AddOrEditPartDialogOverride || _AddOrEditPartDialog2.default;
  var AddOrEditPrimerDialog = AddOrEditPrimerDialogOverride || _AddOrEditPrimerDialog2.default;
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(AddAdditionalEnzymes, {
      noTarget: true,
      dialogProps: {
        isOpen: addAdditionalEnzymesOpen,
        onClose: addAdditionalEnzymesClose
      }
    }),
    _react2.default.createElement(CreateAlignmentDialog, {
      editorName: editorName,
      dialogName: "CreateAlignmentDialog",
      noTarget: true
    }),
    _react2.default.createElement(_PrintDialog2.default, { editorName: editorName, dialogName: "PrintDialog", noTarget: true }),
    _react2.default.createElement(_RemoveDuplicates2.default, {
      editorName: editorName,
      dialogName: "RemoveDuplicatesDialog",
      noTarget: true
    }),
    _react2.default.createElement(AddOrEditFeatureDialog, _extends({}, pickedUserDefinedHandlersAndOpts, {
      editorName: editorName,
      dialogName: "AddOrEditFeatureDialog",
      noTarget: true
    })),
    _react2.default.createElement(AddOrEditPartDialog, _extends({}, pickedUserDefinedHandlersAndOpts, {
      editorName: editorName,
      dialogName: "AddOrEditPartDialog",
      noTarget: true
    })),
    _react2.default.createElement(AddOrEditPrimerDialog, _extends({}, pickedUserDefinedHandlersAndOpts, {
      editorName: editorName,
      dialogName: "AddOrEditPrimerDialog",
      noTarget: true
    })),
    _react2.default.createElement(_MergeFeaturesDialog2.default, {
      editorName: editorName,
      dialogName: "MergeFeaturesDialog",
      noTarget: true
    }),
    _react2.default.createElement(_RenameSequenceDialog2.default, {
      editorName: editorName,
      dialogName: "RenameSeqDialog",
      noTarget: true
    }),
    _react2.default.createElement(_GoToDialog2.default, { editorName: editorName, dialogName: "GoToDialog", noTarget: true }),
    _react2.default.createElement(_SelectDialog2.default, {
      editorName: editorName,
      dialogName: "SelectDialog",
      noTarget: true
    })
  );
});