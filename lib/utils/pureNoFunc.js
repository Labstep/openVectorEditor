"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _recompose = require("recompose");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isEq = function isEq(o1, o2) {
  var isEq = _lodash2.default.isEqualWith(o1, o2, function (val1, val2) {
    if (_lodash2.default.isFunction(val1) && _lodash2.default.isFunction(val2)) {
      return val1 === val2 || val1.toString() === val2.toString();
    }
  });
  return isEq;
};

// import shouldUpdate from './shouldUpdate'
// import shallowEqual from './shallowEqual'
// import setDisplayName from './setDisplayName'
// import wrapDisplayName from './wrapDisplayName'

var pure = function pure(BaseComponent) {
  var hoc = (0, _recompose.shouldUpdate)(function (props, nextProps) {
    return !isEq(props, nextProps);
  });

  // if (process.env.NODE_ENV !== 'production') {
  //   return setDisplayName(wrapDisplayName(BaseComponent, 'pure'))(
  //     hoc(BaseComponent)
  //   )
  // }

  return hoc(BaseComponent);
};

exports.default = pure;
module.exports = exports["default"];