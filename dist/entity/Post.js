"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Post = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _typeorm = require("typeorm");

var _dec, _dec2, _class, _class2, _descriptor, _temp;

var Post = (_dec = (0, _typeorm.Entity)('posts'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('increment'), _dec(_class = (_class2 = (_temp = function Post(title, content) {
  (0, _classCallCheck2["default"])(this, Post);
  this.title = title;
  this.content = content;
  (0, _initializerDefineProperty2["default"])(this, "id", _descriptor, this);
}, _temp), (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "id", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.Post = Post;