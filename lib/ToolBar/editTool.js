"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _core = require("@blueprintjs/core");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ToolbarItem = require("./ToolbarItem");

var _ToolbarItem2 = _interopRequireDefault(_ToolbarItem);

var _withEditorProps = require("../withEditorProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _withEditorProps.connectToEditor)(function (editorState) {
  return {
    readOnly: editorState.readOnly
  };
})(function (_ref) {
  var toolbarItemProps = _ref.toolbarItemProps,
      readOnly = _ref.readOnly,
      toggleReadOnlyMode = _ref.toggleReadOnlyMode;

  return _react2.default.createElement(_ToolbarItem2.default, _extends({
    Icon: _react2.default.createElement(_core.Icon, { icon: readOnly ? "lock" : "unlock" }),
    onIconClick: toggleReadOnlyMode,
    tooltip: readOnly ? _react2.default.createElement(
      "span",
      null,
      "Switch to edit mode",
      " ",
      _react2.default.createElement(
        "span",
        { style: { fontSize: 10 } },
        "(Cmd/Ctrl+E)"
      )
    ) : _react2.default.createElement(
      "span",
      null,
      "Switch to read only mode",
      " ",
      _react2.default.createElement(
        "span",
        { style: { fontSize: 10 } },
        "(Cmd/Ctrl+E)"
      )
    )
  }, toolbarItemProps));
});
module.exports = exports["default"];