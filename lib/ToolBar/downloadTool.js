"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require("@blueprintjs/core");

var _teselagenReactComponents = require("teselagen-react-components");

var _commands = require("../commands");

var _commands2 = _interopRequireDefault(_commands);

var _withEditorProps = require("../withEditorProps");

var _withEditorProps2 = _interopRequireDefault(_withEditorProps);

var _ToolbarItem = require("./ToolbarItem");

var _ToolbarItem2 = _interopRequireDefault(_ToolbarItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _withEditorProps.connectToEditor)()(function (_ref) {
  var toolbarItemProps = _ref.toolbarItemProps;

  return _react2.default.createElement(_ToolbarItem2.default, _extends({
    tooltip: "Export",
    Dropdown: Dropdown,
    noDropdownIcon: true,
    onIconClick: "toggleDropdown",
    Icon: _react2.default.createElement(_core.Icon, { "data-test": "veDownloadTool", icon: "import" })
  }, toolbarItemProps));
});


var Dropdown = (0, _withEditorProps2.default)(function (props) {
  return _react2.default.createElement(
    _core.Menu,
    null,
    (0, _teselagenReactComponents.createCommandMenu)(["exportSequenceAsGenbank", "exportSequenceAsFasta", "exportSequenceAsTeselagenJson"], (0, _commands2.default)({ props: props }))
  );
});
module.exports = exports["default"];