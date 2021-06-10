"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _immutable = _interopRequireDefault(require("immutable"));

var _QuantizableDateRecord = _interopRequireDefault(require("./QuantizableDateRecord"));

var _CubismDataContext = _interopRequireWildcard(require("./CubismDataContext"));

var _CubismLayoutContext = _interopRequireWildcard(require("./CubismLayoutContext"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var CubismDataSourceStatic = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(CubismDataSourceStatic, _React$PureComponent);

  var _super = _createSuper(CubismDataSourceStatic);

  function CubismDataSourceStatic() {
    (0, _classCallCheck2["default"])(this, CubismDataSourceStatic);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(CubismDataSourceStatic, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          data = _this$props.data,
          dataMin = _this$props.dataMin,
          dataMax = _this$props.dataMax,
          dates = _this$props.dates,
          dateMin = _this$props.dateMin,
          dateMax = _this$props.dateMax,
          dateOverlap = _this$props.dateOverlap;
      var dataComputed = (0, _CubismDataContext.Data)({
        data: data,
        dataMin: dataMin,
        dataMax: dataMax,
        dates: dates,
        dateMin: dateMin,
        dateMax: dateMax,
        dateOverlap: dateOverlap
      });
      return /*#__PURE__*/React.createElement(_CubismDataContext["default"].Provider, {
        value: dataComputed
      }, this.props.children);
    }
  }]);
  return CubismDataSourceStatic;
}(React.PureComponent);

exports["default"] = CubismDataSourceStatic;
(0, _defineProperty2["default"])(CubismDataSourceStatic, "defaultProps", {
  dates: _immutable["default"].List(),
  dateOverlap: null
});
