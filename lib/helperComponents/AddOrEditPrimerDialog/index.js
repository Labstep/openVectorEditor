"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AddOrEditAnnotationDialog = require("../AddOrEditAnnotationDialog");

var _AddOrEditAnnotationDialog2 = _interopRequireDefault(_AddOrEditAnnotationDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _AddOrEditAnnotationDialog2.default)({
  formName: "AddOrEditPrimerDialog",
  getProps: function getProps(props) {
    return {
      upsertAnnotation: props.upsertPrimer,
      annotationTypePlural: "primers"
    };
  }
});
module.exports = exports["default"];