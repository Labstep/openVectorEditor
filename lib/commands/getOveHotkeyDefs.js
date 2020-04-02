"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOveHotkeyDefs;

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _teselagenReactComponents = require("teselagen-react-components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOveHotkeyDefs(_ref) {
  var store = _ref.store,
      editorName = _ref.editorName;

  var commands = (0, _index2.default)({
    props: {
      store: store,
      editorName: editorName
    }
  });
  return (0, _teselagenReactComponents.getCommandHotkeys)(commands);
}
module.exports = exports["default"];