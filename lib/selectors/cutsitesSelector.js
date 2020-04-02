"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _circularSelector = require("./circularSelector");

var _circularSelector2 = _interopRequireDefault(_circularSelector);

var _sequenceSelector = require("./sequenceSelector");

var _sequenceSelector2 = _interopRequireDefault(_sequenceSelector);

var _restrictionEnzymesSelector = require("./restrictionEnzymesSelector");

var _restrictionEnzymesSelector2 = _interopRequireDefault(_restrictionEnzymesSelector);

var _cutsiteLabelColorSelector = require("./cutsiteLabelColorSelector");

var _cutsiteLabelColorSelector2 = _interopRequireDefault(_cutsiteLabelColorSelector);

var _reselect = require("reselect");

var _bsonObjectid = require("bson-objectid");

var _bsonObjectid2 = _interopRequireDefault(_bsonObjectid);

var _lodash = require("lodash");

var _veSequenceUtils = require("ve-sequence-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Object.keys(enzymeList).forEach(function(key){
//   var enzyme = enzymeList[key]
//   // Returns a dark RGB color with random alpha
//   enzyme.color = randomcolor({
//      luminosity: 'dark',
//      // format: 'rgba' // e.g. 'rgba(9, 1, 107, 0.6482447960879654)'
//   });
// })

function cutsitesSelector(sequence, circular, enzymeList, cutsiteLabelColors) {
  //get the cutsites grouped by enzyme
  var cutsitesByName = (0, _veSequenceUtils.getCutsitesFromSequence)(sequence, circular, Object.keys(enzymeList).map(function (enzymeName) {
    return enzymeList[enzymeName];
  }));
  //tag each cutsite with a unique id
  var cutsitesById = {};

  Object.keys(cutsitesByName).forEach(function (enzymeName) {
    var cutsitesForEnzyme = cutsitesByName[enzymeName];
    cutsitesForEnzyme.forEach(function (cutsite) {
      var numberOfCuts = cutsitesByName[enzymeName].length;
      var uniqueId = (0, _bsonObjectid2.default)().str;
      cutsite.id = uniqueId;
      cutsite.numberOfCuts = numberOfCuts;
      cutsite.annotationType = "cutsite";
      cutsitesById[uniqueId] = cutsite;
      var mergedCutsiteColors = Object.assign({ single: "salmon", double: "lightblue", multi: "lightgrey" }, cutsiteLabelColors);
      if (numberOfCuts === 1) {
        cutsite.labelColor = mergedCutsiteColors.single;
        cutsite.labelClassname = "singleCutter";
      } else if (numberOfCuts === 2) {
        cutsite.labelColor = mergedCutsiteColors.double;
        cutsite.labelClassname = "doubleCutter";
      } else {
        cutsite.labelColor = mergedCutsiteColors.multi;
        cutsite.labelClassname = "multiCutter";
      }
    });
  });
  // create an array of the cutsites
  var cutsitesArray = (0, _lodash.flatMap)(cutsitesByName, function (cutsitesForEnzyme) {
    return cutsitesForEnzyme;
  });
  return {
    cutsitesByName: cutsitesByName,
    cutsitesById: cutsitesById,
    cutsitesArray: cutsitesArray
  };
}

exports.default = (0, _reselect.createSelector)(_sequenceSelector2.default, _circularSelector2.default, _restrictionEnzymesSelector2.default, _cutsiteLabelColorSelector2.default, function () {
  return cutsitesSelector.apply(undefined, arguments);
});
//
//

module.exports = exports["default"];