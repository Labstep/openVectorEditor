"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.oveCommandFactory = oveCommandFactory;

var _teselagenReactComponents = require("teselagen-react-components");

function oveCommandFactory(instance, commandDefs) {
  return (0, _teselagenReactComponents.genericCommandFactory)({
    getArguments: function getArguments(cmdId, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          ctxInfo = _ref2[0];

      var args = [instance.props];
      var _instance$props = instance.props,
          store = _instance$props.store,
          editorName = _instance$props.editorName;

      if (store && editorName) {
        args.push(store.getState().VectorEditor[editorName]);
      }
      args.push(ctxInfo);
      return args;
    },

    handleReturn: function handleReturn() {},
    commandDefs: commandDefs
  });
}