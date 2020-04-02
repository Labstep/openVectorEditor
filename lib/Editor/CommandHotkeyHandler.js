"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _redux = require("redux");

var _withEditorProps = require("../withEditorProps");

var _withEditorProps2 = _interopRequireDefault(_withEditorProps);

var _teselagenReactComponents = require("teselagen-react-components");

var _commands = require("../commands");

var _commands2 = _interopRequireDefault(_commands);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommandHotkeyHandler = function (_React$Component) {
  _inherits(CommandHotkeyHandler, _React$Component);

  function CommandHotkeyHandler(props) {
    _classCallCheck(this, CommandHotkeyHandler);

    var _this = _possibleConstructorReturn(this, (CommandHotkeyHandler.__proto__ || Object.getPrototypeOf(CommandHotkeyHandler)).call(this, props));

    var commands = (0, _commands2.default)(_this);
    // Don't bind clipboard shortcuts (use native ones directly)
    ["cut", "copy", "paste"].forEach(function (cmdId) {
      return delete commands[cmdId];
    });
    _this.hotkeyDefs = (0, _teselagenReactComponents.getCommandHotkeys)(commands);
    _this.handlers = (0, _teselagenReactComponents.getCommandHotkeyHandlers)(commands);

    _this.Handler = (0, _teselagenReactComponents.withHotkeys)(_this.hotkeyDefs, _this.handlers)();
    return _this;
  }

  _createClass(CommandHotkeyHandler, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(this.Handler, { key: "handla" }),
        _react2.default.createElement(_teselagenReactComponents.HotkeysDialog, _extends({
          dialogTitle: "Editor Hotkeys",
          key: "hotkeyDialog",
          hotkeySets: {
            Editor: _extends({
              "Search File Menu": this.props.menuSearchHotkey || "cmd+/"
            }, this.hotkeyDefs)
          }
        }, this.props.hotkeyDialogProps))
      );
    }
  }]);

  return CommandHotkeyHandler;
}(_react2.default.Component);

exports.default = (0, _redux.compose)(_withEditorProps2.default)(CommandHotkeyHandler);
module.exports = exports["default"];