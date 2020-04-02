"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MergeFeaturesDialog = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uniqid = require("uniqid");

var _uniqid2 = _interopRequireDefault(_uniqid);

var _reduxForm = require("redux-form");

var _teselagenReactComponents = require("teselagen-react-components");

var _redux = require("redux");

var _core = require("@blueprintjs/core");

var _lodash = require("lodash");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _withEditorProps = require("../../withEditorProps");

var _withEditorProps2 = _interopRequireDefault(_withEditorProps);

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MergeFeaturesDialog = exports.MergeFeaturesDialog = function (_React$Component) {
  _inherits(MergeFeaturesDialog, _React$Component);

  function MergeFeaturesDialog() {
    _classCallCheck(this, MergeFeaturesDialog);

    return _possibleConstructorReturn(this, (MergeFeaturesDialog.__proto__ || Object.getPrototypeOf(MergeFeaturesDialog)).apply(this, arguments));
  }

  _createClass(MergeFeaturesDialog, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          hideModal = _props.hideModal,
          handleSubmit = _props.handleSubmit,
          selectedAnnotations = _props.selectedAnnotations,
          sequenceData = _props.sequenceData,
          selectionLayerUpdate = _props.selectionLayerUpdate,
          id1 = _props.id1,
          upsertFeature = _props.upsertFeature,
          deleteFeature = _props.deleteFeature,
          id2 = _props.id2,
          change = _props.change;
      var features = sequenceData.features;

      var feat1 = features[id1];
      var feat2 = features[id2];

      var _flatMap = (0, _lodash.flatMap)(selectedAnnotations.idStack, function (id) {
        var ann = selectedAnnotations.idMap[id];
        if (ann.annotationTypePlural === "features") {
          return id;
        }
        return [];
      }),
          _flatMap2 = _slicedToArray(_flatMap, 2),
          id1default = _flatMap2[0],
          id2default = _flatMap2[1];

      return _react2.default.createElement(
        "div",
        {
          className: (0, _classnames2.default)(_core.Classes.DIALOG_BODY, "tg-min-width-dialog", "veMergeFeaturesDialog")
        },
        _react2.default.createElement(
          _teselagenReactComponents.InfoHelper,
          { displayToSide: true },
          _react2.default.createElement(
            "span",
            { style: { fontStyle: "italic", fontSize: 11, marginTop: -8 } },
            "Choose features in the dropdown or shift click directly on the plasmid map"
          )
        ),
        _react2.default.createElement("br", null),
        _react2.default.createElement(_teselagenReactComponents.ReactSelectField, {
          inlineLabel: true,
          required: true,
          defaultValue: id1default,
          enableReinitialize: true,
          name: "id1",
          label: _react2.default.createElement(
            "div",
            { style: { display: "flex", width: "100%", alignItems: "top" } },
            _react2.default.createElement(
              _teselagenReactComponents.InfoHelper,
              _extends({
                popoverProps: {
                  position: "top"
                }
              }, {
                onClick: function onClick() {
                  feat1 && change("name", feat1.name);
                },
                disabled: !feat1,
                icon: "small-plus",
                isButton: true
              }),
              "Use Name"
            ),
            _react2.default.createElement(
              "div",
              { style: { padding: "10px 0px 0px 10px", minWidth: 80 } },
              "Feature 1:"
            )
          ),
          options: (0, _lodash.flatMap)(features, function (feat) {
            if (feat.id === (feat2 && feat2.id)) return []; //filter out other feature as an option
            return {
              value: feat.id,
              label: feat.name
            };
          })
        }),
        _react2.default.createElement(
          "div",
          {
            style: {
              marginTop: -8,
              marginBottom: 10,
              display: "flex",
              justifyContent: "center",
              width: " 100%"
            }
          },
          _react2.default.createElement(
            _core.Button,
            {
              onClick: function onClick() {
                var id1Holder = id1;
                change("id1", id2);
                change("id2", id1Holder);
              },
              icon: "swap-vertical"
            },
            " ",
            "Swap",
            " "
          ),
          " ",
          "\xA0",
          " "
        ),
        _react2.default.createElement(_teselagenReactComponents.ReactSelectField, {
          inlineLabel: true,
          required: true,
          defaultValue: id2default,
          enableReinitialize: true,
          name: "id2",
          label: _react2.default.createElement(
            "div",
            { style: { display: "flex", width: "100%", alignItems: "top" } },
            _react2.default.createElement(
              _teselagenReactComponents.InfoHelper,
              {
                onClick: function onClick() {
                  feat2 && change("name", feat2.name);
                },
                disabled: !feat2,
                icon: "small-plus",
                isButton: true
              },
              "Use Name"
            ),
            _react2.default.createElement(
              "div",
              { style: { padding: "10px 0px 0px 10px", minWidth: 80 } },
              "Feature 2:"
            )
          ),
          options: (0, _lodash.flatMap)(features, function (feat) {
            if (feat.id === (feat1 && feat1.id)) return []; //filter out other feature as an option
            return {
              value: feat.id,
              label: feat.name
            };
          })
        }),
        _react2.default.createElement(_teselagenReactComponents.InputField, {
          autoFocus: true,
          inlineLabel: true,
          enableReinitialize: true,
          defaultValue: feat1 && feat1.name,
          validate: required,
          name: "name",
          label: "New Name:"
        }),
        _react2.default.createElement(
          "div",
          { style: { display: "flex" } },
          _react2.default.createElement(_teselagenReactComponents.InputField, {
            inlineLabel: true,
            disabled: true,
            enableReinitialize: true,
            defaultValue: !feat1 ? "" : feat1.start + 1,
            validate: required,
            name: "start",
            label: "New Start:"
          }),
          "\xA0 \xA0 \xA0",
          _react2.default.createElement(_teselagenReactComponents.InputField, {
            inlineLabel: true,
            disabled: true,
            enableReinitialize: true,
            defaultValue: !feat2 ? "" : feat2.end + 1,
            validate: required,
            name: "end",
            label: "New End:"
          })
        ),
        _react2.default.createElement(_teselagenReactComponents.CheckboxField, {
          name: "preserveFeatures",
          defaultValue: false,
          label: "Preserve features (by default they will be removed once merged)"
        }),
        _react2.default.createElement(
          "div",
          {
            style: { display: "flex", justifyContent: "flex-end" },
            className: "width100"
          },
          _react2.default.createElement(
            _core.Button,
            {
              onClick: handleSubmit(function (_ref) {
                var id1 = _ref.id1,
                    id2 = _ref.id2,
                    name = _ref.name,
                    preserveFeatures = _ref.preserveFeatures,
                    start = _ref.start,
                    end = _ref.end;

                if (!preserveFeatures) {
                  deleteFeature([id1, id2], {
                    batchUndoStart: true
                  });
                }
                upsertFeature(_extends({}, feat1, {
                  id: (0, _uniqid2.default)(),
                  start: start - 1,
                  end: end - 1,
                  name: name
                }), {
                  batchUndoEnd: true
                });
                selectionLayerUpdate({
                  start: start - 1,
                  end: end - 1
                });
                hideModal();
              }),
              intent: _core.Intent.PRIMARY
            },
            "Create Merged Feature"
          )
        )
      );
    }
  }]);

  return MergeFeaturesDialog;
}(_react2.default.Component);

function required(val) {
  if (!val) return "Required";
}
exports.default = (0, _redux.compose)((0, _teselagenReactComponents.withDialog)({
  isDraggable: true,
  height: 480,
  width: 400
}), _withEditorProps2.default, (0, _reduxForm.reduxForm)({
  form: "MergeFeaturesDialog",
  validate: function validate(_ref2) {
    var id1 = _ref2.id1,
        id2 = _ref2.id2;

    var errors = {};
    if (!id1 || Array.isArray(id1)) {
      errors.id1 = "Please select a feature";
    }
    if (!id2 || Array.isArray(id2)) {
      errors.id2 = "Please select a feature";
    }
    return errors;
  }
}), (0, _reduxForm.formValues)("id1", "id2"))(MergeFeaturesDialog);