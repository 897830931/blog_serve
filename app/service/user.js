/**
 * user数据库封装
 */
"use strict";
const BaseService = require("./base");

class UserService extends BaseService {
  /**
   * 获取用户信息
   * @param {object} param - 查询参数
   * @returns {object} 返回响应对象
   */
  async get(param) {
    try {
      // 校验查询参数
      this.validateRequestParams("get", param);
      const { app } = this;
      const user = await app.mysql.get("user", param);
      if (!user) {
        return {};
      }
      return user;
    } catch (error) {
      this.handleServiceError("get", error);
      return "系统异常";
    }
  }
  async login(param) {
    try {
      // 校验查询参数
      this.validateRequestParams("login", param);
      const { app } = this;
      const user = await app.mysql.get("user", param);
      if (!user) {
        return {};
      }
      return user;
    } catch (error) {
      this.handleServiceError("get", error);
      return "系统异常";
    }
  }

  /**
   * 修改用户信息
   * @param {object} param - 更新的参数
   * @param {object} where - 条件
   * @param {object} otherOptions - 其他选项
   * @returns {object} 返回响应对象
   */
  async update(param, where, otherOptions = {}) {
    try {
      // 校验参数
      const { app } = this;
      const options = {
        where,
        ...otherOptions,
      };

      const result = await app.mysql.update("user", param, options);
      if (result.affectedRows === 0) {
        return false;
      }
      return true;
    } catch (error) {
      this.handleServiceError("update", error);
      return false;
    }
  }
}

module.exports = UserService;
