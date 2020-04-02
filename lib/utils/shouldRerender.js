"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var shouldRerender = function shouldRerender(propKeys, stateKeys, that) {
  if (!that.hasRendered) {
    that.hasRendered = true;
    return true;
  }
  var nextProps = that.props;
  var oldProps = that.oldProps || {};
  var a = !isEq((0, _lodash.pick)(nextProps, propKeys), (0, _lodash.pick)(oldProps, propKeys));
  that.oldProps = nextProps;
  var nextState = that.state;
  var oldState = that.oldState || {};
  var b = !isEq((0, _lodash.pick)(nextState, stateKeys), (0, _lodash.pick)(oldState, stateKeys)) || !isEq;
  that.oldState = nextState;
  return a || b;
};
exports.default = shouldRerender;


var isEq = function isEq(o1, o2) {
  var isEq = (0, _lodash.isEqualWith)(o1, o2, function (val1, val2) {
    if ((0, _lodash.isFunction)(val1) && (0, _lodash.isFunction)(val2)) {
      return val1 === val2 || val1.toString() === val2.toString();
    }
  });
  return isEq;
};
module.exports = exports["default"];