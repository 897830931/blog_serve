module.exports = (options) => {
  return async function jwtAuth(ctx, next) {
    const { app } = ctx;
    const jwtOptions = app.config.jwtAuthOptions;

    const requestPath = ctx.request.path;

    // 如果路径在忽略列表中，直接跳过校验
    if (jwtOptions.ignore.some(ignorePath => requestPath.startsWith(ignorePath))) {
      await next();
      return;
    }

    // 如果路径不在匹配列表中，也直接跳过校验
    if (!jwtOptions.match.some(matchPath => requestPath.startsWith(matchPath))) {
      await next();
      return;
    }

    // 下面就是 JWT Token 校验逻辑（如前述代码）
    const authorization = ctx.request.header.authorization;

    if (!authorization) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: "请提供有效的 Token",
      };
      return;
    }

    try {
      const decoded = jwt.verify(authorization, app.config.keys);
      const user = await ctx.service.user.get({ id: decoded.name });

      if (!user) {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          message: "用户不存在，Token 无效",
        };
        return;
      }

      ctx.user = user;

      await next();
    } catch (error) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: "无效的 Token",
      };
    }
  };
};
