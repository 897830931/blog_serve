"use strict";
module.exports = {
  // 报错扩展
  throwError(code = 500, msg = "服务器错误") {
    const err = new Error(msg);
    err.code = code;
    err.message = msg;
    throw err;
  },
};
