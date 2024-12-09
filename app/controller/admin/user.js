"use strict";
const Controller = require("egg").Controller;

class UserController extends Controller {
  /**
   * 接口描述：获取用户信息
   * 请求方式：get
   * 参数：{}
   * header：authorization
   */
  async get() {
    const { ctx } = this;

    // 中间件已验证 Token 并将用户信息挂载到 ctx.user
    const user = ctx.user;

    if (!user) {
      ctx.throw(400, "用户不存在");
    }

    // 获取用户权限码
    const roleCodes = await ctx.service.roleCodes.getUserPermissions(user.id);

    // 返回用户信息和角色
    ctx.body = {
      code: 1,
      data: {
        ...user,
        roleCodes,
      },
      message: "请求成功",
    };
  }
}

module.exports = UserController;
