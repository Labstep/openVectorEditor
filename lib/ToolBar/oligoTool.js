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
    isHidden: editorState.sequenceData && editorState.sequenceData.isProtein,

    toggled: editorState.annotationVisibility && editorState.annotationVisibility.primers
  };
})(function (_ref) {
  var toolbarItemProps = _ref.toolbarItemProps,
      isHidden = _ref.isHidden,
      toggled = _ref.toggled,
      annotationVisibilityToggle = _ref.annotationVisibilityToggle;

  return _react2.default.createElement(_ToolbarItem2.default, _extends({
    Icon: _react2.default.createElement(_core.Icon, { icon: "swap-horizontal" }),
    onIconClick: function onIconClick() {
      annotationVisibilityToggle("primers");
    },
    isHidden: isHidden,
    toggled: toggled,
    tooltip: "Show Primers",
    tooltipToggled: "Hide Primers"
  }, toolbarItemProps));
});
module.exports = exports["default"];