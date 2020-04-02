"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _recompose = require("recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import deepEqual from "deep-equal";

var onlyUpdateForKeys = function onlyUpdateForKeys(propKeys) {
  var hoc = (0, _recompose.shouldUpdate)(function (props, nextProps) {
    var a = !isEq((0, _lodash.pick)(nextProps, propKeys), (0, _lodash.pick)(props, propKeys));
    return a;
  });

  // if (process.env.NODE_ENV !== "production") {
  //   return BaseComponent =>
  //     setDisplayName(wrapDisplayName(BaseComponent, "onlyUpdateForKeys"))(
  //       hoc(BaseComponent)
  //     );
  // }
  return hoc;
};

exports.default = onlyUpdateForKeys;


var isEq = function isEq(o1, o2) {
  var isEq = _lodash2.default.isEqualWith(o1, o2, function (val1, val2) {
    if (_lodash2.default.isFunction(val1) && _lodash2.default.isFunction(val2)) {
      return val1 === val2 || val1.toString() === val2.toString();
    }
  });
  return isEq;
};
module.exports = exports["default"];