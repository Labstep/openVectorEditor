"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolBar = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash");

var _versionHistoryTool = require("./versionHistoryTool");

var _versionHistoryTool2 = _interopRequireDefault(_versionHistoryTool);

var _MenuBar = require("../MenuBar");

var _MenuBar2 = _interopRequireDefault(_MenuBar);

require("./style.css");

var _core = require("@blueprintjs/core");

var _downloadTool = require("./downloadTool");

var _downloadTool2 = _interopRequireDefault(_downloadTool);

var _importTool = require("./importTool");

var _importTool2 = _interopRequireDefault(_importTool);

var _cutsiteTool = require("./cutsiteTool");

var _cutsiteTool2 = _interopRequireDefault(_cutsiteTool);

var _featureTool = require("./featureTool");

var _featureTool2 = _interopRequireDefault(_featureTool);

var _oligoTool = require("./oligoTool");

var _oligoTool2 = _interopRequireDefault(_oligoTool);

var _orfTool = require("./orfTool");

var _orfTool2 = _interopRequireDefault(_orfTool);

var _editTool = require("./editTool");

var _editTool2 = _interopRequireDefault(_editTool);

var _findTool = require("./findTool");

var _findTool2 = _interopRequireDefault(_findTool);

var _inlineFindTool = require("./inlineFindTool");

var _inlineFindTool2 = _interopRequireDefault(_inlineFindTool);

var _alignmentTool = require("./alignmentTool");

var _alignmentTool2 = _interopRequireDefault(_alignmentTool);

var _saveTool = require("./saveTool");

var _saveTool2 = _interopRequireDefault(_saveTool);

var _visibilityTool = require("./visibilityTool");

var _visibilityTool2 = _interopRequireDefault(_visibilityTool);

var _undoTool = require("./undoTool");

var _undoTool2 = _interopRequireDefault(_undoTool);

var _redoTool = require("./redoTool");

var _redoTool2 = _interopRequireDefault(_redoTool);

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import {connectToEditor} from "../withEditorProps";


var allTools = {
  downloadTool: _downloadTool2.default,
  importTool: _importTool2.default,
  cutsiteTool: _cutsiteTool2.default,
  alignmentTool: _alignmentTool2.default,
  featureTool: _featureTool2.default,
  oligoTool: _oligoTool2.default,
  orfTool: _orfTool2.default,
  editTool: _editTool2.default,
  findTool: _findTool2.default,
  inlineFindTool: _inlineFindTool2.default,
  versionHistoryTool: _versionHistoryTool2.default,
  saveTool: _saveTool2.default,
  visibilityTool: _visibilityTool2.default,
  undoTool: _undoTool2.default,
  redoTool: _redoTool2.default
};

var ToolBar = exports.ToolBar = function (_React$PureComponent) {
  _inherits(ToolBar, _React$PureComponent);

  function ToolBar() {
    _classCallCheck(this, ToolBar);

    return _possibleConstructorReturn(this, (ToolBar.__proto__ || Object.getPrototypeOf(ToolBar)).apply(this, arguments));
  }

  _createClass(ToolBar, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          modifyTools = _props.modifyTools,
          contentLeft = _props.contentLeft,
          showMenuBar = _props.showMenuBar,
          displayMenuBarAboveTools = _props.displayMenuBarAboveTools,
          isProtein = _props.isProtein,
          openHotkeyDialog = _props.openHotkeyDialog,
          onSave = _props.onSave,
          userDefinedHandlersAndOpts = _props.userDefinedHandlersAndOpts,
          editorName = _props.editorName,
          handleFullscreenClose = _props.handleFullscreenClose,
          closeFullscreen = _props.closeFullscreen,
          _props$toolList = _props.toolList,
          toolList = _props$toolList === undefined ? ["saveTool", "downloadTool", "importTool", "undoTool", "redoTool", "cutsiteTool", "featureTool", "oligoTool", "orfTool", "alignmentTool", "editTool", "findTool", "visibilityTool"] : _props$toolList,
          rest = _objectWithoutProperties(_props, ["modifyTools", "contentLeft", "showMenuBar", "displayMenuBarAboveTools", "isProtein", "openHotkeyDialog", "onSave", "userDefinedHandlersAndOpts", "editorName", "handleFullscreenClose", "closeFullscreen", "toolList"]);

      var items = toolList.map(function (toolNameOrOverrides, index) {
        var toolName = void 0;
        var toolOverride = void 0;
        if ((0, _util.isString)(toolNameOrOverrides)) {
          toolName = toolNameOrOverrides;
        } else {
          toolOverride = toolNameOrOverrides;
          toolName = toolNameOrOverrides.name;
        }

        var Tool = toolOverride ? allTools[toolOverride.name] : allTools[toolName];
        if (!Tool) {
          console.error("You're trying to load a tool that doesn't appear to exist: " + toolName);
          return false;
        }
        if (isProtein) {
          if (toolName === "cutsiteTool" || toolName === "orfTool" || toolName === "alignmentTool") {
            return false;
          }
        }
        if (toolName === "saveTool" && !onSave) {
          return false;
        } //don't show the option to save if no onSave handler is passed
        return _react2.default.createElement(Tool, _extends({}, rest, {
          onSave: onSave,
          toolbarItemProps: _extends({ index: index, toolName: toolName, editorName: editorName }, toolOverride),
          editorName: editorName,
          key: toolName
        }));
      }).filter(function (tool) {
        return !!tool;
      });

      if (modifyTools) {
        items = modifyTools(items);
      }

      return _react2.default.createElement(
        "div",
        { style: { display: "flex" } },
        contentLeft,
        _react2.default.createElement(
          "div",
          {
            style: _extends({}, displayMenuBarAboveTools && showMenuBar ? {
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "flex-start"
            } : {
              display: "flex",
              width: "100%",
              justifyContent: "center",
              flexWrap: "wrap"
            }),
            className: "veToolbar"
          },
          showMenuBar && _react2.default.createElement(_MenuBar2.default, _extends({
            openHotkeyDialog: openHotkeyDialog
          }, (0, _lodash.pick)(this.props, userDefinedHandlersAndOpts), {
            onSave: onSave //needs to be passed so that editor commands will have it
            , style: { marginLeft: 0 },
            editorName: editorName
          })),
          displayMenuBarAboveTools && showMenuBar ? _react2.default.createElement(
            "div",
            {
              className: "veTools-displayMenuBarAboveTools",
              style: {
                display: "flex",
                justifyContent: "center",
                marginLeft: 15,
                flexWrap: "wrap"
                // width: "100%"
              }
            },
            items
          ) : items
        ),
        closeFullscreen && _react2.default.createElement(CloseFullscreenButton, { onClick: handleFullscreenClose })
      );
    }
  }]);

  return ToolBar;
}(_react2.default.PureComponent);

exports.default = ToolBar;
// export default connectToEditor()  ToolBar

var CloseFullscreenButton = function CloseFullscreenButton(props) {
  return _react2.default.createElement(
    _core.Tooltip,
    { content: "Close Fullscreen Mode" },
    _react2.default.createElement(_core.Button, {
      minimal: true,
      style: {
        marginTop: 2,
        marginRight: 2
      },
      onClick: props.onClick,
      className: "ve-close-fullscreen-button",
      icon: "minimize"
    })
  );
};