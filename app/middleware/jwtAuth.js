"use strict";
// 该文件进行身份校验，通过jwt校验用户token
const jwt = require("jsonwebtoken");

module.exports = (options) => {
  return async function jwtAuth(ctx, next) {
    const { app } = ctx;

    // 获取请求头中的 Authorization
    const authorization = ctx.request.header.authorization;

    if (!authorization) {
      // 如果没有 Token，返回错误信息
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: "请提供有效的 Token",
      };
      return;
    }

    try {
      // 验证和解密 Token
      const decoded = jwt.verify(authorization, app.config.keys);

      // 通过解密出来的用户 ID 获取用户信息
      const user = await ctx.service.user.get({ id: decoded.name });

      if (!user) {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          message: "用户不存在，Token 无效",
        };
        return;
      }

      // 将用户信息挂载到上下文中，供后续的接口直接使用
      ctx.user = user;

      // 调用下一个中间件或控制器
      await next();
    } catch (error) {
      // Token 校验失败
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: "无效的 Token",
      };
    }
  };
};
