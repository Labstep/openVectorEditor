"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addAlignment;
function addAlignment(store) {
  var alignment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  store.dispatch({
    type: "UPSERT_ALIGNMENT_RUN",
    payload: alignment
  });
}
module.exports = exports["default"];