"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require("redux");

var _teselagenReactComponents = require("teselagen-react-components");

var _redux2 = require("../redux");

var _redux3 = _interopRequireDefault(_redux2);

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxForm = require("redux-form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeStore = function makeStore() {
  var composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    name: "createVectorEditor",
    latency: 1000,
    // serialize: {
    //   replacer: (key, value) => {
    //   }
    // },
    actionsBlacklist: ["HOVEREDANNOTATIONUPDATE", "HOVEREDANNOTATIONCLEAR"]
  }) || _redux.compose;

  var store = (0, _redux.createStore)((0, _redux.combineReducers)({
    form: _reduxForm.reducer,
    tg_modalState: _teselagenReactComponents.tg_modalState,
    VectorEditor: (0, _redux3.default)()
  }), undefined, composeEnhancer((0, _redux.applyMiddleware)(_reduxThunk2.default, _redux2.vectorEditorMiddleware) //your store should be redux-thunk connected for the VectorEditor component to work
  ));
  return store;
}; //optionally connect to the redux store
exports.default = makeStore;
module.exports = exports["default"];