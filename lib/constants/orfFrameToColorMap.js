"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var orfFrameToColorMap = {
  0: "#FF4040",
  1: "#5E8804",
  2: "#17569B"
};
exports.default = orfFrameToColorMap;
var getOrfColor = exports.getOrfColor = function getOrfColor(orf) {
  return orfFrameToColorMap[orf.frame];
};