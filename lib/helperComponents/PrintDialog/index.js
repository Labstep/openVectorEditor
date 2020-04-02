"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrintDialog = undefined;

var _class2, _temp3;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reduxForm = require("redux-form");

var _teselagenReactComponents = require("teselagen-react-components");

var _redux = require("redux");

var _core = require("@blueprintjs/core");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _withEditorProps = require("../../withEditorProps");

var _withEditorProps2 = _interopRequireDefault(_withEditorProps);

var _CircularView = require("../../CircularView");

var _CircularView2 = _interopRequireDefault(_CircularView);

var _LinearView = require("../../LinearView");

var _LinearView2 = _interopRequireDefault(_LinearView);

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PrintDialog = exports.PrintDialog = function (_React$Component) {
  _inherits(PrintDialog, _React$Component);

  function PrintDialog() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PrintDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PrintDialog.__proto__ || Object.getPrototypeOf(PrintDialog)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      circular: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PrintDialog, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          hideModal = _props.hideModal,
          editorName = _props.editorName;
      // const sequenceLength = sequenceData.sequence.length;

      var isCirc = (this.state || {}).circular;
      return _react2.default.createElement(
        "div",
        { className: (0, _classnames2.default)(_core.Classes.DIALOG_BODY, "tg-min-width-dialog") },
        _react2.default.createElement(
          "div",
          { style: { display: "flex", justifyContent: "center" } },
          _react2.default.createElement(
            _core.ButtonGroup,
            null,
            _react2.default.createElement(
              _core.Button,
              {
                onClick: function onClick() {
                  _this2.setState({ circular: true });
                },
                active: isCirc
              },
              "Circular"
            ),
            _react2.default.createElement(
              _core.Button,
              {
                onClick: function onClick() {
                  _this2.setState({ circular: false });
                },
                active: !isCirc
              },
              "Linear"
            )
          )
        ),
        _react2.default.createElement("br", null),
        _react2.default.createElement(ComponentToPrint, {
          fullscreen: this.state && this.state.fullscreen,
          circular: isCirc,
          editorName: editorName || "StandaloneEditor",
          ref: function ref(el) {
            return _this2.componentRef = el;
          }
        }),
        _react2.default.createElement("br", null),
        _react2.default.createElement(
          "div",
          { style: { display: "flex", justifyContent: "flex-end" } },
          _react2.default.createElement(ReactToPrint, {
            trigger: function trigger() {
              return _react2.default.createElement(
                _core.Button,
                { intent: "primary" },
                "Print"
              );
            },
            content: function content() {
              return _this2.componentRef;
            },
            onBeforePrint: function onBeforePrint() {
              _this2.setState({ fullscreen: true });
            },
            bodyClass: "ve-print"
            // printPreview
            , pageStyle: "@page { size: auto;  margin: 0mm; } @media print { \n              body { \n                 -webkit-print-color-adjust: exact; page-break-after: always; \n              } }",
            ignoreLinks: true //needed because some css is linked to but is not loading..
            , onAfterPrint: function onAfterPrint() {
              _this2.setState({ fullscreen: false });
              hideModal();
            }
          })
        )
      );
    }
  }]);

  return PrintDialog;
}(_react2.default.Component);

exports.default = (0, _redux.compose)((0, _teselagenReactComponents.withDialog)({
  // isOpen: true,
  title: "Print"
}), _withEditorProps2.default, (0, _reduxForm.reduxForm)({
  form: "PrintDialog"
}))(PrintDialog);
var ReactToPrint = (_temp3 = _class2 = function (_React$Component2) {
  _inherits(ReactToPrint, _React$Component2);

  function ReactToPrint() {
    var _ref2;

    var _temp2, _this3, _ret2;

    _classCallCheck(this, ReactToPrint);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref2 = ReactToPrint.__proto__ || Object.getPrototypeOf(ReactToPrint)).call.apply(_ref2, [this].concat(args))), _this3), _this3.startPrint = function () {
      var _this3$props = _this3.props,
          bodyClass = _this3$props.bodyClass,
          content = _this3$props.content,
          copyStyles = _this3$props.copyStyles,
          ignoreLinks = _this3$props.ignoreLinks,
          pageStyle = _this3$props.pageStyle,
          printPreview = _this3$props.printPreview;


      var contentEl = content();

      if (contentEl === undefined) {
        console.error("Refs are not available for stateless components. For 'react-to-print' to work only Class based components can be printed");
        return false;
      }
      var printWindow = document.createElement("iframe");

      if (printPreview) {
        var printOutline = document.createElement("div");
        var closeButton = document.createElement("button");
        var printButton = document.createElement("button");
        var elsToRemoveFromDomEventually = [printWindow, printOutline, closeButton, printButton];

        printOutline.style.position = "absolute";
        printOutline.style.top = "0px";
        printOutline.style.left = "0px";
        printOutline.style.width = "1210px";
        printOutline.style.height = "1056px";
        printOutline.style.background = "grey";
        printOutline.style.zIndex = 100000300;
        document.body.appendChild(printOutline);
        printButton.style.position = "absolute";
        printButton.style.top = "0px";
        printButton.style.left = "0px";
        printButton.style.width = "100px";
        printButton.style.background = "lightblue";
        printButton.innerText = "print";
        printButton.onclick = function () {
          _this3.triggerPrint(printWindow, true);
        };
        printButton.style.zIndex = 100000500;
        document.body.appendChild(printButton);

        closeButton.style.position = "absolute";
        closeButton.style.top = "0px";
        closeButton.style.left = "250px";
        closeButton.style.width = "100px";
        closeButton.style.background = "lightblue";
        closeButton.innerText = "close";
        closeButton.onclick = function () {
          _this3.removeWindow(elsToRemoveFromDomEventually);
        };
        closeButton.style.zIndex = 100000500;
        document.body.appendChild(closeButton);
      }

      // printWindow.style.height = height
      // printWindow.style.width = width

      // todo: find the max height/width of the print window and fit it to that!

      // if (printPreview)  defaultPageStyle += " "

      var contentNodes = (0, _reactDom.findDOMNode)(contentEl);
      var linkNodes = document.querySelectorAll('link[rel="stylesheet"]');

      _this3.linkTotal = linkNodes.length || 0;
      _this3.linkLoaded = 0;

      var markLoaded = function markLoaded() {
        _this3.linkLoaded++;
        if (_this3.linkLoaded === _this3.linkTotal) {
          if (printPreview) {
            return;
          }
          _this3.triggerPrint(printWindow);
        }
      };

      printWindow.onload = function () {
        /* IE11 support */
        if (window.navigator && window.navigator.userAgent.indexOf("Trident/7.0") > -1) {
          printWindow.onload = null;
        }
        var domDoc = printWindow.contentDocument || printWindow.contentWindow.document;
        var srcCanvasEls = [].concat(_toConsumableArray(contentNodes.querySelectorAll("canvas")));

        domDoc.open();
        domDoc.write(contentNodes.outerHTML);
        domDoc.close();

        printWindow.style.position = "absolute";
        // printWindow.style.width = "100%";
        // printWindow.style.height = "100%";
        printWindow.style.top = "-1000px";
        printWindow.style.left = "-1000px";
        printWindow.style.width = domDoc.body.scrollWidth + "px";

        printWindow.style.height = domDoc.body.scrollHeight + "px";

        if (printPreview) {
          printWindow.style.top = "0px";
          printWindow.style.left = "0px";
          printWindow.style.width = "1210px";
          printWindow.style.height = "1056px";

          printWindow.style.background = "white";

          printWindow.style.zIndex = 100000400;
        }

        /* remove date/time from top */
        var defaultPageStyle = pageStyle === undefined ? "@page { size: auto;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact;} }" : pageStyle;

        var styleEl = domDoc.createElement("style");
        styleEl.appendChild(domDoc.createTextNode(defaultPageStyle));
        domDoc.head.appendChild(styleEl);

        // domDoc.body.style.transform = ""
        if (bodyClass.length) {
          domDoc.body.classList.add(bodyClass);
        }

        var canvasEls = domDoc.querySelectorAll("canvas");
        [].concat(_toConsumableArray(canvasEls)).forEach(function (node, index) {
          node.getContext("2d").drawImage(srcCanvasEls[index], 0, 0);
        });

        if (copyStyles !== false) {
          var headEls = document.querySelectorAll('style, link[rel="stylesheet"]');

          [].concat(_toConsumableArray(headEls)).forEach(function (node, index) {
            var newHeadEl = domDoc.createElement(node.tagName);
            var styleCSS = "";

            if (node.tagName === "STYLE") {
              if (node.sheet) {
                for (var i = 0; i < node.sheet.cssRules.length; i++) {
                  styleCSS += node.sheet.cssRules[i].cssText + "\r\n";
                }

                newHeadEl.setAttribute("id", "react-to-print-" + index);
                newHeadEl.appendChild(domDoc.createTextNode(styleCSS));
              }
            } else {
              var attributes = [].concat(_toConsumableArray(node.attributes));
              attributes.forEach(function (attr) {
                newHeadEl.setAttribute(attr.nodeName, attr.nodeValue);
              });

              newHeadEl.readystatechange = markLoaded.bind(null, "link");
              newHeadEl.onload = markLoaded.bind(null, "link");
              newHeadEl.onerror = markLoaded.bind(null, "link");
            }

            domDoc.head.appendChild(newHeadEl);
          });
        }
        if (_this3.linkTotal === 0 || copyStyles === false || ignoreLinks) {
          if (printPreview) {
            return;
          }
          _this3.triggerPrint(printWindow);
        }
      };

      document.body.appendChild(printWindow);
    }, _temp2), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(ReactToPrint, [{
    key: "triggerPrint",
    value: function triggerPrint(target, noRemove) {
      var _this4 = this;

      var _props2 = this.props,
          onBeforePrint = _props2.onBeforePrint,
          onAfterPrint = _props2.onAfterPrint;


      if (onBeforePrint) {
        onBeforePrint();
      }

      setTimeout(function () {
        target.contentWindow.focus();
        target.contentWindow.print();
        !noRemove && _this4.removeWindow(target);

        if (onAfterPrint) {
          onAfterPrint();
        }
      }, 500);
    }
  }, {
    key: "removeWindow",
    value: function removeWindow(targets) {
      targets && setTimeout(function () {
        (Array.isArray(targets) ? targets : [targets]).forEach(function (target) {
          target.parentNode.removeChild(target);
        });
      }, 500);
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return _react2.default.cloneElement(this.props.trigger(), {
        ref: function ref(el) {
          return _this5.triggerRef = el;
        },
        onClick: this.startPrint
      });
    }
  }]);

  return ReactToPrint;
}(_react2.default.Component), _class2.defaultProps = {
  copyStyles: true,
  closeAfterPrint: true,
  bodyClass: ""
}, _temp3);
ReactToPrint.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Preview the print without actually triggering the print dialog */
  printPreview: _propTypes2.default.bool,
  /** Copy styles over into print window. default: true */
  copyStyles: _propTypes2.default.bool,
  /** Ignore link styles. Necessary because sometime links don't load.., default: false */
  ignoreLinks: _propTypes2.default.bool,
  /** Trigger action used to open browser print */
  trigger: _propTypes2.default.func.isRequired,
  /** Content to be printed */
  content: _propTypes2.default.func.isRequired,
  /** Callback function to trigger before print */
  onBeforePrint: _propTypes2.default.func,
  /** Callback function to trigger after print */
  onAfterPrint: _propTypes2.default.func,
  /** Override default print window styling */
  pageStyle: _propTypes2.default.string,
  /** Optional class to pass to the print window body */
  bodyClass: _propTypes2.default.string
} : {};

var ComponentToPrint = function (_React$Component3) {
  _inherits(ComponentToPrint, _React$Component3);

  function ComponentToPrint() {
    _classCallCheck(this, ComponentToPrint);

    return _possibleConstructorReturn(this, (ComponentToPrint.__proto__ || Object.getPrototypeOf(ComponentToPrint)).apply(this, arguments));
  }

  _createClass(ComponentToPrint, [{
    key: "render",

    // componentDidMount() {
    //   let ctx = this.canvasEl.getContext("2d");
    //   ctx.beginPath();
    //   ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    //   ctx.stroke();
    // }

    value: function render() {
      var _props3 = this.props,
          editorName = _props3.editorName,
          circular = _props3.circular;

      // let w = window,
      //     d = document,
      //     e = d.documentElement,
      //     g = d.getElementsByTagName("body")[0],
      //     width = w.innerWidth || e.clientWidth || g.clientWidth,
      //     height = w.innerHeight || e.clientHeight || g.clientHeight;

      // const width =  670;
      // const height = 900;

      return circular ? _react2.default.createElement(_CircularView2.default, { noInteractions: true, editorName: editorName }) : _react2.default.createElement(_LinearView2.default, { noInteractions: true, editorName: editorName });
    }
  }]);

  return ComponentToPrint;
}(_react2.default.Component);