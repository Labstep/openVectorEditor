"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createSimpleDialog = require("./createSimpleDialog");

var _createSimpleDialog2 = _interopRequireDefault(_createSimpleDialog);

var _teselagenReactComponents = require("teselagen-react-components");

var _lodash = require("lodash");

var _editorUtils = require("../utils/editorUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createSimpleDialog2.default)({
  formName: "goToDialog",
  fields: [{
    name: "sequencePosition",
    component: _teselagenReactComponents.NumericInputField,
    validate: function validate(val, vals, props) {
      var _get = (0, _lodash.get)(props, "extraProps.sequencePosition", {}),
          min = _get.min,
          max = _get.max;

      return min && val < min || max && val > max ? "Invalid position" : undefined;
    }
  }],
  withDialogProps: { title: "Go To", height: 190, onCloseHook: _editorUtils.tryToRefocusEditor }
});
module.exports = exports["default"];