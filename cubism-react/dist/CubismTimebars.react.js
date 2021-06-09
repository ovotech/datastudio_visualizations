"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var React = _interopRequireWildcard(require("react"));

var _immutable = _interopRequireDefault(require("immutable"));

var _dateformat = _interopRequireDefault(require("dateformat"));

var _QuantizableDateRecord = _interopRequireDefault(require("./QuantizableDateRecord"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var CubismTimebars = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(CubismTimebars, _React$PureComponent);

  var _super = _createSuper(CubismTimebars);

  function CubismTimebars() {
    (0, _classCallCheck2["default"])(this, CubismTimebars);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(CubismTimebars, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          quantizedDates = _this$props.quantizedDates,
          quantizationLevel = _this$props.quantizationLevel,
          width = _this$props.width;
      var dates = [];

      var _iterator = _createForOfIteratorHelper(Array.from(quantizedDates.reverse()).entries()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
              i = _step$value[0],
              date = _step$value[1];

          var add = null;

          switch (quantizationLevel) {
            case _QuantizableDateRecord["default"].MsPerWeek:
            case _QuantizableDateRecord["default"].MsPerDay:
              add = date.get("day") == 1 && (0, _dateformat["default"])(date.toMillis(), "dd/mm", true);
              break;

            case _QuantizableDateRecord["default"].MsPerHour:
              add = date.get("hour") == 0 && (0, _dateformat["default"])(date.toMillis(), "dd/mm", true);
              break;

            case _QuantizableDateRecord["default"].MsPerMinute:
            case _QuantizableDateRecord["default"].MsPerSecond:
              if (date.get("minute") == 0) {
                add = (0, _dateformat["default"])(date.toMillis(), "HH:MM", true);

                if (date.get("hour") == 0) {
                  add = (0, _dateformat["default"])(date.toMillis(), "dd/mm", true);
                }
              }

              break;
          }

          if (add) {
            dates.push([width - i, add]);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return dates.map(function (_ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            i = _ref2[0],
            date = _ref2[1];

        return /*#__PURE__*/React.createElement("g", {
          key: i
        }, /*#__PURE__*/React.createElement("text", {
          key: i,
          y: 30,
          x: i,
          textAnchor: "middle",
          style: {
            fontSize: "8px"
          }
        }, date), /*#__PURE__*/React.createElement("line", {
          x1: i,
          y1: 35,
          x2: i,
          y2: 40,
          stroke: "black",
          strokeWidth: 1
        }));
      });
    }
  }]);
  return CubismTimebars;
}(React.PureComponent);

exports["default"] = CubismTimebars;
