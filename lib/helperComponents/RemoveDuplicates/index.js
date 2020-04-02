"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveDuplicatesDialog = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require("redux-form");

var _teselagenReactComponents = require("teselagen-react-components");

var _redux = require("redux");

var _core = require("@blueprintjs/core");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _withEditorProps = require("../../withEditorProps");

var _withEditorProps2 = _interopRequireDefault(_withEditorProps);

var _lodash = require("lodash");

var _utils = require("../PropertiesDialog/utils");

var _lib = require("ve-range-utils/lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var schema = {
  fields: [
  // ...(noColor
  //   ? []
  //   : [
  //       {
  //         path: "color",
  //         type: "string",
  //         render: color => {
  //           return (
  //             <ColorPickerPopover>
  //               <div style={{ height: 20, width: 20, background: color }} />
  //             </ColorPickerPopover>
  //           );
  //         }
  //       }
  //     ]),
  { path: "name", type: "string" },
  // ...(noType ? [] : [{ path: "type", type: "string" }]),
  _utils.sizeSchema, { path: "strand", type: "string" }]
};

var RemoveDuplicatesDialog = exports.RemoveDuplicatesDialog = function (_React$Component) {
  _inherits(RemoveDuplicatesDialog, _React$Component);

  function RemoveDuplicatesDialog() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RemoveDuplicatesDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RemoveDuplicatesDialog.__proto__ || Object.getPrototypeOf(RemoveDuplicatesDialog)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      dups: []
    }, _this.checkboxStyle = { marginTop: 0, marginBottom: 0 }, _this.delayedRecomputeDups = function () {
      setTimeout(function () {
        _this.recomputeDups();
      });
    }, _this.recomputeDups = function () {
      var _this$props = _this.props,
          type = _this$props.type,
          _this$props$sequenceD = _this$props.sequenceData,
          sequenceData = _this$props$sequenceD === undefined ? { sequence: "" } : _this$props$sequenceD,
          sequenceLength = _this$props.sequenceLength,
          ignoreName = _this$props.ignoreName,
          ignoreStrand = _this$props.ignoreStrand,
          ignoreStartAndEnd = _this$props.ignoreStartAndEnd;


      var annotations = sequenceData[type];
      var dups = [];
      var seqsHashByStartEndStrandName = {};
      (0, _lodash.forEach)(annotations, function (a) {
        var hash = (ignoreStartAndEnd ? "" : a.start) + "&" + (ignoreStartAndEnd ? "" : a.end) + "&" + (ignoreStrand ? "" : a.strand) + "&" + (ignoreName ? "" : a.name);
        if (seqsHashByStartEndStrandName[hash]) {
          dups.push(_extends({}, a, { size: (0, _lib.getRangeLength)(a, sequenceLength) }));
        } else {
          seqsHashByStartEndStrandName[hash] = true;
        }
      });
      _this.setState({ dups: dups });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RemoveDuplicatesDialog, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.recomputeDups();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          duplicatesToRemoveSelectedEntities = _props.duplicatesToRemoveSelectedEntities,
          hideModal = _props.hideModal,
          type = _props.type;


      var selectedIds = this.state.dups.map(function (d) {
        return d.id;
      });
      // const sequenceLength = sequenceData.sequence.length;
      // const isCirc = (this.state || {}).circular;
      return _react2.default.createElement(
        "div",
        { className: (0, _classnames2.default)(_core.Classes.DIALOG_BODY, "tg-min-width-dialog") },
        _react2.default.createElement(_teselagenReactComponents.DataTable, {
          noPadding: true,
          withCheckboxes: true,
          noFullscreenButton: true
          // onRowSelect={this.onRowSelect}
          , maxHeight: 400,
          selectedIds: selectedIds,
          formName: "duplicatesToRemove",
          noRouter: true,
          noRowsFoundMessage: "No duplicates found",
          compact: true,
          noHeader: true,
          noFooter: true,
          withSearch: false,
          hideSelectedCount: true,
          isInfinite: true,
          schema: schema,
          entities: this.state.dups
        }),
        _react2.default.createElement(
          "div",
          {
            style: {
              marginTop: 10,
              display: "flex",
              justifyContent: "space-between"
            }
          },
          _react2.default.createElement(
            _teselagenReactComponents.InfoHelper,
            { isButton: true, isPopover: true, icon: "settings" },
            _react2.default.createElement(
              "div",
              { style: { maxWidth: 200 } },
              _react2.default.createElement(
                "h5",
                null,
                "Ignore These Fields While Finding Duplicates:"
              ),
              _react2.default.createElement(_teselagenReactComponents.SwitchField, {
                containerStyle: { marginBottom: 2 }
                //delay the call to recompute dups until redux has had time to update
                , onFieldSubmit: this.delayedRecomputeDups,
                style: this.checkboxStyle,
                name: "ignoreName",
                label: "Name"
              }),
              _react2.default.createElement(_teselagenReactComponents.SwitchField, {
                containerStyle: { marginBottom: 2 }
                //delay the call to recompute dups until redux has had time to update
                , onFieldSubmit: this.delayedRecomputeDups,
                style: this.checkboxStyle,
                name: "ignoreStrand",
                label: "Strand"
              }),
              _react2.default.createElement(_teselagenReactComponents.SwitchField, {
                containerStyle: { marginBottom: 2 }
                //delay the call to recompute dups until redux has had time to update
                , onFieldSubmit: this.delayedRecomputeDups,
                style: this.checkboxStyle,
                name: "ignoreStartAndEnd",
                label: "Start and End"
              })
            )
          ),
          _react2.default.createElement(
            _core.Button,
            {
              intent: "primary",
              onClick: function onClick() {
                _this2.props[(0, _lodash.camelCase)("delete_" + type).slice(0, -1)](duplicatesToRemoveSelectedEntities.map(function (d) {
                  return d.id;
                }));
                window.toastr.success("Successfully Deleted " + duplicatesToRemoveSelectedEntities.length + " " + (0, _lodash.startCase)(type));
                hideModal();
              },
              disabled: !(duplicatesToRemoveSelectedEntities || []).length
            },
            "Remove ",
            duplicatesToRemoveSelectedEntities.length,
            " Duplicates"
          )
        )
      );
    }
  }]);

  return RemoveDuplicatesDialog;
}(_react2.default.Component);

exports.default = (0, _redux.compose)((0, _teselagenReactComponents.withDialog)(), _withEditorProps2.default, (0, _teselagenReactComponents.withSelectedEntities)("duplicatesToRemove"), (0, _reduxForm.reduxForm)({
  form: "RemoveDuplicatesDialog"
}), (0, _reduxForm.formValues)("ignoreName", "ignoreStrand", "ignoreStartAndEnd"))(RemoveDuplicatesDialog);