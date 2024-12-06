"use strict";

module.exports = ({ router, controller }) => {
  const authController = controller.admin.auth;

  // 定义认证相关接口路由
  router.post("/auth/login", authController.login); // 最终路由路径为 "/admin/auth/login"
  router.post("/auth/logout", authController.logout); // 最终路由路径为 "/admin/auth/logout"
  router.get("/auth/codes", authController.getCodes); // 最终路由路径为 "/admin/auth/codes"
};
