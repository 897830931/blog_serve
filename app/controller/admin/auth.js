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
    const user = await ctx.service.user.login({ username, password });
    if (!user) {
      ctx.throw(400, "账号或密码错误");
    }
    // 生成 JWT Token
    const payload = { id: user.id }; // Token 中包含用户 ID
    const secretOrPrivateKey = app.config.keys; // 密钥
    const token = jwt.sign(payload, secretOrPrivateKey, { expiresIn: "1h" });
    // 设置 Token 到 Cookie
    ctx.cookies.set("auth_token", token, {
      httpOnly: true, // 防止通过 JavaScript 访问
      secure: false, // 在本地开发中不需要开启 HTTPS
      sameSite: "None", // 设置 SameSite 策略
      maxAge: 60 * 60 * 1000, // 设置过期时间 1小时
    });

    // 更新用户表中的 Token（可选，如果需要存储 Token 在数据库中）
    await ctx.service.user.update({ token }, { id: user.id });

    // 查询用户角色
    const userRoles = await ctx.service.userRoles.getUserRoles({
      user_id: user.id,
    });

    // 返回登录成功信息
    ctx.service.base._response(ctx, 1, "登录成功", {
      accessToken: token,
      realName: user.realName || "",
      username: user.username,
      roles: userRoles,
    });
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
    console.log(user, "user");
    const _response = await ctx.service.user.update(
      { token: "" },
      { id: user.id }
    );
    if (!_response) {
      ctx.throw(400, "退出登录失败");
    }
    // 返回退出登录的响应
    ctx.body = {
      code: 1,
      data: _response,
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
    const roleCodes = await ctx.service.roleCodes.getUserPermissions(userId);
    // 返回权限码
    ctx.service.base._response(ctx, 1, "请求成功", roleCodes);
  }
}

module.exports = AuthController;
