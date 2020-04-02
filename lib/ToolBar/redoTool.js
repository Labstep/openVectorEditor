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
    disabled: !(editorState.sequenceDataHistory && editorState.sequenceDataHistory.future && editorState.sequenceDataHistory.future.length)
  };
})(function (_ref) {
  var toolbarItemProps = _ref.toolbarItemProps,
      redo = _ref.redo,
      disabled = _ref.disabled;

  return _react2.default.createElement(_ToolbarItem2.default, _extends({
    Icon: _react2.default.createElement(_core.Icon, { "data-test": "veRedoTool", icon: "redo" }),
    disabled: disabled,
    onIconClick: redo,
    tooltip: _react2.default.createElement(
      "span",
      null,
      "Redo ",
      _react2.default.createElement(
        "span",
        { style: { fontSize: 10 } },
        "(Cmd/Ctrl+Shift+Z)"
      )
    )
  }, toolbarItemProps));
});
module.exports = exports["default"];