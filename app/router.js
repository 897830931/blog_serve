"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  // 运营后台端
  router.post("/auth/login", controller.admin.auth.login); // 登录
  router.post("/auth/logout", controller.admin.auth.logout); // 退出登录
  router.get("/auth/codes", controller.admin.auth.getCodes); // 用户权限码
  router.get("/user/info", controller.admin.user.get); // 获取用户信息
};
