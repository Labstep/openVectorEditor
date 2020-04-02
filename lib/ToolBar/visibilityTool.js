"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _core = require("@blueprintjs/core");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _teselagenReactComponents = require("teselagen-react-components");

var _viewSubmenu = require("../MenuBar/viewSubmenu");

var _viewSubmenu2 = _interopRequireDefault(_viewSubmenu);

var _commands = require("../commands");

var _commands2 = _interopRequireDefault(_commands);

var _ToolbarItem = require("./ToolbarItem");

var _ToolbarItem2 = _interopRequireDefault(_ToolbarItem);

var _withEditorProps = require("../withEditorProps");

var _withEditorProps2 = _interopRequireDefault(_withEditorProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _withEditorProps.connectToEditor)(function (_ref) {
  var _ref$toolBar = _ref.toolBar,
      toolBar = _ref$toolBar === undefined ? {} : _ref$toolBar;

  return {
    isOpen: toolBar.openItem === "visibilityTool"
  };
})(function (_ref2) {
  var toolbarItemProps = _ref2.toolbarItemProps,
      isOpen = _ref2.isOpen;

  return _react2.default.createElement(_ToolbarItem2.default, _extends({
    Icon: _react2.default.createElement(_core.Icon, { icon: "eye-open" }),
    onIconClick: "toggleDropdown",
    Dropdown: VisibilityOptions,
    noDropdownIcon: true,
    toggled: isOpen,
    tooltip: isOpen ? "Hide Visibility Options" : "Show Visibility Options"
  }, toolbarItemProps));
});


var VisibilityOptions = (0, _withEditorProps2.default)(function (props) {
  return _react2.default.createElement(
    _core.Menu,
    null,
    (0, _teselagenReactComponents.createCommandMenu)(_viewSubmenu2.default, (0, _commands2.default)({ props: props }), {
      useTicks: true,
      omitIcons: true
    })
  );
});
module.exports = exports["default"];