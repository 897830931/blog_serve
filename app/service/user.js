/**
 * user数据库封装
 */
"use strict";
const BaseService = require("./baseService");

class UserService extends BaseService {
  /**
   * 获取用户信息
   * @param {object} param - 查询参数
   * @returns {object} 返回响应对象
   */
  async get(param) {
    try {
      // 校验查询参数
      this.validateGetParams(param);

      const { app } = this;
      const user = await app.mysql.get("user", param);
      
      if (!user) {
        return this._response(0, "用户不存在");
      }
      return this._response(1, "查询成功", user);

    } catch (error) {
      this.handleServiceError("get", error);
      return this._response(0, "系统错误，请稍后重试");
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
      this.validateUpdateParams(param, where);

      const { app } = this;
      const options = {
        where,
        ...otherOptions,
      };

      const result = await app.mysql.update("user", param, options);
      if (result.affectedRows === 0) {
        return this._response(0, "未找到符合条件的用户，或更新未作更改");
      }
      return this._response(1, "更新成功");

    } catch (error) {
      this.handleServiceError("update", error);
      return this._response(0, "系统错误，请稍后重试");
    }
  }
}

module.exports = UserService;
