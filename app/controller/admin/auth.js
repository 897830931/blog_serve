"use strict";
const Controller = require("egg").Controller;
const jwt = require("jsonwebtoken");
class AuthController extends Controller {
  /**
   * 接口描述：后台登录
   * 请求方式：post
   * 参数：{
   *          account:string  //账号
   *          password:string  //密码
   *       }
   *  header：authorization
   */
  async login() {
    const { ctx, app } = this;
    const query = ctx.request.body;
    const option = {
      username: query.username,
      password: query.password,
    };

    if (!query.username) {
      app.throwError(200, "账号不能为空");
    }
    if (!query.username) {
      app.throwError(200, "密码不能为空");
    }

    const user = await ctx.service.user.get(option);
    if (!user) {
      app.throwError(200, "账号密码错误");
    }
    const content = {
      name: user.id,
    }; // 要生成token的主题信息
    const secretOrPrivateKey = app.config.keys; // 这是加密的key（密钥）
    const token = jwt.sign(content, secretOrPrivateKey, {
      expiresIn: 60 * 60 * 1, // 1小时过期
    });
    const result = await ctx.service.user.update(
      {
        token,
      },
      {
        id: user.id,
      }
    );
    // 查询用户角色
    const roles = await ctx.service.userRoles.select({
      user_id: user.id,
    });
    if (result) {
      ctx.body = {
        code: 1,
        data: {
          // token
          accessToken: token,
          //
          realName: user.realName || "",
          username: user.username,
          roles: roles,
        },
        message: "请求成功",
      };
    }
  }
  /**
   * 接口描述：退出登陆
   * 请求方式：post
   * 参数：{}
   * header：authorization
   */
  async logout() {
    const { ctx, app } = this;
    // 获取token
    const token = ctx.request.header.authorization;
    // 验证token
    if (!token) {
      app.throwError(200, "需要token");
      return;
    }
    const user = await ctx.service.user.get({
      token,
    });

    if (!user) {
      app.throwError(200, "账号不存在");
    }
    console.log(user);
    if (user) {
      const result = await ctx.service.user.update(
        {
          token: "",
        },
        {
          id: user.id,
        }
      );
      if (result) {
        ctx.body = {
          code: 1,
          data: "",
        };
      }
    }
  }
  /**
   * 获取用户信息
   * @returns
   */
  async get() {
    const { ctx } = this;
    // console.log(this.app.config.keys);
    const token = ctx.request.header.authorization;
    console.log(token, "token");
    const data = await ctx.service.user.get({
      token,
    });
    if (data) {
      ctx.body = {
        code: 1,
        data,
        message: "",
      };
      return;
    }
    this.app.throwError(400, "用户不存在");
  }
  async getCodes() {
    const { ctx } = this;
    //  获取token
    const token = ctx.request.header.authorization;
    //  通过token 获取用户信息
    const { user_id } = await ctx.service.user.get({
      token,
    });
    //  查询角色权限
    const codes = await ctx.service.roleCodes.select({
      role_id: user_id,
    });
    if (codes) {
      ctx.body = {
        code: 1,
        data: codes,
        message: "",
      };
      return;
    }
  }
}
module.exports = AuthController;
