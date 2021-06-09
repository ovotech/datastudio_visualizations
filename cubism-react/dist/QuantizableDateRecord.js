"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _immutable = _interopRequireDefault(require("immutable"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var QuantizableDateRecordFactory = _immutable["default"].Record({
  year: 0,
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0
});

var QuantizableDateRecord = /*#__PURE__*/function (_QuantizableDateRecor) {
  (0, _inherits2["default"])(QuantizableDateRecord, _QuantizableDateRecor);

  var _super = _createSuper(QuantizableDateRecord);

  function QuantizableDateRecord(date) {
    var _this;

    (0, _classCallCheck2["default"])(this, QuantizableDateRecord);

    if ("string" === typeof date) {
      var parts = date.match(QuantizableDateRecord.DateRegex);

      if (parts == null) {
        throw new Error("Invalid date string");
      }

      var obj = {};
      obj.year = parseInt(parts[1], 10);
      obj.month = parseInt(parts[2], 10);
      obj.day = parseInt(parts[3], 10);

      if (parts[4]) {
        obj.hour = parseInt(parts[5], 10);
        obj.minute = parseInt(parts[6], 10);
        obj.second = parseInt(parts[7], 10);
      } else {
        obj.hour = obj.minute = obj.second = 0;
      }

      _this = _super.call(this, obj);
    } else if (date instanceof QuantizableDateRecord) {
      _this = _super.call(this, date);
    } else if ("number" === typeof date) {
      var dt = new Date(date);
      var _obj = {};
      _obj.year = dt.getUTCFullYear();
      _obj.month = dt.getUTCMonth() + 1;
      _obj.day = dt.getUTCDate();
      _obj.hour = dt.getUTCHours();
      _obj.minute = dt.getUTCMinutes();
      _obj.second = dt.getUTCSeconds();
      _this = _super.call(this, _obj);
    } else if (date instanceof Date) {
      var _obj2 = {};
      _obj2.year = date.getUTCFullYear();
      _obj2.month = date.getUTCMonth() + 1;
      _obj2.day = date.getUTCDate();
      _obj2.hour = date.getUTCHours();
      _obj2.minute = date.getUTCMinutes();
      _obj2.second = date.getUTCSeconds();
      _this = _super.call(this, _obj2);
    } else {
      _this = _super.call(this);
    }

    return (0, _possibleConstructorReturn2["default"])(_this);
  }

  (0, _createClass2["default"])(QuantizableDateRecord, [{
    key: "equals",
    value: function equals(qd) {
      var qdParts = qd.toISOParts();

      var _iterator = _createForOfIteratorHelper(this.toISOParts().entries()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
              i = _step$value[0],
              part = _step$value[1];

          if (part !== qdParts[i]) return false;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return true;
    }
  }, {
    key: "lessThan",
    value: function lessThan(qd) {
      var qdParts = qd.toISOParts();

      var _iterator2 = _createForOfIteratorHelper(this.toISOParts().entries()),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2),
              i = _step2$value[0],
              part = _step2$value[1];

          if (part < qdParts[i]) return true;
          if (part > qdParts[i]) break;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return false;
    }
  }, {
    key: "greaterThan",
    value: function greaterThan(qd) {
      var qdParts = qd.toISOParts();

      var _iterator3 = _createForOfIteratorHelper(this.toISOParts().entries()),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _step3$value = (0, _slicedToArray2["default"])(_step3.value, 2),
              i = _step3$value[0],
              part = _step3$value[1];

          if (part > qdParts[i]) return true;
          if (part < qdParts[i]) break;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return false;
    }
  }, {
    key: "toISOParts",
    value: function toISOParts() {
      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
      var parts = [0, 1, 1, 0, 0, 0];
      var partsOut = [this.get("year"), this.get("month"), this.get("day"), this.get("hour"), this.get("minute"), this.get("second")];

      for (var i = 0; i < level; ++i) {
        parts[i] = partsOut[i];
      }

      return parts;
    }
  }, {
    key: "toISOString",
    value: function toISOString() {
      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
      var intParts = this.toISOParts(level);
      var parts = [intParts[0].toString().padStart(4, "0")].concat((0, _toConsumableArray2["default"])(intParts.slice(1).map(function (v) {
        return v.toString().padStart(2, "0");
      })));
      return "".concat(parts[0], "-").concat(parts[1], "-").concat(parts[2], "T").concat(parts[3], ":").concat(parts[4], ":").concat(parts[5], ".000Z");
    }
  }, {
    key: "toDate",
    value: function toDate() {
      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
      return new Date(this.toISOString(level));
    }
  }, {
    key: "toMillis",
    value: function toMillis() {
      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
      return +this.toDate(level);
    }
  }, {
    key: "toQuantizableDate",
    value: function toQuantizableDate() {
      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
      return new QuantizableDateRecord(this.toDate(level));
    }
  }, {
    key: "addMillis",
    value: function addMillis(millis) {
      var date = this.toDate();
      date.setTime(date.getTime() + millis);
      return new QuantizableDateRecord(date);
    }
  }], [{
    key: "detectLevel",
    value: function detectLevel(dateMin, dateMax, buckets) {
      // Ensure we have QuantizableDate instances
      var qDateMin = new QuantizableDateRecord(dateMin);
      var qDateMax = new QuantizableDateRecord(dateMax);
      var millisPerBucket = (qDateMax.toMillis() - qDateMin.toMillis()) / buckets;

      if (millisPerBucket >= this.MsPerWeek) {
        return this.MsPerWeek;
      }

      if (millisPerBucket >= this.MsPerDay) {
        return this.MsPerDay;
      }

      if (millisPerBucket >= this.MsPerHour) {
        return this.MsPerHour;
      }

      if (millisPerBucket >= this.MsPerMinute) {
        return this.MsPerMinute;
      }

      return this.MsPerSecond;
    }
  }, {
    key: "quantize",
    value: function quantize(date, level) {
      var qd = new QuantizableDateRecord(date);

      switch (level) {
        case this.MsPerWeek:
          // Special case
          var _date = qd.toDate(3);

          while (_date.getUTCDay() > 0) {
            _date.setUTCDate(_date.getUTCDate() - 1);
          }

          return new QuantizableDateRecord(_date);

        case this.MsPerDay:
          return qd.toQuantizableDate(3);

        case this.MsPerHour:
          return qd.toQuantizableDate(4);

        case this.MsPerMinute:
          return qd.toQuantizableDate(5);

        case this.MsPerSecond:
          return qd.toQuantizableDate(6);

        default:
          throw new Error("Unknown level ".concat(level));
      }
    }
  }, {
    key: "genQuantizedDates",
    value: /*#__PURE__*/_regenerator["default"].mark(function genQuantizedDates(start, end, level) {
      var qDateStart, qDateEnd;
      return _regenerator["default"].wrap(function genQuantizedDates$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              qDateStart = this.quantize(start, level);
              qDateEnd = this.quantize(end, level);

            case 2:
              if (!qDateStart.lessThan(qDateEnd)) {
                _context.next = 8;
                break;
              }

              _context.next = 5;
              return qDateStart;

            case 5:
              qDateStart = qDateStart.addMillis(level);
              _context.next = 2;
              break;

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, genQuantizedDates, this);
    })
  }]);
  return QuantizableDateRecord;
}(QuantizableDateRecordFactory);

exports["default"] = QuantizableDateRecord;
(0, _defineProperty2["default"])(QuantizableDateRecord, "DateRegex", /^(\d\d\d\d)(\d\d)(\d\d)((\d\d)(\d\d)(\d\d)){0,1}$/);
(0, _defineProperty2["default"])(QuantizableDateRecord, "MsPerSecond", 1000);
(0, _defineProperty2["default"])(QuantizableDateRecord, "MsPerMinute", QuantizableDateRecord.MsPerSecond * 60);
(0, _defineProperty2["default"])(QuantizableDateRecord, "MsPerHour", QuantizableDateRecord.MsPerMinute * 60);
(0, _defineProperty2["default"])(QuantizableDateRecord, "MsPerDay", QuantizableDateRecord.MsPerHour * 24);
(0, _defineProperty2["default"])(QuantizableDateRecord, "MsPerWeek", QuantizableDateRecord.MsPerDay * 7);
