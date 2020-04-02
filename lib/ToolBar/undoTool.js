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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _withEditorProps.connectToEditor)(function (editorState) {
  return {
    disabled: !(editorState.sequenceDataHistory && editorState.sequenceDataHistory.past && editorState.sequenceDataHistory.past.length)
  };
})(function (_ref) {
  var toolbarItemProps = _ref.toolbarItemProps,
      undo = _ref.undo,
      disabled = _ref.disabled;

  return _react2.default.createElement(_ToolbarItem2.default, _extends({
    Icon: _react2.default.createElement(_core.Icon, { "data-test": "veUndoTool", icon: "undo" }),
    disabled: disabled,
    onIconClick: undo,
    tooltip: _react2.default.createElement(
      "span",
      null,
      "Undo ",
      _react2.default.createElement(
        "span",
        { style: { fontSize: 10 } },
        "(Cmd/Ctrl+Z)"
      )
    )
  }, toolbarItemProps));
});
module.exports = exports["default"];