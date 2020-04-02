"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = updateEditor;

var _veSequenceUtils = require("ve-sequence-utils");

// import cleanSequenceData from "./utils/cleanSequenceData";

function updateEditor(store, editorName) {
  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var extraMeta = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var convertAnnotationsFromAAIndices = arguments[4];

  var currentEditor = store.getState().VectorEditor[editorName] || {};
  var isAlreadyProteinEditor = currentEditor.sequenceData && currentEditor.sequenceData.isProtein;

  var sequenceData = initialValues.sequenceData,
      annotationVisibility = initialValues.annotationVisibility,
      annotationsToSupport = initialValues.annotationsToSupport,
      findTool = initialValues.findTool;

  var toSpread = {};
  if (sequenceData) {
    if (sequenceData.isProtein && !isAlreadyProteinEditor) {
      //we're editing a protein but haven't initialized the protein editor yet
      toSpread = {
        findTool: _extends({
          dnaOrAA: "AA"
        }, findTool),

        annotationVisibility: _extends({
          caret: true,
          sequence: false,
          reverseSequence: false
        }, annotationVisibility, { //we spread this here to allow the user to override this .. if they must!
          translations: false,
          aminoAcidNumbers: false,
          primaryProteinSequence: true
        }),
        annotationsToSupport: _extends({
          features: true,
          translations: false,
          primaryProteinSequence: true,
          parts: true,
          orfs: false,
          cutsites: false,
          primers: false
        }, annotationsToSupport)
      };
    } else if (isAlreadyProteinEditor && !sequenceData.isProtein) {
      //we're editing dna but haven't initialized the dna editor yet
      sequenceData.isProtein = false;
      toSpread = {
        findTool: _extends({
          dnaOrAA: "DNA"
        }, findTool),
        annotationVisibility: _extends({
          caret: true,
          sequence: true,
          reverseSequence: true
        }, annotationVisibility, { //we spread this here to allow the user to override this .. if they must!
          translations: false,
          aminoAcidNumbers: false,
          primaryProteinSequence: false
        }),
        annotationsToSupport: _extends({
          features: true,
          translations: true,
          primaryProteinSequence: false,
          parts: true,
          orfs: true,
          cutsites: true,
          primers: true
        }, annotationsToSupport)
      };
    }
  }
  var initialValuesToUse = _extends({}, initialValues, toSpread, sequenceData && {
    sequenceData: (0, _veSequenceUtils.tidyUpSequenceData)(sequenceData, {
      convertAnnotationsFromAAIndices: convertAnnotationsFromAAIndices,
      //if we have sequence data coming in make sure to tidy it up for the user :)
      annotationsAsObjects: true
    })
  });

  store.dispatch({
    type: "VECTOR_EDITOR_UPDATE",
    payload: initialValuesToUse,
    meta: _extends({
      editorName: editorName,
      disregardUndo: true
    }, extraMeta)
  });
}
module.exports = exports["default"];