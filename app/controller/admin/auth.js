"use strict";
const Controller = require("egg").Controller;
const jwt = require("jsonwebtoken");

class AuthController extends Controller {
  /**
   * 接口描述：后台登录
   * 请求方式：post
   * 参数：{
   *          username: string  //账号
   *          password: string  //密码
   *       }
   *  header：无（登录不需要 Token）
   */
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;

    // 校验参数是否存在
    if (!username) {
      ctx.throw(400, "账号不能为空");
    }
    if (!password) {
      ctx.throw(400, "密码不能为空");
    }

    // 查询用户信息
    const user = await ctx.service.user.get({ username, password });
    if (!user) {
      ctx.throw(400, "账号或密码错误");
    }

    // 生成 JWT Token
    const payload = { name: user.id }; // Token 中包含用户 ID
    const secretOrPrivateKey = app.config.keys; // 密钥
    const token = jwt.sign(payload, secretOrPrivateKey, { expiresIn: '1h' });

    // 更新用户表中的 Token（可选，如果需要存储 Token 在数据库中）
    await ctx.service.user.update({ token }, { id: user.id });

    // 查询用户角色
    const _response = await ctx.service.userRoles.getUserRoles({ user_id: user.id });

    // 返回登录成功信息
    ctx.body = {
      code: 1,
      data: {
        accessToken: token,
        realName: user.realName || "",
        username: user.username,
        roles: _response.data,
      },
      message: "请求成功",
    };
  }

  /**
   * 接口描述：退出登录
   * 请求方式：post
   * 参数：{}
   * header：authorization
   */
  async logout() {
    const { ctx } = this;

    // 获取中间件挂载的用户信息
    const user = ctx.user;

    // 清空用户数据库中的 Token
   const _response = await ctx.service.user.update({ token: "" }, { id: user.id });

    // 返回退出登录的响应
    ctx.body = {
      ..._response,
      message: "退出登录成功",
    };
  }


  /**
   * 获取用户权限码
   * 请求方式：get
   * 参数：{}
   * header：authorization
   */
  async getCodes() {
    const { ctx } = this;

    // 中间件已验证 Token 并挂载用户信息，直接使用 ctx.user 获取用户 ID
    const { id: userId } = ctx.user;

    // 查询角色权限码
    const _response = await ctx.service.roleCodes.select({ role_id: userId });
    // 返回权限码
    ctx.body = _response
  }
}

module.exports = AuthController;
