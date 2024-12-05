"use strict";
const Controller = require("egg").Controller;
const jwt = require("jsonwebtoken");
class UserController extends Controller {
  /**
   * 接口描述：获取用户信息
   * 请求方式：get
   * 参数：{}
   * header：authorization
   */
  async get() {
    const { ctx } = this;
    //  获取token
    const token = ctx.request.header.authorization;
    //  通过token 获取用户信息
    const data = await ctx.service.user.get({
      token,
    });
    // 获取用户角色
    const roleCodes = await ctx.service.userRoles.select({
      user_id: data.id,
    });
    if (data) {
      ctx.body = {
        code: 1,
        data: {
          ...data,
          roleCodes,
        },
        message: "",
      };
      return;
    }
    this.app.throwError(400, "用户不存在");
  }
}
module.exports = UserController;
