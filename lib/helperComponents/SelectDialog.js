"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _veRangeUtils = require("ve-range-utils");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require("redux-form");

var _teselagenReactComponents = require("teselagen-react-components");

var _redux = require("redux");

var _core = require("@blueprintjs/core");

var _lodash = require("lodash");

var _editorUtils = require("../utils/editorUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Single validation function - from & to have the same range
var validate = function validate(val, vals, props) {
  var _get = (0, _lodash.get)(props, "extraProps.from", {}),
      min = _get.min,
      max = _get.max;

  var circular = (0, _lodash.get)(props, "extraProps.circular");
  if (min && val < min || max && val > max) {
    return "Invalid position";
  }
  if (!circular && vals.from > vals.to) {
    return "Wrong from/to order";
  }
};

exports.default = (0, _redux.compose)((0, _teselagenReactComponents.withDialog)({
  isDraggable: true,
  width: 400,
  title: "Select Range",
  height: 270,
  onCloseHook: _editorUtils.tryToRefocusEditor
}), (0, _reduxForm.reduxForm)({
  form: "selectDialog"
}), (0, _reduxForm.formValues)("from", "to"))(function (_React$Component) {
  _inherits(SelectDialog, _React$Component);

  function SelectDialog() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectDialog.__proto__ || Object.getPrototypeOf(SelectDialog)).call.apply(_ref, [this].concat(args))), _this), _this.updateTempHighlight = function () {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          isStart = _ref2.isStart,
          isEnd = _ref2.isEnd;

      return function (val) {
        var _this$props = _this.props,
            selectionLayerUpdate = _this$props.selectionLayerUpdate,
            from = _this$props.from,
            to = _this$props.to,
            invalid = _this$props.invalid;

        if (invalid) return;
        selectionLayerUpdate((0, _veRangeUtils.convertRangeTo0Based)({
          start: isStart ? Math.round(val) : from,
          end: isEnd ? Math.round(val) : to
        }));
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SelectDialog, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          from = _props.from,
          to = _props.to,
          initialCaretPosition = _props.initialCaretPosition;

      this.initialSelection = { from: from, to: to, initialCaretPosition: initialCaretPosition };
      this.updateTempHighlight()();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          hideModal = _props2.hideModal,
          onSubmit = _props2.onSubmit,
          selectionLayerUpdate = _props2.selectionLayerUpdate,
          from = _props2.from,
          to = _props2.to,
          initialCaretPosition = _props2.initialCaretPosition,
          caretPositionUpdate = _props2.caretPositionUpdate,
          sequenceLength = _props2.sequenceLength,
          extraProps = _props2.extraProps,
          isProtein = _props2.isProtein,
          invalid = _props2.invalid,
          handleSubmit = _props2.handleSubmit;

      var selectionLength = (0, _veRangeUtils.getRangeLength)({
        start: Number(from),
        end: Number(to)
      }, sequenceLength);

      return _react2.default.createElement(
        "div",
        {
          className: (0, _classnames2.default)(_core.Classes.DIALOG_BODY, "tg-min-width-dialog simple-dialog")
        },
        _react2.default.createElement(_teselagenReactComponents.NumericInputField, _extends({
          autoFocus: true,
          minorStepSize: 1,
          label: "From:",
          clampValueOnBlur: true
        }, extraProps.to, {
          validate: validate
          //tnrtodo this normalization will actually work when https://github.com/palantir/blueprint/issues/3553 gets resolved
          , normalize: normalizeToInt,
          onAnyNumberChange: this.updateTempHighlight({ isStart: true }),
          name: "from"
        })),
        _react2.default.createElement(_teselagenReactComponents.NumericInputField, _extends({
          label: "To:",
          clampValueOnBlur: true,
          minorStepSize: 1
        }, extraProps.from, {
          validate: validate,
          normalize: normalizeToInt,
          onAnyNumberChange: this.updateTempHighlight({ isEnd: true }),
          name: "to"
        })),
        _react2.default.createElement(
          "div",
          { className: "dialog-buttons" },
          _react2.default.createElement(_core.Button, {
            onClick: function onClick() {
              if (initialCaretPosition > -1) {
                caretPositionUpdate(initialCaretPosition);
              } else {
                selectionLayerUpdate({
                  start: _this2.initialSelection.from,
                  end: _this2.initialSelection.to
                });
              }
              hideModal();
              (0, _editorUtils.tryToRefocusEditor)();
            },
            text: "Cancel"
          }),
          _react2.default.createElement(_core.Button, {
            onClick: handleSubmit(function (data) {
              if (onSubmit) onSubmit(data);
              hideModal();
              (0, _editorUtils.tryToRefocusEditor)();
            }),
            intent: _core.Intent.PRIMARY,
            text: "Select " + (invalid ? 0 : selectionLength) + " " + (isProtein ? "AA" : "BP") + (selectionLength === 1 ? "" : "s"),
            disabled: invalid
          })
        )
      );
    }
  }]);

  return SelectDialog;
}(_react2.default.Component));


var normalizeToInt = function normalizeToInt(val) {
  var int = Math.round(val);
  var normalizedVal = "" + (int >= 0 ? int : 1);
  return normalizedVal;
};
module.exports = exports["default"];