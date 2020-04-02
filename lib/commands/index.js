"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require("@blueprintjs/core");

var _veRangeUtils = require("ve-range-utils");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _pluralize = require("pluralize");

var _pluralize2 = _interopRequireDefault(_pluralize);

var _teselagenReactComponents = require("teselagen-react-components");

var _veSequenceUtils = require("ve-sequence-utils");

var _commandUtils = require("../utils/commandUtils");

var _lodash = require("lodash");

var _showFileDialog = require("../utils/showFileDialog");

var _showFileDialog2 = _interopRequireDefault(_showFileDialog);

var _copyOptions = require("../redux/copyOptions");

var _proteinUtils = require("../utils/proteinUtils");

var _package = require("../../package.json");

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isProtein = function isProtein(props) {
  return props.sequenceData && props.sequenceData.isProtein;
};

var getNewTranslationHandler = function getNewTranslationHandler(isReverse) {
  return {
    handler: function handler(props, state, ctxInfo) {
      var annotation = (0, _lodash.get)(ctxInfo, "context.annotation") || props.selectionLayer;
      if (!(annotation.start > -1)) {
        return window.toastr.warning("No region found to translate");
      }
      props.upsertTranslation({
        start: annotation.start,
        end: annotation.end,
        forward: !isReverse
      });
      props.annotationVisibilityShow("translations");
    },
    isHidden: function isHidden(props) {
      return isProtein(props) || !props.annotationsToSupport ||
      // props.readOnly ||
      !props.annotationsToSupport.translations;
    },
    isDisabled: function isDisabled(props) {
      return (
        /* (props.readOnly && readOnlyDisabledTooltip) ||  */props.sequenceLength === 0 || noSelection(props)
      );
    }
  };
};

var fileCommandDefs = _extends({
  newSequence: {
    isHidden: function isHidden(props) {
      return !props.onNew;
    },
    handler: function handler(props) {
      return props.onNew();
    }
  },

  renameSequence: {
    isHidden: function isHidden(props) {
      return props.readOnly;
    },
    isDisabled: function isDisabled(props) {
      return props.readOnly && readOnlyDisabledTooltip;
    },
    handler: function handler(props) {
      props.showRenameSequenceDialog({
        initialValues: { newName: props.sequenceData.name },
        onSubmit: function onSubmit(values) {
          props.sequenceNameUpdate(values.newName);
          props.onRename && props.onRename(values.newName, props);
        }
      });
    }
  },

  saveSequence: {
    name: "Save",
    isDisabled: function isDisabled(props) {
      return props.alwaysAllowSave ? false : props.readOnly && readOnlyDisabledTooltip || !props.sequenceData || props.sequenceData.stateTrackingId === "initialLoadId" || props.sequenceData.stateTrackingId === props.lastSavedId;
    },
    isHidden: function isHidden(props) {
      return props.readOnly || !props.handleSave;
    },
    handler: function handler(props) {
      return props.handleSave();
    },
    hotkey: "mod+s"
  },
  saveSequenceAs: {
    name: "Save As",
    // isDisabled: props =>
    //   (props.readOnly && readOnlyDisabledTooltip) ||
    //   !props.sequenceData ||
    //   (props.sequenceData.stateTrackingId === "initialLoadId" ||
    //     props.sequenceData.stateTrackingId === props.lastSavedId),
    isHidden: function isHidden(props) {
      return !props.onSaveAs;
    },
    handler: function handler(props) {
      return props.handleSave({ isSaveAs: true });
    },
    hotkey: "mod+shift+s"
  },
  toolsCmd: {
    handler: function handler() {},
    isHidden: isProtein
  },

  deleteSequence: {
    isDisabled: function isDisabled(props) {
      return props.readOnly && readOnlyDisabledTooltip || noSelection(props) || !props.onDelete;
    },
    isHidden: function isHidden(props) {
      return !props.onDelete;
    },
    handler: function handler(props) {
      return props.onDelete(props.sequenceData);
    }
  },

  duplicateSequence: {
    isDisabled: function isDisabled(props) {
      return !props.onDuplicate;
    },
    isHidden: function isHidden(props) {
      return !props.onDuplicate;
    },
    handler: function handler(props) {
      return props.onDuplicate(props.sequenceData);
    },
    hotkey: "alt+shift+d"
  },

  toggleReadOnlyMode: {
    toggle: [],
    isDisabled: function isDisabled(props) {
      return props.disableSetReadOnly || !props.onSave;
    },
    isHidden: function isHidden(props) {
      return !props.toggleReadOnlyMode;
    },
    isActive: function isActive(props) {
      return props.readOnly;
    },
    handler: function handler(props) {
      return props.toggleReadOnlyMode();
    }
  },

  importSequence: {
    isHidden: function isHidden(props) {
      return props.hideSingleImport;
    },
    isDisabled: function isDisabled(props) {
      return props.readOnly;
    },
    handler: function handler(props) {
      (0, _showFileDialog2.default)({
        multiple: false,
        onSelect: function onSelect(files) {
          props.importSequenceFromFile(files[0]);
        }
      });
    }
  },
  featureTypesCmd: {
    name: function name(props) {
      var total = Object.keys((0, _lodash.reduce)(props.sequenceData.features, function (acc, feat) {
        acc[feat.type] = true;
        return acc;
      }, {})).length;
      var toHideCount = Object.keys(props.annotationVisibility.featureTypesToHide).length;
      return _react2.default.createElement(
        "span",
        null,
        "Feature Types \xA0",
        _react2.default.createElement(
          _core.Tag,
          { round: true, style: { marginLeft: 4 } },
          total - toHideCount,
          "/",
          total
        )
      );
    },
    submenu: function submenu(props) {
      var types = {};
      (0, _lodash.forEach)(props.sequenceData.features, function (feat) {
        if (!feat.type) return;
        var checked = !props.annotationVisibility.featureTypesToHide[feat.type];
        if (types[feat.type]) {
          types[feat.type].count++;
        } else {
          types[feat.type] = {
            count: 1,
            shouldDismissPopover: false,
            onClick: function onClick() {
              return checked ? props.hideFeatureTypes([feat.type]) : props.showFeatureTypes([feat.type]);
            },
            checked: checked
          };
        }
        types[feat.type].text = _react2.default.createElement(
          "span",
          null,
          feat.type,
          " \xA0",
          _react2.default.createElement(
            _core.Tag,
            { round: true, style: { marginLeft: 4 } },
            types[feat.type].count
          )
        );
      });
      var typeMenu = (0, _lodash.map)(types);
      return [{
        text: "Uncheck All",
        onClick: function onClick() {
          return props.hideFeatureTypes(Object.keys(types));
        },
        shouldDismissPopover: false
      }, {
        text: "Check All",
        onClick: function onClick() {
          return props.resetFeatureTypesToHide();
        },
        shouldDismissPopover: false
      }, "--"].concat(_toConsumableArray(typeMenu.length ? typeMenu : [{
        text: "No Features To Filter",
        disabled: true
      }]));
    }
    // isDisabled:
  },

  exportSequenceAsGenbank: {
    name: function name(props) {
      return isProtein(props) ? "Download GenPept File" : "Download Genbank File";
    },
    handler: function handler(props) {
      return props.exportSequenceToFile(isProtein(props) ? "genpept" : "genbank");
    }
  },
  exportSequenceAsFasta: {
    name: "Download FASTA File",
    handler: function handler(props) {
      return props.exportSequenceToFile("fasta");
    }
  },
  exportSequenceAsTeselagenJson: {
    name: "Download Teselagen JSON File",
    handler: function handler(props) {
      return props.exportSequenceToFile("teselagenJson");
    }
  },

  viewProperties: {
    handler: function handler(props) {
      return props.propertiesViewOpen();
    }
  },
  viewRevisionHistory: {
    handler: function handler(props) {
      return props.toggleViewVersionHistory();
    },
    isHidden: function isHidden(props) {
      return !props.getVersionList || !props.getSequenceAtVersion;
    }
  },

  print: {
    hotkeyProps: { preventDefault: true },
    handler: function handler(props) {
      return props.showPrintDialog();
    },
    hotkey: "mod+p"
  }
}, ["Parts", "Features", "Primers"].reduce(function (acc, type) {
  //showRemoveDuplicatesDialogFeatures showRemoveDuplicatesDialogParts showRemoveDuplicatesDialogPrimers
  acc["showRemoveDuplicatesDialog" + type] = {
    name: "Remove Duplicate " + (0, _lodash.startCase)(type),
    isDisabled: function isDisabled(props) {
      return props.readOnly;
    },
    handler: function handler(props) {
      return props.showRemoveDuplicatesDialog({
        type: (0, _lodash.camelCase)(type),
        editorName: props.editorName,
        dialogProps: {
          title: "Remove Duplicate " + type
        }
      });
    }
  };
  return acc;
}, {}));
//copy options
var toggleCopyOptionCommandDefs = {};
Object.keys(_copyOptions.defaultCopyOptions).forEach(function (type) {
  var cmdId = "toggleCopy" + (0, _lodash.upperFirst)(type);
  toggleCopyOptionCommandDefs[cmdId] = {
    name: "Include " + (0, _lodash.startCase)(type),
    handler: function handler(props) {
      return props.toggleCopyOption(type);
    },
    isActive: function isActive(props) {
      return props.copyOptions && props.copyOptions[type];
    }
  };
});

var readOnlyDisabledTooltip = "Sorry this function is not allowed in Read-Only Mode";
var noSelection = function noSelection(_ref) {
  var _ref$selectionLayer = _ref.selectionLayer,
      selectionLayer = _ref$selectionLayer === undefined ? {} : _ref$selectionLayer;
  return !(selectionLayer.start > -1 && selectionLayer.end > -1) && "Selection Required";
};

var triggerClipboardCommand = function triggerClipboardCommand(type) {
  var wrapper = document.querySelector(".veVectorInteractionWrapper");
  if (!wrapper) {
    return window.toastr.info("Cannot trigger a " + type + " in the current view");
  }
  var hiddenInput = wrapper.querySelector("input.clipboard");
  hiddenInput.focus();
  var worked = document.execCommand(type);
  wrapper.focus();
  if (!worked) {
    var keys = { paste: "Cmd/Ctrl+V", cut: "Cmd/Ctrl+X", copy: "Cmd/Ctrl+C" };
    if (keys[type]) {
      // TODO maybe improve msg with HTML
      window.toastr.info("Press " + keys[type] + " to " + type);
    } else {
      console.warn("The " + type + " command did not work. document.execCommand(" + type + ") didn't work");
    }
  }
};

var editCommandDefs = _extends({
  changeCaseCmd: {
    isHidden: isProtein,
    handler: function handler() {}
  },
  cut: {
    isDisabled: function isDisabled(props) {
      return props.readOnly && readOnlyDisabledTooltip || props.sequenceLength === 0;
    },
    isHidden: function isHidden(props) {
      return props.readOnly;
    },
    handler: function handler() {
      triggerClipboardCommand("cut");
    },
    hotkey: "mod+x"
  },
  createNewFromSubsequence: {
    name: "New Sequence From Selected Range",
    isDisabled: function isDisabled(props) {
      return props.sequenceLength === 0 || props.selectionLayer.start === -1;
    },
    isHidden: function isHidden(props) {
      return !props.onCreateNewFromSubsequence;
    },
    handler: function handler(props) {
      props.onCreateNewFromSubsequence((0, _veSequenceUtils.getSequenceDataBetweenRange)(props.sequenceData, props.selectionLayer), props);
    }
    // hotkey: "mod+x"
  },

  copy: {
    isDisabled: function isDisabled(props) {
      return props.sequenceLength === 0;
    },

    handler: function handler() {
      return triggerClipboardCommand("copy");
    },
    hotkey: "mod+c"
  },

  paste: {
    isDisabled: function isDisabled(props) {
      return props.readOnly && readOnlyDisabledTooltip;
    },
    isHidden: function isHidden(props) {
      return props.readOnly;
    },

    handler: function handler() {
      return triggerClipboardCommand("paste");
    },
    hotkey: "mod+v"
  },

  undo: {
    isHidden: function isHidden(props) {
      return props.readOnly;
    },

    isDisabled: function isDisabled(props) {
      return props.readOnly || !(props.sequenceDataHistory && props.sequenceDataHistory.past && props.sequenceDataHistory.past.length);
    },
    handler: function handler(props) {
      return props.undo();
    },
    hotkey: "mod+z"
  },

  redo: {
    isHidden: function isHidden(props) {
      return props.readOnly;
    },

    isDisabled: function isDisabled(props) {
      return props.readOnly || !(props.sequenceDataHistory && props.sequenceDataHistory.future && props.sequenceDataHistory.future.length);
    },
    handler: function handler(props) {
      return props.redo();
    },
    hotkey: "mod+shift+z"
  },
  find: {
    isDisabled: function isDisabled(props) {
      return props.sequenceLength === 0;
    },
    name: "Find...",
    handler: function handler(props) {
      return props.toggleFindTool();
    },
    hotkey: "mod+f",
    hotkeyProps: { preventDefault: true }
  },
  about: {
    isDisabled: function isDisabled(props) {
      return props.sequenceLength === 0;
    },
    name: "About",
    handler: function handler() {
      return (0, _teselagenReactComponents.showConfirmationDialog)({
        text: _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "h5",
            null,
            "Open Vector Editor Version: ",
            _package2.default.version
          ),
          "This editor is made by Teselagen.",
          _react2.default.createElement("br", null),
          _react2.default.createElement("br", null),
          "Issues can be logged here:",
          " ",
          _react2.default.createElement(
            "a",
            { href: "https://github.com/TeselaGen/openVectorEditor/issues" },
            "Open Vector Editor"
          )
        ),
        confirmButtonText: "Back",
        cancelButtonText: null,
        canEscapeKeyCancel: true //this is false by default
      });
    }
  },
  versionNumber: {
    name: "OVE Version:  " + _package2.default.version,
    handler: function handler() {
      var win = window.open("https://github.com/TeselaGen/openVectorEditor/commits/master", "_blank");
      win.focus();
    }
  },

  goTo: {
    isDisabled: function isDisabled(props) {
      return props.sequenceLength === 0;
    },
    name: "Go To...",
    handler: function handler(props) {
      props.showGoToDialog({
        extraProps: {
          sequencePosition: {
            min: 0,
            max: (0, _proteinUtils.divideBy3)(props.sequenceLength, isProtein(props))
          }
        },
        initialValues: {
          sequencePosition: (0, _proteinUtils.divideBy3)(props.caretPosition >= 0 ? props.caretPosition : 0, isProtein(props))
        },
        onSubmit: function onSubmit(values) {
          return props.caretPositionUpdate(values.sequencePosition * (isProtein(props) ? 3 : 1));
        }
      });
    },
    hotkey: "mod+g",
    hotkeyProps: { preventDefault: true }
  },

  select: {
    isDisabled: function isDisabled(props) {
      return props.sequenceLength === 0;
    },
    name: "Select...",
    handler: function handler(props) {
      var _props$selectionLayer = props.selectionLayer,
          start = _props$selectionLayer.start,
          end = _props$selectionLayer.end;

      if (!(start > -1)) {
        start = props.caretPosition;
        end = props.caretPosition;
      }
      props.showSelectDialog({
        extraProps: {
          circular: props.sequenceData && props.sequenceData.circular,
          from: {
            min: 1,
            max: (0, _proteinUtils.divideBy3)(props.sequenceLength || 1, isProtein(props))
          },
          to: {
            min: 1,
            max: (0, _proteinUtils.divideBy3)(props.sequenceLength || 1, isProtein(props))
          }
        },
        selectionLayerUpdate: props.selectionLayerUpdate,
        caretPositionUpdate: props.caretPositionUpdate,
        initialCaretPosition: props.caretPosition,
        initialValues: {
          from: Math.max(1, 1 + (0, _proteinUtils.divideBy3)(start >= 0 ? start : 0, isProtein(props))),
          to: Math.max(1, 1 + (0, _proteinUtils.divideBy3)(end >= 0 ? end : 0, isProtein(props)))
        },
        isProtein: isProtein(props),
        sequenceLength: (0, _proteinUtils.divideBy3)(props.sequenceLength || 1, isProtein(props)),
        onSubmit: function onSubmit(values) {
          var newRange = (0, _veRangeUtils.convertRangeTo0Based)({
            start: isProtein(props) ? values.from * 3 : values.from,
            end: isProtein(props) ? values.to * 3 : values.to
          });

          return props.selectionLayerUpdate({
            start: isProtein(props) ? newRange.start - 2 : newRange.start,
            end: newRange.end
          });
        }
      });
    }
  },
  selectAll: {
    handler: function handler(props, obj) {
      var _ref2 = obj || {},
          event = _ref2.event,
          viaHotkey = _ref2.viaHotkey;

      if (viaHotkey) {
        event.stopPropagation();
        event.preventDefault();
      }
      props.selectAll();
    },
    isDisabled: function isDisabled(props) {
      return props.sequenceLength === 0;
    },
    hotkey: "mod+a"
    //tnr: we can't pass the following because it will block inputs
    // hotkeyProps: { preventDefault: true, stopPropagation: true }
  },

  selectInverse: {
    isDisabled: function isDisabled(props) {
      return noSelection(props);
    },
    handler: function handler(props) {
      return props.handleInverse();
    },
    hotkey: "mod+i"
  },

  complementSelection: {
    isHidden: function isHidden(props) {
      return props.readOnly || isProtein(props);
    },

    isDisabled: function isDisabled(props) {
      return props.readOnly && readOnlyDisabledTooltip || noSelection(props);
    },
    handler: function handler(props) {
      return props.handleComplementSelection();
    }
  },

  complementEntireSequence: {
    isHidden: function isHidden(props) {
      return props.readOnly || isProtein(props);
    },

    isDisabled: function isDisabled(props) {
      return props.readOnly && readOnlyDisabledTooltip || props.sequenceLength === 0;
    },

    handler: function handler(props) {
      return props.handleComplementSequence();
    }
  },
  sequenceCase: {
    isHidden: isProtein
  }
}, [{ hotkey: "option + =", type: "flipCaseSequence" }, { hotkey: "option + plus", type: "upperCaseSequence" }, { hotkey: "option + -", type: "lowerCaseSequence" }, { /* hotkey: "option+-", */type: "upperCaseSelection" }, { /* hotkey: "option+-", */type: "lowerCaseSelection" }].reduce(function (acc, _ref3) {
  var type = _ref3.type,
      hotkey = _ref3.hotkey;

  var isSelection = type.includes("Selection");

  acc[type] = {
    isHidden: isProtein,
    isDisabled: function isDisabled(props) {
      if (props.readOnly) {
        return "The sequence is read only. Try changing 'View > Sequence Case'";
      }
      if (isSelection && !(props.selectionLayer.start > -1)) {
        return "No Selection to Replace";
      }
    },
    name: (0, _lodash.startCase)(type),
    hotkey: hotkey,
    handler: function handler(props) {
      var sequence = props.sequenceData.sequence;
      var selectionLayer = props.selectionLayer;

      var toastFired = void 0;
      if (props.uppercaseSequenceMapFont !== "noPreference") {
        toastFired = true;
        props.updateSequenceCase("noPreference");
        window.toastr.success("Sequence Case Edited Successfully. To avoid confusion we set: 'View > Sequence Case' to 'No Preference'", {
          timeout: 10000
        });
      }
      var func = type.includes("lower") ? "toLowerCase" : "toUpperCase";
      var newSeq = void 0;
      var orginalSeq = isSelection ? (0, _veRangeUtils.getSequenceWithinRange)(selectionLayer, sequence) : sequence;
      if (type.includes("flip")) {
        newSeq = invertString(orginalSeq);
      } else {
        newSeq = orginalSeq[func]();
      }
      if (newSeq !== orginalSeq) {
        !toastFired && window.toastr.success("Sequence Case Edited Successfully");
        //don't trigger a mutation unless something has actually changed
        props.updateSequenceData(_extends({}, props.sequenceData, {
          sequence: isSelection ? (0, _veSequenceUtils.adjustBpsToReplaceOrInsert)(sequence, newSeq, selectionLayer, false) : newSeq
        }));
      }
    }
  };
  return acc;
}, {}), {
  toggleSequenceMapFontUpper: {
    isActive: function isActive(props) {
      return props.uppercaseSequenceMapFont === "uppercase";
    },
    handler: function handler(props) {
      props.updateSequenceCase("uppercase");
      window.toastr.success("Sequence Case View Changed");
    },
    hotkey: "ctrl+option+plus"
  },
  toggleSequenceMapFontRaw: {
    isActive: function isActive(props) {
      return props.uppercaseSequenceMapFont === "noPreference";
    },
    handler: function handler(props) {
      props.updateSequenceCase("noPreference");
      window.toastr.success("Sequence Case View Changed");
    },
    hotkey: "ctrl+option+="
  },
  toggleSequenceMapFontLower: {
    isActive: function isActive(props) {
      return props.uppercaseSequenceMapFont === "lowercase";
    },
    handler: function handler(props) {
      props.updateSequenceCase("lowercase");
      window.toastr.success("Sequence Case View Changed");
    },
    hotkey: "ctrl+option+-"
  },
  createMenuHolder: {
    isHidden: function isHidden(props) {
      return isProtein(props) && props.readOnly;
    },
    handler: function handler() {}
  },
  // toggleSequenceMapFontNoPreference: {
  //   isActive: props =>
  //     !props.uppercaseSequenceMapFont ||
  //     props.uppercaseSequenceMapFont === "noPreference",
  //   handler: props => {
  //     props.updateSequenceCase("noPreference");
  //   }
  // },
  reverseComplementSelection: {
    isDisabled: function isDisabled(props) {
      return props.readOnly && readOnlyDisabledTooltip || noSelection(props);
    },
    isHidden: function isHidden(props) {
      return props.readOnly || isProtein(props);
    },

    handler: function handler(props) {
      return props.handleReverseComplementSelection();
    },
    hotkey: "mod+e"
  },

  reverseComplementEntireSequence: {
    isHidden: function isHidden(props) {
      return props.readOnly || isProtein(props);
    },

    isDisabled: function isDisabled(props) {
      return props.readOnly && readOnlyDisabledTooltip || props.sequenceLength === 0;
    },
    handler: function handler(props) {
      return props.handleReverseComplementSequence();
    }
  },
  fullSequenceTranslations: {
    isHidden: isProtein,
    handler: function handler() {}
  },
  sequenceAA_allFrames: {
    isActive: function isActive(props) {
      return props.frameTranslations["1"] && props.frameTranslations["2"] && props.frameTranslations["3"];
    },
    handler: function handler(props) {
      if (props.frameTranslations["1"] && props.frameTranslations["2"] && props.frameTranslations["3"]) {
        props.frameTranslationToggleOff("1");
        props.frameTranslationToggleOff("2");
        props.frameTranslationToggleOff("3");
      } else {
        props.annotationVisibilityShow("translations");
        props.frameTranslationToggleOn("1");
        props.frameTranslationToggleOn("2");
        props.frameTranslationToggleOn("3");
      }
    }
  },
  sequenceAAReverse_allFrames: {
    isHidden: isProtein,

    isActive: function isActive(props) {
      return props.frameTranslations["-1"] && props.frameTranslations["-2"] && props.frameTranslations["-3"];
    },
    handler: function handler(props) {
      if (props.frameTranslations["-1"] && props.frameTranslations["-2"] && props.frameTranslations["-3"]) {
        props.frameTranslationToggleOff("-1");
        props.frameTranslationToggleOff("-2");
        props.frameTranslationToggleOff("-3");
      } else {
        props.annotationVisibilityShow("translations");
        props.frameTranslationToggleOn("-1");
        props.frameTranslationToggleOn("-2");
        props.frameTranslationToggleOn("-3");
      }
    }
  },
  sequenceAA_frame1: {
    isActive: function isActive(props) {
      return props.frameTranslations["1"];
    },
    handler: function handler(props) {
      if (!props.frameTranslations["1"]) {
        props.annotationVisibilityShow("translations");
      }
      props.frameTranslationToggle("1");
    }
  },
  sequenceAA_frame2: {
    isActive: function isActive(props) {
      return props.frameTranslations["2"];
    },
    handler: function handler(props) {
      if (!props.frameTranslations["2"]) {
        props.annotationVisibilityShow("translations");
      }
      props.frameTranslationToggle("2");
    }
  },
  sequenceAA_frame3: {
    isActive: function isActive(props) {
      return props.frameTranslations["3"];
    },
    handler: function handler(props) {
      if (!props.frameTranslations["3"]) {
        props.annotationVisibilityShow("translations");
      }
      props.frameTranslationToggle("3");
    }
  },
  sequenceAAReverse_frame1: {
    isActive: function isActive(props) {
      return props.frameTranslations["-1"];
    },
    handler: function handler(props) {
      if (!props.frameTranslations["-1"]) {
        props.annotationVisibilityShow("translations");
      }
      props.frameTranslationToggle("-1");
    }
  },
  sequenceAAReverse_frame2: {
    isActive: function isActive(props) {
      return props.frameTranslations["-2"];
    },
    handler: function handler(props) {
      if (!props.frameTranslations["-2"]) {
        props.annotationVisibilityShow("translations");
      }
      props.frameTranslationToggle("-2");
    }
  },

  sequenceAAReverse_frame3: {
    isActive: function isActive(props) {
      return props.frameTranslations["-3"];
    },
    handler: function handler(props) {
      if (!props.frameTranslations["-3"]) {
        props.annotationVisibilityShow("translations");
      }
      props.frameTranslationToggle("-3");
    }
  },
  newTranslation: getNewTranslationHandler(),
  newReverseTranslation: getNewTranslationHandler(true),

  newFeature: {
    handler: function handler(props /* state, ctxInfo */) {
      props.handleNewFeature();
    },
    isHidden: function isHidden(props) {
      return props.readOnly || !props.annotationsToSupport || !props.annotationsToSupport.features;
    },
    isDisabled: function isDisabled(props) {
      return props.readOnly && readOnlyDisabledTooltip || props.sequenceLength === 0;
    },
    hotkey: "mod+k",
    hotkeyProps: { preventDefault: true }
  },
  useGtgAndCtgAsStartCodons: {
    isHidden: isProtein,

    name: "Use GTG And CTG As Start Codons",
    isActive: function isActive(props) {
      return props.useAdditionalOrfStartCodons;
    },
    handler: function handler(props) {
      return props.useAdditionalOrfStartCodonsToggle();
    }
  },
  minOrfSizeCmd: {
    name: function name(props) {
      return _react2.default.createElement(
        "div",
        { "data-test": "min-orf-size", style: { display: "flex" } },
        "Minimum ORF Size:",
        _react2.default.createElement("input", {
          type: "number",
          className: (0, _classnames2.default)(_core.Classes.INPUT, "minOrfSizeInput"),
          onChange: function onChange(event) {
            var minimumOrfSize = parseInt(event.target.value, 10);
            if (!(minimumOrfSize > -1)) return;
            if (minimumOrfSize > props.sequenceLength) return;
            props.annotationVisibilityShow("orfs");
            props.minimumOrfSizeUpdate(minimumOrfSize);
          },
          value: props.minimumOrfSize
        })
      );
    },
    // isActive: (props) => props.useAdditionalOrfStartCodons,
    handler: function handler() {}
  },
  hotkeyDialog: {
    name: "View Editor Hotkeys",
    handler: function handler(props) {
      return props.openHotkeyDialog();
    }
  },

  newPart: {
    handler: function handler(props) {
      return props.handleNewPart();
    },
    isHidden: function isHidden(props) {
      return props.readOnly || !props.annotationsToSupport || !props.annotationsToSupport.parts;
    },

    isDisabled: function isDisabled(props) {
      return props.readOnly && readOnlyDisabledTooltip || props.sequenceLength === 0;
    },
    hotkey: "mod+l",
    hotkeyProps: { preventDefault: true }
  },
  newPrimer: {
    handler: function handler(props) {
      return props.handleNewPrimer();
    },
    isHidden: function isHidden(props) {
      return props.readOnly || !props.annotationsToSupport || !props.annotationsToSupport.primers;
    },
    isDisabled: function isDisabled(props) {
      return props.readOnly && readOnlyDisabledTooltip || props.sequenceLength === 0;
    }
  },

  rotateToCaretPosition: {
    isHidden: function isHidden(props) {
      return props.readOnly || isProtein(props);
    },

    isDisabled: function isDisabled(props) {
      return props.caretPosition === -1 && "You must first place cursor" || !props.sequenceData.circular && "Disabled for Linear Sequences";
    },
    handler: function handler(props) {
      return props.handleRotateToCaretPosition();
    },
    hotkey: "mod+b"
  }
}, toggleCopyOptionCommandDefs);

var cirularityCommandDefs = {
  circular: {
    isHidden: function isHidden(props) {
      return props.readOnly || isProtein(props);
    },

    isDisabled: function isDisabled(props) {
      return props.readOnly && readOnlyDisabledTooltip;
    },
    handler: function handler(props) {
      return props.updateCircular(true);
    },
    isActive: function isActive(props) {
      return props && props.sequenceData.circular;
    }
  },
  linear: {
    isHidden: function isHidden(props) {
      return props.readOnly;
    },

    isDisabled: function isDisabled(props) {
      return props.readOnly && readOnlyDisabledTooltip;
    },
    handler: function handler(props) {
      return props.updateCircular(false);
    },
    isActive: function isActive(props) {
      return props && !props.sequenceData.circular;
    }
  }
};

var labelToggleCommandDefs = {};
["feature", "part", "cutsite"].forEach(function (type) {
  var cmdId = "toggle" + (0, _lodash.upperFirst)(type) + "Labels";
  var plural = type + "s";
  labelToggleCommandDefs[cmdId] = {
    toggle: ["show", "hide"],
    handler: function handler(props) {
      return props.annotationLabelVisibilityToggle(plural);
    },
    isHidden: function isHidden(props) {
      return props && props.typesToOmit && props.typesToOmit[plural] === false;
    },
    isActive: function isActive(props) {
      return props && props.annotationLabelVisibility[plural];
    }
  };
});

var editAnnotationCommandDefs = ["feature", "part", "primer"].reduce(function (acc, key) {
  acc["edit" + (0, _lodash.upperFirst)(key)] = {
    name: "Edit " + (0, _lodash.upperFirst)(key),
    handler: function handler(props, state, ctxInfo) {
      var annotation = (0, _lodash.get)(ctxInfo, "context.annotation");
      props["showAddOrEdit" + (0, _lodash.upperFirst)(key) + "Dialog"](annotation);
    },
    isHidden: function isHidden(props) {
      return props.readOnly;
    }
  };
  return acc;
}, {});

var deleteAnnotationCommandDefs = ["feature", "part", "primer", "translation"].reduce(function (acc, key) {
  acc["delete" + (0, _lodash.upperFirst)(key)] = {
    name: "Delete " + (0, _lodash.upperFirst)(key),
    handler: function handler(props, state, ctxInfo) {
      var annotation = (0, _lodash.get)(ctxInfo, "context.annotation");
      props["delete" + (0, _lodash.upperFirst)(key)](annotation);
    },
    isHidden: function isHidden(props) {
      return props.readOnly;
    }
  };
  return acc;
}, {});

var viewPropertiesCommandDefs = ["general", "genbank", "features", "parts", "orfs", "cutsites", "primers", "translations"].reduce(function (acc, key) {
  var singularKey = _pluralize2.default.singular(key);
  acc["view" + (0, _lodash.upperFirst)(singularKey) + "Properties"] = {
    name: "View " + (0, _lodash.upperFirst)(singularKey) + " Properties",
    handler: function handler(props, state, ctxInfo) {
      var annotation = (0, _lodash.get)(ctxInfo, "context.annotation");
      props.propertiesViewOpen();
      //we need to clear the properties tab first in case the same item has already been selected
      props.propertiesViewTabUpdate(key, undefined);
      setTimeout(function () {
        //then shortly after we can update it with the correct annotation
        props.propertiesViewTabUpdate(key, annotation);
      }, 0);
    }
  };
  return acc;
}, {});

var annotationToggleCommandDefs = {};
["features", "parts", {
  type: "warnings",
  isHidden: function isHidden(p) {
    return !(0, _lodash.map)(p.sequenceData["warnings"]).length;
  }
}, {
  type: "assemblyPieces",
  isHidden: function isHidden(p) {
    return !(0, _lodash.map)(p.sequenceData["assemblyPieces"]).length;
  }
}, {
  type: "lineageAnnotations",
  isHidden: function isHidden(p) {
    return !(0, _lodash.map)(p.sequenceData["lineageAnnotations"]).length;
  }
}, { type: "cutsites", isHidden: isProtein }, "axis", { type: "orfs", text: "ORFs", isHidden: isProtein }, { type: "primers", isHidden: isProtein }, "translations", {
  type: "orfTranslations",
  text: "ORF Translations",
  isHidden: isProtein,
  isDisabled: function isDisabled(props) {
    return !props.annotationVisibility.orfs && "ORFs must be visible to view their translations" || !props.annotationVisibility.translations && "Translations must be visible to view ORF translations";
  }
}, {
  type: "cdsFeatureTranslations",
  text: "CDS Feature Translations",
  isHidden: isProtein,
  isDisabled: function isDisabled(props) {
    return !props.annotationVisibility.features && "Features must be visible to view their translations" || !props.annotationVisibility.translations && "Translations must be visible to view CDS feature translations";
  }
},
// {
//   type: "aminoAcidNumbers",
//   isHidden: (p, c) =>
//     (c.isDnaMenu && p.isProtein) || (!c.isDnaMenu && !p.isProtein)
// },
{ type: "aminoAcidNumbers" }, "axisNumbers", {
  type: "sequence",
  name: "DNA Sequence",
  noCount: true,
  isHidden: function isHidden(props) {
    return !isProtein(props);
  }
}, {
  type: "reverseSequence",
  name: function name(props) {
    return isProtein(props) ? "DNA Reverse Sequence" : "Reverse Sequence";
  }
}, {
  type: "dnaColors",
  isDisabled: function isDisabled(props) {
    return !props.annotationVisibility.sequence && !props.annotationVisibility.reverseSequence && "The DNA sequence must be visible in order to color it";
  }
}].forEach(function (typeOrObj) {
  var type = typeOrObj;
  var obj = {};
  if (typeOrObj.type) {
    type = typeOrObj.type;
    obj = typeOrObj;
  }
  var cmdId = "toggle" + (0, _lodash.upperFirst)(type);
  annotationToggleCommandDefs[cmdId] = _extends({
    toggle: ["show", "hide"],
    name: function name(props) {
      var sequenceData = props.sequenceData || {};
      var count = void 0;
      var hasCount = false;
      var annotations = props[type] || sequenceData[type];
      if (annotations && !obj.noCount) {
        hasCount = true;
        count = annotations.length || Object.keys(annotations).length || 0;
      }
      if (type === "cdsFeatureTranslations") {
        hasCount = true;
        count = (0, _lodash.filter)(props.features || sequenceData.features || [], function (_ref4) {
          var type = _ref4.type;
          return type === "CDS";
        }).length;
      }
      if (type === "orfTranslations") {
        hasCount = true;
        count = (0, _lodash.filter)(props.orfs || sequenceData.orfs || [], function (_ref5) {
          var isOrf = _ref5.isOrf;
          return isOrf;
        }).length;
      }
      return _react2.default.createElement(
        "span",
        null,
        obj.text || (0, _lodash.startCase)(type),
        "\xA0",
        hasCount && _react2.default.createElement(
          _core.Tag,
          { round: true, style: { marginLeft: 4 } },
          count
        )
      );
    },
    handler: function handler(props) {
      return props.annotationVisibilityToggle(type);
    },
    isActive: function isActive(props) {
      return props && props.annotationVisibility && props.annotationVisibility[type];
    }
  }, obj, { //spread this here to override the above props if necessary
    isHidden: function isHidden(props) {
      return props && props.typesToOmit && props.typesToOmit[type] === false || obj.isHidden && obj.isHidden(props);
    }
  });
});

var additionalAnnotationCommandsDefs = {
  showAll: {
    handler: function handler(props) {
      _veSequenceUtils.annotationTypes.forEach(function (type) {
        props.annotationVisibilityShow(type);
      });
    }
  },
  hideAll: {
    handler: function handler(props) {
      _veSequenceUtils.annotationTypes.forEach(function (type) {
        props.annotationVisibilityHide(type);
      });
    }
  },
  toggleAminoAcidNumbers_dna: _extends({}, annotationToggleCommandDefs.toggleAminoAcidNumbers, {
    isHidden: function isHidden(props) {
      return isProtein(props);
    }
  }),
  toggleAminoAcidNumbers_protein: _extends({}, annotationToggleCommandDefs.toggleAminoAcidNumbers, {
    isHidden: function isHidden(props) {
      return isProtein(props);
    }
  })
};

var toolCommandDefs = {
  simulateDigestion: {
    handler: function handler(props) {
      return props.createNewDigest();
    },
    hotkey: "mod+shift+d",
    hotkeyProps: { preventDefault: true },
    isHidden: function isHidden(props) {
      return isProtein(props);
    }
  },
  // TODO: enzyme manager (?)
  restrictionEnzymesManager: {
    name: "Add Additional Enzymes",
    handler: function handler(props) {
      return props.addAdditionalEnzymesReset({
        inputSequenceToTestAgainst: props.sequenceData ? props.sequenceData.sequence : "",
        isOpen: true
      });
    },
    isHidden: function isHidden(props) {
      return isProtein(props);
    }
  }
};

var labelIntensities = {
  Low: 0.1,
  Medium: 0.4,
  High: 0.9
};
var labelCommandDefs = {
  toggleExternalLabels: {
    name: "External Labels",
    isActive: function isActive(props) {
      return props.externalLabels === "true";
    },
    handler: function handler(props) {
      if (props.externalLabels === "true") {
        props.toggleExternalLabels("false");
      } else {
        props.toggleExternalLabels("true");
      }
    }
  },
  adjustLabelLineIntensity: {
    name: "Label Line Intensity",
    submenu: function submenu(props) {
      return (0, _lodash.map)(Object.keys(labelIntensities), function (key) {
        return {
          text: key,
          checked: props.labelLineIntensity === labelIntensities[key],
          onClick: function onClick() {
            return props.changeLabelLineIntensity(labelIntensities[key]);
          }
        };
      });
    }
  }
};

var commandDefs = _extends({}, additionalAnnotationCommandsDefs, fileCommandDefs, cirularityCommandDefs, annotationToggleCommandDefs, viewPropertiesCommandDefs, editAnnotationCommandDefs, deleteAnnotationCommandDefs, labelToggleCommandDefs, editCommandDefs, toolCommandDefs, labelCommandDefs);

exports.default = function (instance) {
  return (0, _commandUtils.oveCommandFactory)(instance, commandDefs);
};

var invertString = function invertString(str) {
  var s = "";
  var i = 0;
  while (i < str.length) {
    var n = str.charAt(i);
    if (n === n.toUpperCase()) {
      // *Call* toLowerCase
      n = n.toLowerCase();
    } else {
      // *Call* toUpperCase
      n = n.toUpperCase();
    }

    i += 1;
    s += n;
  }
  return s;
};
module.exports = exports["default"];