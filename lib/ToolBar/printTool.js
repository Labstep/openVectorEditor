"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _print = require("./veToolbarIcons/print.png");

var _print2 = _interopRequireDefault(_print);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//TNRTODO this needs to be fixed and implemented 
exports.default = function () {
  return {
    Icon: _react2.default.createElement("img", { src: _print2.default, alt: "Print Vector" }),
    onIconClick: function onIconClick() {
      // var myPrintContent = document.getElementById('printdiv');
      // var myPrintWindow = window.open(windowUrl, windowName, 'left=300,top=100,width=400,height=400');
      // myPrintWindow.document.write(myPrintContent.innerHTML);
      // myPrintWindow.document.getElementById('hidden_div').style.display='block'
      // myPrintWindow.document.close();
      // myPrintWindow.focus();
      // myPrintWindow.print();
      // myPrintWindow.close();
      // return false;
      // print();
      // var content = document.getElementById("divcontents");
      // document.appendChild(con)
      // var pri = document.getElementById("ifmcontentstoprint").contentWindow;
      // pri.document.open();
      // pri.document.write(content.innerHTML);
      // pri.document.close();
      // pri.focus();
      // pri.print();
      // downloadSequenceData(sequenceData || )
    },
    tooltip: "Print Vector"
  };
};

module.exports = exports["default"];