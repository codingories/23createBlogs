"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("reflect-metadata");

var _typeorm = require("typeorm");

var _Post = require("./entity/Post");

(0, _typeorm.createConnection)().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
    var posts;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection.manager.find(_Post.Post);

          case 2:
            posts = _context.sent;

            if (!(posts.length === 0)) {
              _context.next = 7;
              break;
            }

            _context.next = 6;
            return connection.manager.save([new _Post.Post('Post 1', '我的第1篇文章'), new _Post.Post('Post 2', '我的第2篇文章'), new _Post.Post('Post 3', '我的第3篇文章'), new _Post.Post('Post 4', '我的第4篇文章'), new _Post.Post('Post 5', '我的第5篇文章'), new _Post.Post('Post 6', '我的第6篇文章'), new _Post.Post('Post 7', '我的第7篇文章'), new _Post.Post('Post 8', '我的第8篇文章'), new _Post.Post('Post 9', '我的第9篇文章'), new _Post.Post('Post 10', '我的第10篇文章'), new _Post.Post('Post 11', '我的第11篇文章')]);

          case 6:
            console.log('posts 数据填充了');

          case 7:
            _context.next = 9;
            return connection.close();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}())["catch"](function (error) {
  return console.log(error);
});