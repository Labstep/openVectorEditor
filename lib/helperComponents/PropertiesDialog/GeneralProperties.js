"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _teselagenReactComponents = require("teselagen-react-components");

var _reduxForm = require("redux-form");

var _withEditorProps = require("../../withEditorProps");

var _withEditorProps2 = _interopRequireDefault(_withEditorProps);

var _recompose = require("recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeneralProperties = function (_React$Component) {
  _inherits(GeneralProperties, _React$Component);

  function GeneralProperties() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GeneralProperties);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GeneralProperties.__proto__ || Object.getPrototypeOf(GeneralProperties)).call.apply(_ref, [this].concat(args))), _this), _this.updateSeqDesc = function (val) {
      return _this.props.sequenceDescriptionUpdate(val);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GeneralProperties, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          readOnly = _props.readOnly,
          _props$showReadOnly = _props.showReadOnly,
          showReadOnly = _props$showReadOnly === undefined ? true : _props$showReadOnly,
          updateCircular = _props.updateCircular,
          isProtein = _props.isProtein,
          disableSetReadOnly = _props.disableSetReadOnly,
          updateAvailability = _props.updateAvailability,
          sequenceData = _props.sequenceData,
          updateReadOnlyMode = _props.updateReadOnlyMode,
          onSave = _props.onSave,
          showAvailability = _props.showAvailability,
          sequenceNameUpdate = _props.sequenceNameUpdate;

      var _ref2 = sequenceData || {},
          description = _ref2.description,
          name = _ref2.name,
          _ref2$sequence = _ref2.sequence,
          sequence = _ref2$sequence === undefined ? "" : _ref2$sequence,
          _ref2$proteinSequence = _ref2.proteinSequence,
          proteinSequence = _ref2$proteinSequence === undefined ? "" : _ref2$proteinSequence,
          circular = _ref2.circular,
          materiallyAvailable = _ref2.materiallyAvailable;

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          "div",
          { className: "ve-flex-row" },
          _react2.default.createElement(
            "div",
            { className: "ve-column-left" },
            "Name:"
          ),
          " ",
          _react2.default.createElement(
            "div",
            { className: "ve-column-right" },
            _react2.default.createElement(_teselagenReactComponents.InputField, {
              disabled: readOnly,
              onFieldSubmit: function onFieldSubmit(val) {
                sequenceNameUpdate(val);
              },
              name: "name",
              enableReinitialize: true,
              defaultValue: name
            }),
            " "
          )
        ),
        !isProtein && _react2.default.createElement(
          "div",
          { className: "ve-flex-row circularLinearSelect" },
          _react2.default.createElement(
            "div",
            { className: "ve-column-left" },
            "Circular/Linear:"
          ),
          " ",
          _react2.default.createElement(
            "div",
            { className: "ve-column-right" },
            " ",
            _react2.default.createElement(_teselagenReactComponents.BPSelect, {
              disabled: readOnly,
              onChange: function onChange(val) {
                updateCircular(val === "circular");
              },
              value: circular ? "circular" : "linear",
              options: [{ label: "Circular", value: "circular" }, { label: "Linear", value: "linear" }]
            })
          )
        ),
        showAvailability && _react2.default.createElement(
          "div",
          { className: "ve-flex-row" },
          _react2.default.createElement(
            "div",
            { className: "ve-column-left" },
            "Material Availability:"
          ),
          " ",
          _react2.default.createElement(
            "div",
            { className: "ve-column-right" },
            " ",
            _react2.default.createElement(_teselagenReactComponents.BPSelect, {
              disabled: readOnly,
              onChange: function onChange(val) {
                updateAvailability(val === "available");
              },
              value: materiallyAvailable ? "available" : "unavailable",
              options: [{ label: "Available", value: "available" }, { label: "Unavailable", value: "unavailable" }]
            })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "ve-flex-row" },
          _react2.default.createElement(
            "div",
            { className: "ve-column-left" },
            "Length:"
          ),
          " ",
          _react2.default.createElement(
            "div",
            { className: "ve-column-right" },
            " ",
            isProtein ? proteinSequence.length : sequence.length
          )
        ),
        showReadOnly && _react2.default.createElement(
          "div",
          { className: "ve-flex-row" },
          _react2.default.createElement(
            "div",
            { className: "ve-column-left" },
            "Is Editable:"
          ),
          " ",
          _react2.default.createElement(
            "div",
            { className: "ve-column-right" },
            " ",
            _react2.default.createElement(_teselagenReactComponents.BPSelect, {
              disabled: !onSave || disableSetReadOnly,
              onChange: function onChange(val) {
                updateReadOnlyMode(val === "readOnly");
              },
              value: readOnly ? "readOnly" : "editable",
              options: [{ label: "Read Only", value: "readOnly" }, { label: "Editable", value: "editable" }]
            })
          )
        ),
        _react2.default.createElement(
          "div",
          null,
          "Description:"
        ),
        _react2.default.createElement(_teselagenReactComponents.TextareaField, {
          clickToEdit: true,
          name: "description",
          onFieldSubmit: this.updateSeqDesc,
          defaultValue: description
        })
      );
    }
  }]);

  return GeneralProperties;
}(_react2.default.Component);

exports.default = (0, _recompose.compose)(_withEditorProps2.default, (0, _reduxForm.reduxForm)({
  form: "GeneralProperties"
}))(GeneralProperties);
module.exports = exports["default"];