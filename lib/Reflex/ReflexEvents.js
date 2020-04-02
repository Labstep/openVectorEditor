"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

///////////////////////////////////////////////////////////
// ReflexEvents
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
var ReflexEvents = function () {
  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function ReflexEvents() {
    _classCallCheck(this, ReflexEvents);

    this._events = {};
  }

  /////////////////////////////////////////////////////////
  // Supports multiple events space-separated
  //
  /////////////////////////////////////////////////////////


  _createClass(ReflexEvents, [{
    key: "on",
    value: function on(events, fct) {
      var _this = this;

      events.split(" ").forEach(function (event) {
        _this._events[event] = _this._events[event] || [];
        _this._events[event].push(fct);
      });

      return this;
    }

    /////////////////////////////////////////////////////////
    // Supports multiple events space-separated
    //
    /////////////////////////////////////////////////////////

  }, {
    key: "off",
    value: function off(events, fct) {
      var _this2 = this;

      if (events == undefined) {
        this._events = {};
        return;
      }

      events.split(" ").forEach(function (event) {
        if (event in _this2._events === false) return;

        if (fct) {
          _this2._events[event].splice(_this2._events[event].indexOf(fct), 1);
        } else {
          _this2._events[event] = [];
        }
      });

      return this;
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: "emit",
    value: function emit(event /* , args... */) {
      if (this._events[event] === undefined) return;

      var tmpArray = this._events[event].slice();

      for (var i = 0; i < tmpArray.length; ++i) {
        var result = tmpArray[i].apply(this, Array.prototype.slice.call(arguments, 1));

        if (result !== undefined) {
          return result;
        }
      }

      return undefined;
    }
  }]);

  return ReflexEvents;
}();

exports.default = ReflexEvents;
module.exports = exports["default"];