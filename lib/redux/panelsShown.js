"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collapseSplitScreen = exports.createNewMismatchesList = exports.createNewAlignment = exports.createNewDigest = exports.propertiesViewOpen = exports.expandTabToSplitScreen = exports.setPanelAsActive = exports._collapseSplitScreen = exports.closePanel = exports.collapsePanel = exports.togglePanelFullScreen = exports.addPanelIfItDoesntAlreadyExist = exports.panelsShownUpdate = undefined;

var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require("lodash");

var _reduxAct = require("redux-act");

var _createMetaAction = require("./utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

var _arrayUtils = require("../utils/arrayUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//manages which tab panels are shown in the editor

// ------------------------------------
// Actions
// ------------------------------------
var panelsShownUpdate = exports.panelsShownUpdate = (0, _createMetaAction2.default)("PANELS_SHOWN_UPDATE");
var addPanelIfItDoesntAlreadyExist = exports.addPanelIfItDoesntAlreadyExist = (0, _createMetaAction2.default)("addPanelIfItDoesntAlreadyExist");
var togglePanelFullScreen = exports.togglePanelFullScreen = (0, _createMetaAction2.default)("togglePanelFullScreen");
var collapsePanel = exports.collapsePanel = (0, _createMetaAction2.default)("collapsePanel");
var closePanel = exports.closePanel = (0, _createMetaAction2.default)("closePanel");
var _collapseSplitScreen = exports._collapseSplitScreen = (0, _createMetaAction2.default)("_collapseSplitScreen");
var setPanelAsActive = exports.setPanelAsActive = (0, _createMetaAction2.default)("setPanelAsActive");
var expandTabToSplitScreen = exports.expandTabToSplitScreen = (0, _createMetaAction2.default)("expandTabToSplitScreen");
var propertiesViewOpen = exports.propertiesViewOpen = function propertiesViewOpen(unused, meta) {
  return setPanelAsActive("properties", meta);
};
var createNewDigest = exports.createNewDigest = function createNewDigest(unused, meta) {
  return function (dispatch) {
    dispatch(addPanelIfItDoesntAlreadyExist({
      id: "digestTool",
      name: "New Digest",
      active: true,
      canClose: true
    }, meta));
    dispatch(setPanelAsActive("digestTool", meta));
  };
};

var createNewAlignment = exports.createNewAlignment = function createNewAlignment(payload, meta) {
  return function (dispatch) {
    dispatch(addPanelIfItDoesntAlreadyExist(_extends({
      type: "alignment",
      name: "New Alignment",
      active: true,
      canClose: true
    }, payload), meta));
    dispatch(setPanelAsActive(payload.id, meta));
  };
};

var createNewMismatchesList = exports.createNewMismatchesList = function createNewMismatchesList(payload, meta) {
  return function (dispatch) {
    dispatch(addPanelIfItDoesntAlreadyExist(_extends({
      type: "mismatches",
      name: "Mismatches",
      active: true,
      canClose: true
    }, payload), meta));
    dispatch(setPanelAsActive(payload.id, meta));
  };
};

var collapseSplitScreen = exports.collapseSplitScreen = function collapseSplitScreen(activePanelId, meta) {
  return function (dispatch) {
    dispatch(_collapseSplitScreen(activePanelId, meta));
    dispatch(setPanelAsActive(activePanelId, meta));
  };
};

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)((_createReducer = {}, _defineProperty(_createReducer, addPanelIfItDoesntAlreadyExist, function (state, panelToAdd) {
  if (!state.some(function (panelGroup) {
    return panelGroup.some(function (_ref) {
      var id = _ref.id;

      return id === panelToAdd.id;
    });
  })) {
    return state.map(function (panelGroup, index) {
      if (index === 0) return [panelToAdd].concat(_toConsumableArray(panelGroup));
      return panelGroup;
    });
  }
  return state;
}), _defineProperty(_createReducer, panelsShownUpdate, function (state, payload) {
  return payload.filter(function (group) {
    return group.length;
  }); //filter out any empty groups
}), _defineProperty(_createReducer, closePanel, function (state, idToClose) {
  var newState = state.map(function (group) {
    var indexToClose = void 0;
    group.forEach(function (_ref2, i) {
      var id = _ref2.id;

      if (id === idToClose) indexToClose = i;
    });
    if (indexToClose > -1) {
      return (0, _arrayUtils.removeItem)(group, indexToClose).map(function (tab, i) {
        if (i === 0) return _extends({}, tab, { active: true });else {
          return tab;
        }
      });
    }
    return group;
  });
  return newState.filter(function (group) {
    return group.length;
  }); //filter out any empty groups
}), _defineProperty(_createReducer, _collapseSplitScreen, function (state) {
  return [(0, _lodash.flatMap)(state, function (panelGroup) {
    return panelGroup;
  })];
}), _defineProperty(_createReducer, expandTabToSplitScreen, function (state, activePanelId) {
  var panelToMove = void 0;
  return [state[0].filter(function (panel) {
    if (panel.id === activePanelId) {
      panelToMove = panel;
      return false;
    }
    return true;
  }).map(function (panel, i) {
    return i === 0 ? _extends({}, panel, { active: true }) : panel;
  }), [_extends({}, panelToMove, { active: true })]];
}), _defineProperty(_createReducer, setPanelAsActive, function (state, panelId) {
  return (0, _lodash.map)(state, function (panelGroup) {
    var isPanelInGroup = panelGroup.some(function (_ref3) {
      var id = _ref3.id;

      return panelId === id;
    });
    return panelGroup.map(function (panel) {
      return _extends({}, panel, {
        active: panelId === panel.id ? true : isPanelInGroup ? false : panel.active
      });
    });
  });
}), _defineProperty(_createReducer, togglePanelFullScreen, function (state, panelId) {
  return (0, _lodash.map)(state, function (panelGroup) {
    var isPanelInGroup = panelGroup.some(function (_ref4) {
      var id = _ref4.id;

      return panelId === id;
    });
    return panelGroup.map(function (panel) {
      return _extends({}, panel, {
        active: panelId === panel.id ? true : isPanelInGroup ? false : panel.active,
        fullScreen: panelId === panel.id ? !panel.fullScreen : isPanelInGroup ? false : panel.fullScreen
      });
    });
  });
}), _defineProperty(_createReducer, collapsePanel, function (state, panelToCloseId) {
  return [(0, _lodash.flatMap)(state, function (panelGroup) {
    return panelGroup;
  }).map(function (panel) {
    if (panel.id === panelToCloseId) {
      return _extends({}, panel, {
        active: false
      });
    }
    return panel;
  })];
}), _createReducer), [[{
  id: "circular",
  name: "Circular Map",
  active: true
  //   canClose: true
}, {
  id: "rail",
  name: "Linear Map",
  active: false
}], [{
  id: "sequence",
  name: "Sequence Map",
  active: true
}, {
  id: "properties",
  name: "Properties",
  active: false
}]]);