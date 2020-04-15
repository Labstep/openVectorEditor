"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNewAnnotationMenu = exports.copyOptionsMenu = undefined;

var _viewSubmenu = require("./viewSubmenu");

var _viewSubmenu2 = _interopRequireDefault(_viewSubmenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var copyOptionsMenu = exports.copyOptionsMenu = {
  text: "Copy Options",
  showInSearchMenu: true,
  submenu: [{ cmd: "toggleCopyFeatures", shouldDismissPopover: false }, { cmd: "toggleCopyPartialFeatures", shouldDismissPopover: false }, { cmd: "toggleCopyParts", shouldDismissPopover: false }, { cmd: "toggleCopyPartialParts", shouldDismissPopover: false }]
}; //only things specific to this menu should be included here
//things that are shared between multiple menus, or that are command specific should be
//defined in the commands/index.js file

var createNewAnnotationMenu = exports.createNewAnnotationMenu = {
  text: "Create",
  cmd: "createMenuHolder",
  showInSearchMenu: true,
  submenu: ["newFeature", "newPart", "newTranslation", "newReverseTranslation", "newPrimer", "createNewFromSubsequence"]
};
exports.default = [{
  text: "File",
  "data-test": "file",
  submenu: [{
    cmd: "newSequence",
    "data-test": "newSequence"
  }, "renameSequence", "saveSequence", "saveSequenceAs", "deleteSequence", "duplicateSequence", "--", { cmd: "toggleReadOnlyMode", shouldDismissPopover: false }, "--", "importSequence", {
    text: "Export Sequence",
    showInSearchMenu: true,
    submenu: [{ cmd: "exportSequenceAsGenbank" }, { cmd: "exportSequenceAsFasta" }, { cmd: "exportSequenceAsTeselagenJson" }]
  }, "--", {
    text: "Print",
    cmd: "print"
    // submenu: [{ cmd: "printCircularView" }, { cmd: "printLinearView" }]
  }, { cmd: "viewRevisionHistory", text: "Revision History" }, { cmd: "viewProperties", text: "Properties", icon: "properties" }]
}, {
  text: "Edit",
  submenu: [createNewAnnotationMenu, "--", "cut", "copy", copyOptionsMenu, "paste", "--", "undo", "redo", "--", "find", "goTo", "--", "select", "selectAll", "selectInverse", {
    text: "Change Case",
    cmd: "changeCaseCmd",
    submenu: ["flipCaseSequence", "upperCaseSequence", "lowerCaseSequence", "upperCaseSelection", "lowerCaseSelection"]
  },
  // {
  //   text: "Change Sequence Case For Selection",
  //   submenu: [
  //   ]
  // },
  "--", "complementSelection", "complementEntireSequence", "reverseComplementSelection", "reverseComplementEntireSequence", "rotateToCaretPosition"]
}, {
  text: "View",
  submenu: _viewSubmenu2.default
}, {
  text: "Tools",
  cmd: "toolsCmd",
  submenu: ["restrictionEnzymesManager", "simulateDigestion", {
    text: "Remove Duplicates",
    submenu: ["showRemoveDuplicatesDialogFeatures", "showRemoveDuplicatesDialogParts", "showRemoveDuplicatesDialogPrimers"]
  }]
},
// { isMenuSearch: true }
{
  text: "Help",
  submenu: [{ isMenuSearch: true }, "--", "about", { cmd: "versionNumber", shouldDismissPopover: false }, "hotkeyDialog"]
}];