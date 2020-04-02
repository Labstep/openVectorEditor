"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; ///////////////////////////////////////////////////////////
// ReflexSplitter
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////


var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Browser = require("./Browser");

var _Browser2 = _interopRequireDefault(_Browser);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReflexSplitter = (_temp = _class = function (_React$Component) {
  _inherits(ReflexSplitter, _React$Component);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function ReflexSplitter(props) {
    _classCallCheck(this, ReflexSplitter);

    var _this = _possibleConstructorReturn(this, (ReflexSplitter.__proto__ || Object.getPrototypeOf(ReflexSplitter)).call(this, props));

    _this.state = {
      active: false
    };

    _this.onMouseMove = _this.onMouseMove.bind(_this);
    _this.onMouseDown = _this.onMouseDown.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);

    _this.document = props.document;
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


  _createClass(ReflexSplitter, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.document) {
        return;
      }

      this.document.addEventListener("touchend", this.onMouseUp);

      this.document.addEventListener("mouseup", this.onMouseUp);

      this.document.addEventListener("mousemove", this.onMouseMove, {
        passive: false
      });

      this.document.addEventListener("touchmove", this.onMouseMove, {
        passive: false
      });
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!this.document) {
        return;
      }

      this.document.removeEventListener("mouseup", this.onMouseUp);

      this.document.removeEventListener("touchend", this.onMouseUp);

      this.document.removeEventListener("mousemove", this.onMouseMove);

      this.document.removeEventListener("touchmove", this.onMouseMove);
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: "onMouseMove",
    value: function onMouseMove(event) {
      if (this.state.active) {
        this.props.events.emit("splitter.resize", {
          splitter: this,
          event: event
        });

        if (this.props.onResize) {
          this.props.onResize({
            domElement: _reactDom2.default.findDOMNode(this),
            component: this
          });
        }

        event.stopPropagation();
        event.preventDefault();
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      this.setState({
        active: true
      });

      if (this.props.onStartResize) {
        // cancels resize from controller
        // if needed by returning true
        // to onStartResize
        if (this.props.onStartResize({
          domElement: _reactDom2.default.findDOMNode(this),
          component: this
        })) {
          return;
        }
      }

      this.props.events.emit("splitter.startResize", {
        splitter: this,
        event: event
      });
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: "onMouseUp",
    value: function onMouseUp(event) {
      if (this.state.active) {
        this.setState({
          active: false
        });

        if (this.props.onStopResize) {
          this.props.onStopResize({
            domElement: _reactDom2.default.findDOMNode(this),
            component: this
          });
        }

        this.props.events.emit("splitter.stopResize", {
          splitter: this,
          event: event
        });
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: "render",
    value: function render() {
      var classNames = ["reflex-splitter"].concat(_toConsumableArray(this.props.className.split(" ")));

      if (_Browser2.default.isMobile()) {
        classNames.push("reflex-thin");
      }

      if (this.state.active) {
        classNames.push("active");
      }

      return _react2.default.createElement(
        "div",
        {
          className: classNames.join(" "),
          onTouchStart: this.onMouseDown,
          onMouseDown: this.onMouseDown,
          style: this.props.style,
          id: this.props.id
        },
        this.props.children
      );
    }
  }]);

  return ReflexSplitter;
}(_react2.default.Component), _class.defaultProps = {
  document: typeof document === "undefined" ? null : document,
  onStartResize: null,
  onStopResize: null,
  propagate: false,
  onResize: null,
  className: "",
  style: {}
}, _temp);
exports.default = ReflexSplitter;
ReflexSplitter.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
  onStartResize: _propTypes2.default.func,
  onStopResize: _propTypes2.default.func,
  className: _propTypes2.default.string,
  propagate: _propTypes2.default.bool,
  onResize: _propTypes2.default.func,
  style: _propTypes2.default.object
} : {};
module.exports = exports["default"];