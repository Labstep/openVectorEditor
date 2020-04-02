"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createMetaAction;

var _reduxAct = require("redux-act");

//this makes it so we can call our actionCreator like: 
//addFeature(myFeatureData, {editorName})
function createMetaAction(actionName, payloadHelper) {
  return (0, _reduxAct.createAction)(actionName, payloadHelper, function (unused, meta) {
    return _extends({}, meta, {
      editorName: meta.editorName
    });
  });
}
module.exports = exports["default"];