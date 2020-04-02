"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSingular = getSingular;
var userDefinedTypes = exports.userDefinedTypes = ["parts", "features", "translations", "primers"];

var userDefinedTypesMap = exports.userDefinedTypesMap = userDefinedTypes.reduce(function (nextVal, key) {
  nextVal[key] = key;
  return nextVal;
  //  looks like this:
  //{
  // 	parts: 'parts',
  // 	features: 'features',
  // 	translations: 'translations',
  // 	primers: 'primers',
  // }
}, {});

var derivedDataTypes = exports.derivedDataTypes = ["cutsites", "orfs"];
var derivedDataTypesMap = exports.derivedDataTypesMap = derivedDataTypes.reduce(function (nextVal, key) {
  nextVal[key] = key;
  return nextVal;
}, {});
function getSingular(type) {
  return type.slice(0, -1);
}

var allTypes = exports.allTypes = [].concat(userDefinedTypes, derivedDataTypes);