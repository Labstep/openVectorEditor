"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createSequenceInputPopup;

var _reactDom = require("react-dom");

var _veRangeUtils = require("ve-range-utils");

var _popper = require("popper.js");

var _popper2 = _interopRequireDefault(_popper);

var _veSequenceUtils = require("ve-sequence-utils");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _proteinUtils = require("../utils/proteinUtils");

require("./createSequenceInputPopupStyle.css");

var _core = require("@blueprintjs/core");

var _editorUtils = require("../utils/editorUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Tether from "tether";


var div = void 0;

var SequenceInputNoHotkeys = function (_React$Component) {
  _inherits(SequenceInputNoHotkeys, _React$Component);

  function SequenceInputNoHotkeys() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SequenceInputNoHotkeys);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SequenceInputNoHotkeys.__proto__ || Object.getPrototypeOf(SequenceInputNoHotkeys)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      charsToInsert: "",
      hasTempError: false
    }, _this.handleUnmountIfClickOustidePopup = function (e) {
      var n = (0, _reactDom.findDOMNode)(_this);
      if (!n) return;
      var node = n.parentNode;
      if (!node) return;
      if (node.contains(e.target)) {
        return;
      }
      _this.handleUnmount();
    }, _this.handleUnmount = function () {
      setTimeout(function () {
        var n = (0, _reactDom.findDOMNode)(_this);
        if (!n) return;
        var node = n.parentNode;
        if (!node) return;
        (0, _reactDom.unmountComponentAtNode)(node);
        _this.props.nodeToReFocus && _this.props.nodeToReFocus.focus();
        document.getElementById("sequenceInputBubble").outerHTML = "";
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SequenceInputNoHotkeys, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener("mousedown", this.handleUnmountIfClickOustidePopup);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleUnmountIfClickOustidePopup);
    }
  }, {
    key: "handleInsert",
    value: function handleInsert() {
      var _props = this.props,
          _props$handleInsert = _props.handleInsert,
          handleInsert = _props$handleInsert === undefined ? function () {} : _props$handleInsert,
          isProtein = _props.isProtein;
      var charsToInsert = this.state.charsToInsert;

      if (!charsToInsert.length) {
        return;
      }
      var seqToInsert = isProtein ? {
        proteinSequence: charsToInsert
      } : {
        sequence: charsToInsert
      };
      handleInsert(seqToInsert);
    }
  }, {
    key: "renderHotkeys",
    value: function renderHotkeys() {
      return _react2.default.createElement(
        _core.Hotkeys,
        null,
        _react2.default.createElement(_core.Hotkey, {
          global: true,
          combo: "esc",
          label: "Escape",
          onKeyDown: this.handleUnmount
        }),
        _react2.default.createElement(_core.Hotkey, { combo: "enter", label: "Enter", onKeyDown: this.handleInsert })
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          isReplace = _props2.isReplace,
          selectionLayer = _props2.selectionLayer,
          sequenceLength = _props2.sequenceLength,
          isProtein = _props2.isProtein,
          caretPosition = _props2.caretPosition,
          acceptedChars = _props2.acceptedChars,
          maxInsertSize = _props2.maxInsertSize;
      var _state = this.state,
          charsToInsert = _state.charsToInsert,
          hasTempError = _state.hasTempError;


      var message = void 0;
      if (isReplace) {
        var betweenVals = (0, _veSequenceUtils.getInsertBetweenVals)(-1, selectionLayer, sequenceLength);

        message = _react2.default.createElement(
          "span",
          null,
          "Press ",
          _react2.default.createElement(
            "span",
            { style: { fontWeight: "bolder" } },
            "ENTER"
          ),
          " to replace",
          " ",
          (0, _proteinUtils.divideBy3)((0, _veRangeUtils.getRangeLength)(selectionLayer, sequenceLength), isProtein),
          " ",
          isProtein ? "AAs" : "base pairs",
          " between",
          " ",
          isProtein ? (0, _veSequenceUtils.convertDnaCaretPositionOrRangeToAA)(betweenVals[0]) : betweenVals[0],
          " ",
          "and",
          " ",
          isProtein ? (0, _veSequenceUtils.convertDnaCaretPositionOrRangeToAA)(betweenVals[1] + 2) : betweenVals[1]
        );
      } else {
        message = _react2.default.createElement(
          "span",
          null,
          "Press ",
          _react2.default.createElement(
            "span",
            { style: { fontWeight: "bolder" } },
            "ENTER"
          ),
          " to insert",
          " ",
          charsToInsert.length,
          " ",
          isProtein ? "AAs" : "base pairs",
          " after",
          " ",
          isProtein ? "AA" : "base",
          " ",
          isProtein ? (0, _veSequenceUtils.convertDnaCaretPositionOrRangeToAA)(caretPosition) : caretPosition
        );
      }
      return _react2.default.createElement(
        "div",
        { className: "sequenceInputBubble" },
        _react2.default.createElement("input", {
          autoCorrect: "off",
          onKeyDown: function onKeyDown(e) {
            if (e.keyCode === 27) {
              _this2.handleUnmount();
            }
            if (e.keyCode === 13) {
              _this2.handleInsert();
              _this2.handleUnmount();
            }
          },
          className: _core.Classes.INPUT,
          value: charsToInsert,
          autoFocus: true,
          style: hasTempError ? { borderColor: "red" } : {},
          onChange: function onChange(e) {
            var sanitizedVal = "";
            e.target.value.split("").forEach(function (letter) {
              if (acceptedChars.includes(letter.toLowerCase())) {
                sanitizedVal += letter;
              }
            });
            if (e.target.value.length !== sanitizedVal.length) {
              _this2.setState({
                hasTempError: true
              });
              setTimeout(function () {
                _this2.setState({
                  hasTempError: false
                });
              }, 200);
            }
            if (maxInsertSize && sanitizedVal.lenth > maxInsertSize) {
              return window.toastr.error("Sorry, your insert is greater than ", maxInsertSize);
            }
            e.target.value = sanitizedVal;

            _this2.setState({ charsToInsert: sanitizedVal });
          }
        }),
        _react2.default.createElement(
          "div",
          { style: { marginTop: 10 } },
          message
        ),
        _react2.default.createElement(
          "div",
          { style: { marginTop: 10 } },
          "Press ",
          _react2.default.createElement(
            "span",
            { style: { fontWeight: "bolder" } },
            "ESC"
          ),
          " to",
          " ",
          _react2.default.createElement(
            "a",
            { onClick: this.handleUnmount },
            "cancel"
          )
        )
      );
    }
  }]);

  return SequenceInputNoHotkeys;
}(_react2.default.Component);

var SequenceInput = (0, _core.HotkeysTarget)(SequenceInputNoHotkeys);

function createSequenceInputPopup(props) {
  var useEventPositioning = props.useEventPositioning;


  var caretEl = void 0;
  if (useEventPositioning) {
    //we have to make a fake event here so that popper.js will position on the page correctly
    var e = useEventPositioning.e,
        nodeToReFocus = useEventPositioning.nodeToReFocus;
    // e.persist();

    var top = e.clientY;
    var right = e.clientX;
    var bottom = e.clientY;
    var left = e.clientX;
    caretEl = {
      nodeToRefocus: nodeToReFocus,
      getBoundingClientRect: function getBoundingClientRect() {
        return {
          top: top,
          right: right,
          bottom: bottom,
          left: left
        };
      },
      clientWidth: 0,
      clientHeight: 0
    };
  }

  if (!caretEl || !caretEl === 0 || !isElementInViewport(caretEl)) {
    var activeEl = getActiveElement();
    if (activeEl) {
      caretEl = activeEl.querySelector(".veCaret");
    }
  }
  if (!caretEl || !caretEl === 0 || !isElementInViewport(caretEl)) {
    caretEl = getActiveElement();
  }
  if (!caretEl || !caretEl === 0 || !isElementInViewport(caretEl)) {
    caretEl = document.querySelector(".veCaret");
  }
  if (document.body.classList.contains("sequenceDragging")) {
    window.toastr.warning("Can't insert new sequence while dragging");
    //don't allow this
    return;
  }

  // function closeInput() {
  //   sequenceInputBubble.remove();
  // }
  div = document.createElement("div");
  div.style.zIndex = "400000";
  div.id = "sequenceInputBubble";
  document.body.appendChild(div);

  var innerEl = _react2.default.createElement(SequenceInput, _extends({
    nodeToReFocus: caretEl.nodeToRefocus || (0, _editorUtils.getNodeToRefocus)(caretEl)
  }, props));

  (0, _reactDom.render)(innerEl, div);

  if (!caretEl) {
    return console.error("there must be a caret element present in order to display the insertSequence popup");
  }

  new _popper2.default(caretEl, div, {
    placement: "bottom",
    modifiers: {
      offset: { offset: "94" }
    }
  });
}

var getActiveElement = function getActiveElement(document) {
  document = document || window.document;

  // Check if the active element is in the main web or iframe
  if (document.body === document.activeElement ||
  /* eslint-disable eqeqeq*/

  document.activeElement.tagName == "IFRAME"
  /* eslint-enable eqeqeq*/
  ) {
      // Get iframes
      var iframes = document.getElementsByTagName("iframe");
      for (var i = 0; i < iframes.length; i++) {
        // Recall
        var focused = getActiveElement(iframes[i].contentWindow.document);
        if (focused !== false) {
          return focused; // The focused
        }
      }
    } else return document.activeElement;

  return false;
};

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) /*or $(window).height() */ && rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
  ;
}
module.exports = exports["default"];