"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Clipboard = (_temp2 = _class = function (_React$Component) {
  _inherits(Clipboard, _React$Component);

  function Clipboard() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Clipboard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call.apply(_ref, [this].concat(args))), _this), _this.handleKeyDown = function (e) {
      if (document.activeElement && ["input", "select", "textarea"].indexOf(document.activeElement.tagName.toLowerCase()) !== -1) {
        return; //stop early if we're inside an input
      }
      var metaKeyIsDown = e.ctrlKey || e.metaKey;
      if (!metaKeyIsDown || !["x", "c", "v"].includes(e.key)) {
        _this.origFocusedElement = null;
        return;
      }
      _this.origFocusedElement = document.activeElement;
      _this.node.select();
    }, _this.handleKeyUp = function () {
      if (_this.origFocusedElement) {
        _this.origFocusedElement.focus();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // static propTypes = {
  //   value: PropTypes.string.isRequired
  // };

  _createClass(Clipboard, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.node.parentNode.addEventListener("keydown", this.handleKeyDown, false);
      this.node.parentNode.addEventListener("keyup", this.handleKeyUp, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.node.parentNode.removeEventListener("keydown", this.handleKeyDown, false);
      this.node.parentNode.removeEventListener("keyup", this.handleKeyUp, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var value = this.props.value;
      var style = {
        position: "fixed",
        width: 1,
        height: 1,
        opacity: 0,
        left: 0,
        padding: 0,
        top: 0,
        margin: 0,
        zIndex: 100
      };
      return _react2.default.createElement("input", {
        ref: function ref(c) {
          if (c) {
            _this2.node = c;
          }
        },
        style: style,
        type: "text",
        value: value,
        onChange: noop,
        readOnly: true,
        className: "clipboard",
        onPaste: this.props.onPaste,
        onCopy: this.props.onCopy,
        onCut: this.props.onCut
      });
    }
  }]);

  return Clipboard;
}(_react2.default.Component), _class.defaultProps = {
  className: "clipboard"
}, _temp2);
exports.default = Clipboard;

var noop = function noop() {};
module.exports = exports["default"];