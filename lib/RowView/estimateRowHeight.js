"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rowHeights = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _lodash = require("lodash");

var debug = 0;

var rowHeights = exports.rowHeights = {
  rowJumpButtons: { height: 30 },
  spacer: { height: 10 },
  aminoAcidNumbers: { height: 9 },
  translations: { spaceBetweenAnnotations: 2, marginTop: 5, height: 17 },
  parts: { spaceBetweenAnnotations: 2, marginTop: 5, height: 15 },
  primers: { spaceBetweenAnnotations: 2, marginTop: 5, height: 15 },
  features: { spaceBetweenAnnotations: 2, marginTop: 5, height: 15 },
  warnings: { spaceBetweenAnnotations: 2, marginTop: 5, height: 15 },
  assemblyPieces: { spaceBetweenAnnotations: 2, marginTop: 5, height: 15 },
  lineageAnnotations: { spaceBetweenAnnotations: 2, marginTop: 5, height: 15 },
  orfs: { spaceBetweenAnnotations: 2, marginTop: 5, height: 15 },
  //tnrtodo -- we should estimate label height for parts/features/primers if externalLabels is true
  cutsiteLabels: { spaceBetweenAnnotations: 0, height: 15 },
  sequence: { height: 15 },
  reverseSequence: { height: 15 },
  axis: { marginTop: 5, height: 15 }
};

rowHeights.primaryProteinSequence = rowHeights.translations;

Object.keys(rowHeights).forEach(function (k) {
  rowHeights[k].type = k;
  rowHeights[k].marginTop = rowHeights[k].marginTop || 0;
  rowHeights[k].marginBottom = rowHeights[k].marginBottom || 0;
  rowHeights[k].spaceBetweenAnnotations = rowHeights[k].spaceBetweenAnnotations || 0;
});
var translations = {
  getHeight: function getHeight(props) {
    if (props.annotationVisibility.aminoAcidNumbers) {
      return [rowHeights.aminoAcidNumbers.type, rowHeights.translations.type];
    }
    return rowHeights.translations.type;
  },
  hasYOffset: true
};

var annotationsToCompute = {
  spacer: {
    alwaysVisible: true,
    height: rowHeights.spacer.type
  },
  primaryProteinSequence: translations,
  translations: translations,
  parts: {
    height: rowHeights.parts.type,
    hasYOffset: true
  },
  primers: {
    height: rowHeights.primers.type,
    hasYOffset: true
  },
  features: {
    height: rowHeights.features.type,
    hasYOffset: true
  },
  warnings: {
    height: rowHeights.warnings.type,
    hasYOffset: true
  },
  orfs: {
    height: rowHeights.orfs.type,
    hasYOffset: true
  },
  sequence: {
    height: rowHeights.sequence.type
  },
  reverseSequence: {
    height: rowHeights.reverseSequence.type
  },
  axis: {
    height: rowHeights.axis.type
  },
  cutsiteLabels: {
    typeOverride: "cutsites",
    height: rowHeights.cutsiteLabels.type,
    hasYOffset: true
  }
};

exports.default = function (props) {
  var index = props.index,
      cache = props.cache,
      clearCache = props.clearCache,
      rowCount = props.rowCount,
      row = props.row,
      showJumpButtons = props.showJumpButtons,
      annotationVisibility = props.annotationVisibility;

  if (clearCache) {
    cache = {};
  }

  if (cache[index]) {
    return cache[index];
  }
  if (!row) return 0;
  var totalHeight = 0; //account for spacer
  if (showJumpButtons && (index === 0 || index === rowCount - 1)) {
    totalHeight += rowHeights.rowJumpButtons.height;
  }
  (0, _lodash.forEach)(annotationsToCompute, function (_ref, key
  // i
  ) {
    var _height = _ref.height,
        alwaysVisible = _ref.alwaysVisible,
        getHeight = _ref.getHeight,
        hasYOffset = _ref.hasYOffset,
        typeOverride = _ref.typeOverride;

    var heightKeys = getHeight ? getHeight(props) : _height;

    var _getSummedHeights = getSummedHeights(heightKeys, props),
        _getSummedHeights2 = _slicedToArray(_getSummedHeights, 2),
        annotationHeight = _getSummedHeights2[0],
        marginHeight = _getSummedHeights2[1];

    var shouldShow = alwaysVisible || annotationVisibility[typeOverride || key];

    if (!shouldShow) return;
    var heightToAdd = annotationHeight;
    if (hasYOffset) {
      var annotations = row[typeOverride || key];
      if (hasYOffset) {
        var maxYOffset = 0;
        annotations && annotations.forEach(function (a) {
          if (a.yOffset + 1 > maxYOffset) maxYOffset = a.yOffset + 1;
        });
        heightToAdd = maxYOffset * annotationHeight;
      }
    }
    if (heightToAdd > 0) heightToAdd += marginHeight;

    if (debug) {
      heightToAdd !== 0 && console.info("heightToAdd, key:", heightToAdd, key);
    }
    totalHeight += heightToAdd;
  });
  if (debug) {
    console.info("totalHeight:", totalHeight);
  }
  cache[index] = totalHeight;
  return totalHeight;
};

function getHeights(heightKey, props) {
  var annotationHeight = !heightKey ? 0 : props[heightKey + "Height"] || (rowHeights[heightKey] || {}).height || 0;

  var marginHeight = (props[heightKey + "MarginTop"] || (rowHeights[heightKey] || {}).marginTop || 0) + (props[heightKey + "MarginBottom"] || (rowHeights[heightKey] || {}).marginBottom || 0);
  return [annotationHeight, marginHeight];
}
function getSummedHeights(heightKeys, props) {
  var height = 0;
  var marginHeight = 0;
  (Array.isArray(heightKeys) ? heightKeys : [heightKeys]).forEach(function (k) {
    var _getHeights = getHeights(k, props),
        _getHeights2 = _slicedToArray(_getHeights, 2),
        h = _getHeights2[0],
        m = _getHeights2[1];

    height += h;
    marginHeight += m;
  });
  return [height, marginHeight];
}