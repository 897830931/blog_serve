"use strict";

module.exports = (app) => {

  //为所有 admin 路由设置统一前缀 "/admin"，将adminRouter 作为参数传入，相当于他们都是在 adminRouter 上进行路由定义，所以他们的路由路径都会加上 "/admin" 前缀
  const adminRouter = app.router.namespace('/admin');
  // 添加用户校验中间件
  adminRouter.use(app.middleware.jwtAuth(app.config.jwtAuth));
  // 引入每个模块的路由
  require('./auth')({ router: adminRouter, controller: app.controller });
  require('./user')({ router: adminRouter, controller: app.controller });
};
