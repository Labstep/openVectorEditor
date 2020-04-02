'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = showFileDialog;
// TODO maybe move to TRC or elsewhere
var hiddenInput = void 0;
var callback = void 0;

function getInput(multiple) {
  if (!hiddenInput) {
    hiddenInput = document.createElement('input');
    hiddenInput.type = 'file';
    hiddenInput.style.position = 'absolute';
    hiddenInput.style.visibility = 'hidden';
    hiddenInput.addEventListener('change', function (event) {
      callback(event.target.files);
    });

    document.body.appendChild(hiddenInput);
  }
  hiddenInput.multiple = multiple ? 'multiple' : undefined;
  return hiddenInput;
}

function showFileDialog(_ref) {
  var _ref$multiple = _ref.multiple,
      multiple = _ref$multiple === undefined ? false : _ref$multiple,
      onSelect = _ref.onSelect;

  var input = getInput(multiple);
  callback = onSelect;
  input.click();
}
module.exports = exports['default'];