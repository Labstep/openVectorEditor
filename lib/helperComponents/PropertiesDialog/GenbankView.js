"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _bioParsers = require("bio-parsers");

var _core = require("@blueprintjs/core");

var _withEditorProps = require("../../withEditorProps");

var _recompose = require("recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { Button } from "@blueprintjs/core";


var GenbankView = function (_React$Component) {
  _inherits(GenbankView, _React$Component);

  function GenbankView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GenbankView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GenbankView.__proto__ || Object.getPrototypeOf(GenbankView)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      fileTypeToView: "genbank"
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GenbankView, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props$sequenceData = this.props.sequenceData,
          sequenceData = _props$sequenceData === undefined ? {} : _props$sequenceData;

      var filestring = void 0;
      switch (this.state.fileTypeToView) {
        case "fasta":
          filestring = (0, _bioParsers.jsonToFasta)(sequenceData);
          break;
        case "teselagen":
          filestring = JSON.stringify((0, _bioParsers.cleanUpTeselagenJsonForExport)(sequenceData), null, 4);
          break;
        default:
          filestring = (0, _bioParsers.jsonToGenbank)(sequenceData);
      }

      return _react2.default.createElement(
        "div",
        { className: "genbankFileView" },
        _react2.default.createElement(_core.HTMLSelect, {
          fill: false,
          options: [{ label: "Genbank", value: "genbank" }, { label: "Fasta", value: "fasta" }, { label: "Teselagen JSON", value: "teselagen" }],
          onChange: function onChange(e) {
            _this2.setState({ fileTypeToView: e.target.value });
          }
        }),
        _react2.default.createElement("textarea", {
          "data-test": "ve-genbank-text",
          readOnly: true
          // wrap="soft"
          , style: {
            whiteSpace: "pre",
            overflowWrap: "normal",
            overflowX: "scroll",
            fontSize: 11,
            fontFamily: "monospace",
            width: 540,
            height: 350
          },
          value: filestring
        })
      );
    }
  }]);

  return GenbankView;
}(_react2.default.Component);

exports.default = (0, _recompose.compose)((0, _withEditorProps.connectToEditor)(function (_ref2) {
  var _ref2$sequenceData = _ref2.sequenceData,
      sequenceData = _ref2$sequenceData === undefined ? {} : _ref2$sequenceData;

  return {
    sequenceData: sequenceData
  };
}))(GenbankView);
module.exports = exports["default"];