"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DateQuantContext = exports.DateQuant = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _immutable = _interopRequireDefault(require("immutable"));

var _CubismDataContext = _interopRequireWildcard(require("./CubismDataContext"));

var _CubismLayoutContext = _interopRequireDefault(require("./CubismLayoutContext"));

var _QuantizableDateRecord = _interopRequireDefault(require("./QuantizableDateRecord"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var DateQuant = _immutable["default"].Record({
  quantizationLevel: 0
});

exports.DateQuant = DateQuant;
var DateQuantContext = /*#__PURE__*/React.createContext(DateQuant());
exports.DateQuantContext = DateQuantContext;
DateQuantContext.displayName = "DateQuantContext"; // Component

var CubismDataDateQuantization = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(CubismDataDateQuantization, _React$PureComponent);

  var _super = _createSuper(CubismDataDateQuantization);

  function CubismDataDateQuantization() {
    (0, _classCallCheck2["default"])(this, CubismDataDateQuantization);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(CubismDataDateQuantization, [{
    key: "render",
    value: function render() {
      var _this$context = this.context,
          data = _this$context.data,
          dataMin = _this$context.dataMin,
          dataMax = _this$context.dataMax,
          dates = _this$context.dates,
          dateMin = _this$context.dateMin,
          dateMax = _this$context.dateMax,
          rawData = _this$context.rawData,
          dateOverlap = _this$context.dateOverlap;
      var _this$props = this.props,
          quantizationLevel = _this$props.quantizationLevel,
          children = _this$props.children;
      return /*#__PURE__*/React.createElement(_CubismLayoutContext["default"].Consumer, null, function (layout) {
        var width = layout.width;
        var detectedQuantizationLevel = quantizationLevel != null ? quantizationLevel : _QuantizableDateRecord["default"].detectLevel(dateMin, dateMax, width);

        var quantizedDates = _immutable["default"].OrderedSet(_QuantizableDateRecord["default"].genQuantizedDates(dateMin, dateMax.addMillis(1000), detectedQuantizationLevel));

        var quantizedData = data.map(function (data) {
          return _immutable["default"].OrderedMap().withMutations(function (output) {
            var _iterator = _createForOfIteratorHelper(data.entries()),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
                    unquantizedDate = _step$value[0],
                    samples = _step$value[1];

                var quantizedDate = _QuantizableDateRecord["default"].quantize(unquantizedDate, detectedQuantizationLevel);

                if (!quantizedDates.has(quantizedDate)) {
                  console.warn("Invalid date");
                }

                var existing = output.get(quantizedDate) || [];
                output.set(quantizedDate, samples.concat(existing));
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          });
        });
        var value = (0, _CubismDataContext.Data)({
          data: quantizedData,
          dataMin: dataMin,
          dataMax: dataMax,
          dates: quantizedDates.toList(),
          dateMin: dateMin,
          dateMax: dateMax,
          rawData: rawData,
          dateOverlap: dateOverlap
        });
        var dateQuantValue = DateQuant({
          quantizationLevel: detectedQuantizationLevel
        });
        return /*#__PURE__*/React.createElement(_CubismDataContext["default"].Provider, {
          value: value
        }, /*#__PURE__*/React.createElement(DateQuantContext.Provider, {
          value: dateQuantValue
        }, children));
      });
    }
  }]);
  return CubismDataDateQuantization;
}(React.PureComponent);

exports["default"] = CubismDataDateQuantization;
(0, _defineProperty2["default"])(CubismDataDateQuantization, "contextType", _CubismDataContext["default"]);
