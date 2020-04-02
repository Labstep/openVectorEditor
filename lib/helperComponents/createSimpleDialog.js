"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleGenericDialogForm = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createSimpleDialog;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require("redux-form");

var _lodash = require("lodash");

var _recompose = require("recompose");

var _teselagenReactComponents = require("teselagen-react-components");

var _redux = require("redux");

var _core = require("@blueprintjs/core");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

require("./simpleDialog.css");

var _editorUtils = require("../utils/editorUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: move to TRC
var SimpleGenericDialogForm = exports.SimpleGenericDialogForm = function (_React$Component) {
  _inherits(SimpleGenericDialogForm, _React$Component);

  function SimpleGenericDialogForm() {
    _classCallCheck(this, SimpleGenericDialogForm);

    return _possibleConstructorReturn(this, (SimpleGenericDialogForm.__proto__ || Object.getPrototypeOf(SimpleGenericDialogForm)).apply(this, arguments));
  }

  _createClass(SimpleGenericDialogForm, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          hideModal = _props.hideModal,
          handleSubmit = _props.handleSubmit,
          fields = _props.fields,
          _props$buttonText = _props.buttonText,
          buttonText = _props$buttonText === undefined ? "OK" : _props$buttonText,
          _props$showCancel = _props.showCancel,
          showCancel = _props$showCancel === undefined ? true : _props$showCancel,
          onSubmit = _props.onSubmit,
          invalid = _props.invalid,
          _props$extraProps = _props.extraProps,
          extraProps = _props$extraProps === undefined ? {} : _props$extraProps;

      return _react2.default.createElement(
        "div",
        {
          className: (0, _classnames2.default)(_core.Classes.DIALOG_BODY, "tg-min-width-dialog simple-dialog")
        },
        fields.map(function (field, i) {
          var component = field.component,
              isRequired = field.isRequired,
              props = _objectWithoutProperties(field, ["component", "isRequired"]);

          var FieldComp = component || _teselagenReactComponents.InputField;
          var fieldProps = _extends({
            autoFocus: i === 0
          }, props, extraProps[props.name]);
          fieldProps.label = fieldProps.label || (0, _lodash.startCase)(fieldProps.name) + ":";
          if (isRequired) fieldProps.validate = required;
          return _react2.default.createElement(FieldComp, _extends({ key: field.name }, fieldProps));
        }),
        _react2.default.createElement(
          "div",
          { className: "dialog-buttons" },
          showCancel && _react2.default.createElement(_core.Button, { onClick: function onClick() {
              hideModal();
              (0, _editorUtils.tryToRefocusEditor)();
            }, text: "Cancel" }),
          _react2.default.createElement(_core.Button, {
            onClick: handleSubmit(function (data) {
              if (onSubmit) onSubmit(data);
              hideModal();
              (0, _editorUtils.tryToRefocusEditor)();
            }),
            intent: _core.Intent.PRIMARY,
            text: buttonText,
            disabled: invalid
          })
        )
      );
    }
  }]);

  return SimpleGenericDialogForm;
}(_react2.default.Component);

function required(val) {
  if (!val) return "Required";
}

function createSimpleDialog(props) {
  return (0, _redux.compose)((0, _teselagenReactComponents.withDialog)(_extends({
    isDraggable: true,
    width: 400
  }, props.withDialogProps)), (0, _reduxForm.reduxForm)({
    form: props.formName
  }), (0, _recompose.withProps)(props))(SimpleGenericDialogForm);
}