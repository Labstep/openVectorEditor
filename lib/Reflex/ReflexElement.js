"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; ///////////////////////////////////////////////////////////
// ReflexElement
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////


var _lodash = require("lodash.throttle");

var _lodash2 = _interopRequireDefault(_lodash);

var _reactMeasure = require("react-measure");

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Browser = require("./Browser");

var _Browser2 = _interopRequireDefault(_Browser);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReflexElement = (_temp = _class = function (_React$Component) {
  _inherits(ReflexElement, _React$Component);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function ReflexElement(props) {
    _classCallCheck(this, ReflexElement);

    var _this = _possibleConstructorReturn(this, (ReflexElement.__proto__ || Object.getPrototypeOf(ReflexElement)).call(this, props));

    _this.onResize = _this.onResize.bind(_this);

    _this.setStateThrottled = (0, _lodash2.default)(function (state) {
      _this.setState(state);
    }, _this.props.renderOnResizeRate);

    _this.state = {
      dimensions: {
        height: "100%",
        width: "100%"
      }
    };
    return _this;
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  _createClass(ReflexElement, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(props) {
        var directions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, dir;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(props.size !== this.props.size)) {
                  _context.next = 28;
                  break;
                }

                directions = this.toArray(props.direction);
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 5;
                _iterator = directions[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 14;
                  break;
                }

                dir = _step.value;
                _context.next = 11;
                return this.props.events.emit("element.size", {
                  size: props.size,
                  direction: dir,
                  element: this
                });

              case 11:
                _iteratorNormalCompletion = true;
                _context.next = 7;
                break;

              case 14:
                _context.next = 20;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](5);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 20:
                _context.prev = 20;
                _context.prev = 21;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 23:
                _context.prev = 23;

                if (!_didIteratorError) {
                  _context.next = 26;
                  break;
                }

                throw _iteratorError;

              case 26:
                return _context.finish(23);

              case 27:
                return _context.finish(20);

              case 28:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 16, 20, 28], [21,, 23, 27]]);
      }));

      function UNSAFE_componentWillReceiveProps(_x) {
        return _ref.apply(this, arguments);
      }

      return UNSAFE_componentWillReceiveProps;
    }()

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: "toArray",
    value: function toArray(obj) {
      return obj ? Array.isArray(obj) ? obj : [obj] : [];
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: "onResize",
    value: function onResize(rect) {
      var _props = this.props,
          renderOnResize = _props.renderOnResize,
          resizeHeight = _props.resizeHeight,
          resizeWidth = _props.resizeWidth;


      if (renderOnResize) {
        this.setStateThrottled({
          dimensions: _extends({}, resizeHeight && { height: Math.floor(rect.bounds.height) }, resizeWidth && { width: Math.floor(rect.bounds.width) })
        });
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var _this2 = this;

      if (this.props.propagateDimensions) {
        return _react2.default.Children.map(this.props.children, function (child) {
          var newProps = Object.assign({}, child.props, {
            dimensions: _this2.state.dimensions
          });

          return _react2.default.cloneElement(child, newProps);
        });
      }

      return this.props.children;
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var classNames = ["reflex-element"].concat(_toConsumableArray(this.props.className.split(" ")));

      var className = classNames.join(" ");

      var outerStyle = Object.assign({}, {
        WebkitBoxFlex: this.props.flex,
        FlexElement: this.props.flex,
        MozBoxFlex: this.props.flex,
        WebkitFlex: this.props.flex,
        flex: this.props.flex
      }, this.props.style);

      var innerStyle = {
        height: this.state.dimensions.height,
        width: this.state.dimensions.width
      };

      return _react2.default.createElement(
        _reactMeasure2.default,
        { bounds: true, onResize: this.onResize },
        function (_ref2) {
          var measureRef = _ref2.measureRef;
          return _react2.default.createElement(
            "div",
            { ref: measureRef, className: className, style: outerStyle },
            _react2.default.createElement(
              "div",
              { style: innerStyle },
              _this3.renderChildren()
            )
          );
        }
      );
    }
  }]);

  return ReflexElement;
}(_react2.default.Component), _class.defaultProps = {
  renderOnResize: _Browser2.default.isSafari(), // Safari is creepy ...
  propagateDimensions: false,
  renderOnResizeRate: 60,
  resizeHeight: true,
  resizeWidth: true,
  className: ""
}, _temp);
exports.default = ReflexElement;
ReflexElement.propTypes = process.env.NODE_ENV !== "production" ? {
  renderOnResizeRate: _propTypes2.default.number,
  propagateDimensions: _propTypes2.default.bool,
  renderOnResize: _propTypes2.default.bool,
  resizeHeight: _propTypes2.default.bool,
  resizeWidth: _propTypes2.default.bool,
  className: _propTypes2.default.string
} : {};
module.exports = exports["default"];