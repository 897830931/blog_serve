'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;
  // 运营后台端
  router.post('/admin/user/login', controller.admin.user.login);
  router.post('/admin/user/logout', controller.admin.user.logout);
  router.get('/admin/user/get', controller.admin.user.get); // 获取用户信息

};