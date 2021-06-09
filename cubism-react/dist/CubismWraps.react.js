"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.WrapsContext = exports.Wraps = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _immutable = _interopRequireDefault(require("immutable"));

var _CubismDataContext = _interopRequireDefault(require("./CubismDataContext"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Wraps = _immutable["default"].Record({
  wraps: _immutable["default"].Map(),
  subsampleHeight: 0
});

exports.Wraps = Wraps;
var WrapsContext = /*#__PURE__*/React.createContext(Wraps());
exports.WrapsContext = WrapsContext;
WrapsContext.displayName = "WrapsContext"; // Component

var WrapColors = _immutable["default"].List(["#08519c", "#3182bd", "#6baed6", "#bdd7e7", "#bae4b3", "#74c476", "#31a354", "#006d2c"]);

var WrapPositive = WrapColors.slice(4);
var WrapNegative = WrapColors.slice(0, 4).reverse();

var CubismWraps = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(CubismWraps, _React$PureComponent);

  var _super = _createSuper(CubismWraps);

  function CubismWraps() {
    (0, _classCallCheck2["default"])(this, CubismWraps);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(CubismWraps, [{
    key: "render",
    value: function render() {
      var dataMax = this.context.dataMax;
      var subsampleHeight = dataMax / WrapPositive.size;

      var wraps = _immutable["default"].Map().withMutations(function (wraps) {
        for (var i = 0; i < WrapColors.size / 2; ++i) {
          wraps.set(subsampleHeight * (i + 1), WrapPositive.get(i));
          wraps.set(-(subsampleHeight * (i + 1)), WrapNegative.get(i));
        }
      });

      var value = Wraps({
        wraps: wraps,
        subsampleHeight: subsampleHeight
      });
      return /*#__PURE__*/React.createElement(WrapsContext.Provider, {
        value: value
      }, this.props.children);
    }
  }]);
  return CubismWraps;
}(React.PureComponent);

exports["default"] = CubismWraps;
(0, _defineProperty2["default"])(CubismWraps, "contextType", _CubismDataContext["default"]);
