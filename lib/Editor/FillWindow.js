"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FillWindow = function (_React$Component) {
  _inherits(FillWindow, _React$Component);

  function FillWindow() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FillWindow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FillWindow.__proto__ || Object.getPrototypeOf(FillWindow)).call.apply(_ref, [this].concat(args))), _this), _this.updateDimensions = (0, _lodash.debounce)(function () {
      if (_this.props.disabled) return;
      _this.setState({ randomRerenderTrigger: Math.random() });
    }, 100), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FillWindow, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("resize", this.updateDimensions);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
    }
  }, {
    key: "render",
    value: function render() {
      var w = window,
          d = document,
          e = d.documentElement,
          g = d.getElementsByTagName("body")[0],
          width = w.innerWidth || e.clientWidth || g.clientWidth,
          height = w.innerHeight || e.clientHeight || g.clientHeight;
      var windowDimensions = {
        width: width,
        height: height
      };

      var _props = this.props,
          children = _props.children,
          disabled = _props.disabled,
          style = _props.style,
          rest = _objectWithoutProperties(_props, ["children", "disabled", "style"]);

      if (disabled) return children(windowDimensions);
      return _react2.default.createElement(
        "div",
        _extends({}, rest, {
          style: _extends({
            width: width,
            height: height,
            position: "fixed",
            top: 0,
            left: 0,
            background: "white"
          }, style)
        }),
        children(windowDimensions)
      );
    }
  }]);

  return FillWindow;
}(_react2.default.Component);

exports.default = FillWindow;
module.exports = exports["default"];