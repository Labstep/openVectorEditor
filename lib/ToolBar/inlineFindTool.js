"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require("@blueprintjs/core");

var _FindBar = require("../FindBar");

var _FindBar2 = _interopRequireDefault(_FindBar);

var _ToolbarItem = require("./ToolbarItem");

var _ToolbarItem2 = _interopRequireDefault(_ToolbarItem);

var _withEditorProps = require("../withEditorProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _withEditorProps.connectToEditor)(function (_ref) {
  var _ref$findTool = _ref.findTool,
      findTool = _ref$findTool === undefined ? {} : _ref$findTool;

  return {
    isOpen: findTool.isOpen
  };
})(function (_ref2) {
  var toolbarItemProps = _ref2.toolbarItemProps,
      editorName = _ref2.editorName,
      toggleFindTool = _ref2.toggleFindTool,
      isOpen = _ref2.isOpen;

  return _react2.default.createElement(_ToolbarItem2.default, _extends({
    Icon: !isOpen ? _react2.default.createElement(_core.Icon, { "data-test": "ve-find-tool-toggle", icon: "search" }) : _react2.default.createElement(_FindBar2.default, { editorName: editorName }),
    renderIconAbove: isOpen,
    onIconClick: toggleFindTool,
    tooltip: isOpen ? _react2.default.createElement(
      "span",
      null,
      "Hide Find Tool ",
      _react2.default.createElement(
        "span",
        { style: { fontSize: 10 } },
        "(Cmd/Ctrl+F)"
      )
    ) : _react2.default.createElement(
      "span",
      null,
      "Show Find Tool ",
      _react2.default.createElement(
        "span",
        { style: { fontSize: 10 } },
        "(Cmd/Ctrl+F)"
      )
    )
  }, toolbarItemProps));
});
module.exports = exports["default"];