"use strict";

module.exports = ({ router, controller }) => {
  const userController = controller.admin.user;

  // 注意：这里的路由定义都基于 adminRouter，所以它们会自动带上 "/admin" 前缀
  router.get("/user/info", userController.get); // 最终路由路径为 "/admin/user/info"
};
