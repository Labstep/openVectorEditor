"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDropzone = require("react-dropzone");

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

require("./DropHandler.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropHandler = function (_React$Component) {
  _inherits(DropHandler, _React$Component);

  function DropHandler() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DropHandler);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DropHandler.__proto__ || Object.getPrototypeOf(DropHandler)).call.apply(_ref, [this].concat(args))), _this), _this.handleDrop = function (files) {
      _this.props.importSequenceFromFile(files[0]);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DropHandler, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          children = _props.children,
          style = _props.style,
          className = _props.className,
          disabled = _props.disabled;

      return _react2.default.createElement(
        _reactDropzone2.default,
        _extends({
          disabled: disabled,
          disableClick: true,
          multiple: false,
          accept: [".gb", ".gbk", ".fasta", ".fa", ".gp", ".txt"],
          activeClassName: "isActive",
          rejectClassName: "isRejected",
          onDropRejected: function onDropRejected() {
            window.toastr.error("Error: Incorrect File Type");
          },
          onDrop: this.handleDrop
        }, { style: style, className: className }),
        _react2.default.createElement(DraggingMessage, null),
        children
      );
    }
  }]);

  return DropHandler;
}(_react2.default.Component);

exports.default = DropHandler;

function DraggingMessage() {
  return _react2.default.createElement(
    "div",
    { className: "dropzone-dragging-message" },
    "Drop Fasta or Genbank files to view them in the editor. The following extensions are accepted: .gb .gbk .fasta .fa .gp .txt"
  );
}
module.exports = exports["default"];