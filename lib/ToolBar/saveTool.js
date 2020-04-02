"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require("@blueprintjs/core");

var _ToolbarItem = require("./ToolbarItem");

var _ToolbarItem2 = _interopRequireDefault(_ToolbarItem);

var _withEditorProps = require("../withEditorProps");

var _recompose = require("recompose");

var _redux = require("redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.compose)((0, _withEditorProps.connectToEditor)(function (_ref) {
  var readOnly = _ref.readOnly,
      _ref$sequenceData = _ref.sequenceData,
      sequenceData = _ref$sequenceData === undefined ? {} : _ref$sequenceData,
      _ref$lastSavedId = _ref.lastSavedId,
      lastSavedId = _ref$lastSavedId === undefined ? "134%!@#%!@#%!@%" : _ref$lastSavedId;

  return {
    readOnly: readOnly,
    sequenceData: sequenceData,
    hasBeenSaved: sequenceData.stateTrackingId === "initialLoadId" || sequenceData.stateTrackingId === lastSavedId
  };
}), (0, _recompose.withHandlers)({ handleSave: _withEditorProps.handleSave }))(function (_ref2) {
  var toolbarItemProps = _ref2.toolbarItemProps,
      alwaysAllowSave = _ref2.alwaysAllowSave,
      handleSave = _ref2.handleSave,
      readOnly = _ref2.readOnly,
      hasBeenSaved = _ref2.hasBeenSaved,
      onSave = _ref2.onSave;

  return _react2.default.createElement(_ToolbarItem2.default, _extends({
    Icon: _react2.default.createElement(_core.Icon, { "data-test": "saveTool", icon: "floppy-disk" }),
    onIconClick: handleSave,
    disabled: alwaysAllowSave ? false : !onSave || hasBeenSaved || readOnly,
    tooltip: _react2.default.createElement(
      "span",
      null,
      "Save ",
      _react2.default.createElement(
        "span",
        { style: { fontSize: 10 } },
        "(Cmd/Ctrl+S)"
      )
    )
  }, toolbarItemProps));
});
module.exports = exports["default"];