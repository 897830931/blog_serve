"use strict";
module.exports = () => {
  return async function httpError(ctx, next) {
    try {
      await next();
    } catch (err) {
      if (err.message) {
        ctx.body = {
          code: err.code,
          data: "",
          message: err.message,
        };
      } else {
        ctx.body = {
          code: 500,
          data: "",
          message: "服务器内部错误：" + err,
        };
        ctx.status = 500;
      }
    }
  };
};
