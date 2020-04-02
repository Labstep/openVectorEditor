"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createSimpleDialog = require("./createSimpleDialog");

var _createSimpleDialog2 = _interopRequireDefault(_createSimpleDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createSimpleDialog2.default)({
  formName: "renameSequenceDialog",
  fields: [{ name: "newName", isRequired: true }],
  withDialogProps: { title: "Rename Sequence", height: 190 }
});
module.exports = exports["default"];