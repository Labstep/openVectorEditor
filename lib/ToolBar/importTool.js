"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require("@blueprintjs/core");

var _reactDropzone = require("react-dropzone");

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _ToolbarItem = require("./ToolbarItem");

var _ToolbarItem2 = _interopRequireDefault(_ToolbarItem);

var _recompose = require("recompose");

var _withEditorProps = require("../withEditorProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _recompose.compose)((0, _withEditorProps.connectToEditor)(), (0, _recompose.withHandlers)({ importSequenceFromFile: _withEditorProps.importSequenceFromFile }))(function (_ref) {
  var toolbarItemProps = _ref.toolbarItemProps,
      importSequenceFromFile = _ref.importSequenceFromFile;

  return _react2.default.createElement(_ToolbarItem2.default, _extends({
    Icon: _react2.default.createElement(_core.Icon, { "data-test": "veImportTool", icon: "export" }),
    IconWrapper: _reactDropzone2.default,
    IconWrapperProps: {
      multiple: false,
      style: {},
      onDrop: function onDrop(files) {
        return importSequenceFromFile(files[0]);
      }
    },
    tooltip: "Click or drag to import and view .fasta or .gb files"
  }, toolbarItemProps));
});
module.exports = exports["default"];