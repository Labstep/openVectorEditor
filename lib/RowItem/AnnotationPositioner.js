"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnnotationPositioner = function (_React$PureComponent) {
  _inherits(AnnotationPositioner, _React$PureComponent);

  function AnnotationPositioner() {
    _classCallCheck(this, AnnotationPositioner);

    return _possibleConstructorReturn(this, (AnnotationPositioner.__proto__ || Object.getPrototypeOf(AnnotationPositioner)).apply(this, arguments));
  }

  _createClass(AnnotationPositioner, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "svg",
        {
          transform: this.props.transform || null,
          height: Math.max(0, this.props.height),
          className: (this.props.className || "") + " veRowViewAnnotationPosition",
          width: Math.max(0, this.props.width + 5),
          style: {
            position: "absolute",
            top: this.props.top,
            left: this.props.left
          }
        },
        this.props.children
      );
    }
  }]);

  return AnnotationPositioner;
}(_react2.default.PureComponent);

exports.default = AnnotationPositioner;

// key={'feature' + annotation.id + 'start:' + annotationRange.start}

module.exports = exports["default"];