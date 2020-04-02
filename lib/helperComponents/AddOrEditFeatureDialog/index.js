"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _veSequenceUtils = require("ve-sequence-utils");

var _AddOrEditAnnotationDialog = require("../AddOrEditAnnotationDialog");

var _AddOrEditAnnotationDialog2 = _interopRequireDefault(_AddOrEditAnnotationDialog);

var _teselagenReactComponents = require("teselagen-react-components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderTypes = _react2.default.createElement(_teselagenReactComponents.ReactSelectField, {
  inlineLabel: true,
  tooltipError: true,
  defaultValue: "misc_feature",
  options: _veSequenceUtils.FeatureTypes.map(function (type) {
    return {
      label: _react2.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            marginRight: 10
          }
        },
        _react2.default.createElement("div", {
          style: {
            background: _veSequenceUtils.featureColors[type],
            height: 15,
            width: 15,
            marginRight: 5
          }
        }),
        type
      ),
      value: type
    };
  }),
  name: "type",
  label: "Type:"
});

exports.default = (0, _AddOrEditAnnotationDialog2.default)({
  formName: "AddOrEditFeatureDialog",
  dialogProps: {
    height: 500,
    width: 400
  },
  getProps: function getProps(props) {
    return {
      upsertAnnotation: props.upsertFeature,
      renderLocations: true,
      renderTypes: renderTypes,
      annotationTypePlural: "features"
    };
  }
});
module.exports = exports["default"];