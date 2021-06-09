"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CombinedContext = exports.Combined = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var React = _interopRequireWildcard(require("react"));

var _immutable = _interopRequireDefault(require("immutable"));

var _CubismDataContext = _interopRequireWildcard(require("./CubismDataContext"));

var _CubismLayoutContext = _interopRequireWildcard(require("./CubismLayoutContext"));

var _CubismSettings = require("./CubismSettings.react");

var _CubismWraps = require("./CubismWraps.react");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Combined = _immutable["default"].Record({
  data: (0, _CubismDataContext.Data)(),
  layout: (0, _CubismLayoutContext.Layout)(),
  settings: (0, _CubismSettings.Settings)(),
  wraps: (0, _CubismWraps.Wraps)()
});

exports.Combined = Combined;
var CombinedContext = /*#__PURE__*/React.createContext(Combined());
exports.CombinedContext = CombinedContext;
CombinedContext.displayName = "CombinedContext"; // Component

var CubismCombinedContext = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(CubismCombinedContext, _React$PureComponent);

  var _super = _createSuper(CubismCombinedContext);

  function CubismCombinedContext() {
    (0, _classCallCheck2["default"])(this, CubismCombinedContext);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(CubismCombinedContext, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      return /*#__PURE__*/React.createElement(_CubismDataContext["default"].Consumer, null, function (data) {
        return /*#__PURE__*/React.createElement(_CubismLayoutContext["default"].Consumer, null, function (layout) {
          return /*#__PURE__*/React.createElement(_CubismSettings.SettingsContext.Consumer, null, function (settings) {
            return /*#__PURE__*/React.createElement(_CubismWraps.WrapsContext.Consumer, null, function (wraps) {
              return /*#__PURE__*/React.createElement(CombinedContext.Provider, {
                value: Combined({
                  data: data,
                  layout: layout,
                  settings: settings,
                  wraps: wraps
                })
              }, children);
            });
          });
        });
      });
    }
  }]);
  return CubismCombinedContext;
}(React.PureComponent);

exports["default"] = CubismCombinedContext;
