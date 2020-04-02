"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require("@blueprintjs/core");

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function VeWarning(props) {
  var message = props.message,
      tooltip = props.tooltip,
      rest = _objectWithoutProperties(props, ["message", "tooltip"]);

  return _react2.default.createElement(
    "div",
    _extends({ className: "veWarningMessage" }, rest),
    _react2.default.createElement(
      _core.Tooltip,
      {
        position: "bottom",
        intent: "warning",
        popoverClassName: "bp3-popover-content-sizing",
        content: tooltip
      },
      _react2.default.createElement(_core.Icon, { intent: "warning", icon: "warning-sign" })
    ),
    message
  );
}

exports.default = VeWarning;
module.exports = exports["default"];