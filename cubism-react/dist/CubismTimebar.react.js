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

var React = _interopRequireWildcard(require("react"));

var _immutable = _interopRequireDefault(require("immutable"));

var _dateformat = _interopRequireDefault(require("dateformat"));

var _QuantizableDateRecord = _interopRequireDefault(require("./QuantizableDateRecord"));

var _CubismTimebars = _interopRequireDefault(require("./CubismTimebars.react"));

var css = _interopRequireWildcard(require("./cubism.module.css"));

var _CubismDataDateQuantization = require("./CubismDataDateQuantization.react");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var CubismTimebar = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(CubismTimebar, _React$PureComponent);

  var _super = _createSuper(CubismTimebar);

  function CubismTimebar() {
    (0, _classCallCheck2["default"])(this, CubismTimebar);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(CubismTimebar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          quantizedDates = _this$props.quantizedDates,
          hoverTime = _this$props.hoverTime,
          hover = _this$props.hover,
          width = _this$props.width,
          height = _this$props.height,
          scrollY = _this$props.scrollY;
      return /*#__PURE__*/React.createElement("div", {
        className: css.timebarContainer,
        style: {
          height: height
        }
      }, /*#__PURE__*/React.createElement("svg", {
        width: width,
        height: height,
        style: scrollY ? {
          position: "absolute",
          top: scrollY
        } : null,
        className: css.timebar
      }, /*#__PURE__*/React.createElement("g", {
        className: "timebars"
      }, /*#__PURE__*/React.createElement(_CubismDataDateQuantization.DateQuantContext.Consumer, null, function (_ref) {
        var quantizationLevel = _ref.quantizationLevel;
        return /*#__PURE__*/React.createElement(_CubismTimebars["default"], {
          quantizedDates: quantizedDates,
          quantizationLevel: quantizationLevel,
          width: width
        });
      })), hoverTime ? /*#__PURE__*/React.createElement("text", {
        y: 12,
        x: hover,
        fill: "red",
        textAnchor: "middle"
      }, hoverTime.toISOString()) : null));
    }
  }]);
  return CubismTimebar;
}(React.PureComponent);

exports["default"] = CubismTimebar;
