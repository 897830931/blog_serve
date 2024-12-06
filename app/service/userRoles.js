/**
 * user数据库封装
 */
"use strict";
const BaseService = require("./baseService");

class UserService extends BaseService {
  /**
   * 获取用户角色权限 key 列表
   * @param {Array} roles - 用户角色数组
   * @returns {Promise<Array>} - 角色 key 列表
   */
  async getRolesKeys(roles) {
    const { app } = this;

    try {
      // 使用批量查询来减少数据库交互次数
      const roleIds = roles.map(role => role.role_id);
      const roleRecords = await app.mysql.select("roles", {
        where: {
          id: roleIds,
        },
      });

      // 返回每个角色的 key
      return roleRecords.map(role => role.key);
    } catch (error) {
      this.handleServiceError("getRolesKeys", error);
      return [];
    }
  }

  /**
   * 获取用户角色列表
   * 直接从 ctx.user 中获取用户 ID，不再重新查询用户信息
   * @returns {Promise<object>} - 用户角色 Key 列表
   */
  async getUserRoles() {
    const { ctx } = this;

    try {
      // 从中间件校验得到的用户信息中获取用户 ID
      const userId = ctx.user.id;

      // 根据用户 ID 查询用户角色
      const roles = await this.app.mysql.select("user_roles", {
        where: { user_id: userId },
      });

      if (!roles.length) {
        return this._response(0, "该用户没有分配任何角色", []);
      }

      // 获取角色 keys
      const roleKeys = await this.getRolesKeys(roles);
      return this._response(1, "获取用户角色列表成功", roleKeys);
    } catch (error) {
      this.handleServiceError("getUserRoles", error);
      return this._response(0, "系统错误，请稍后重试");
    }
  }

  /**
   * 更新用户信息
   * @param {object} param - 更新内容
   * @param {object} where - 更新条件
   * @param {object} otherOptions - 其他数据库操作选项
   * @returns {Promise<object>} - 更新结果
   */
  async update(param, where, otherOptions = {}) {
    const { app } = this;

    try {
      this.validateUpdateParams(param, where); // 参数校验

      const options = {
        where,
        ...otherOptions,
      };

      const result = await app.mysql.update("user", param, options);

      if (result.affectedRows === 0) {
        return this._response(0, "未找到符合条件的用户，或更新未作更改");
      }
      return this._response(1, "用户信息更新成功");
    } catch (error) {
      this.handleServiceError("update", error);
      return this._response(0, "系统错误，请稍后重试");
    }
  }

  /**
   * 为指定用户添加角色
   * @param {number} userId - 用户 ID
   * @param {Array} roleIds - 角色 ID 列表
   * @returns {Promise<object>} - 添加角色结果
   */
  async addRolesToUser(userId, roleIds) {
    const { app } = this;

    try {
      // 检查参数是否有效
      if (!userId || !Array.isArray(roleIds) || roleIds.length === 0) {
        return this._response(0, "无效的用户 ID 或角色列表");
      }

      const insertValues = roleIds.map(roleId => ({
        user_id: userId,
        role_id: roleId,
      }));

      // 插入到用户角色表
      const result = await app.mysql.insert("user_roles", insertValues);
      if (result.affectedRows > 0) {
        return this._response(1, "用户角色添加成功");
      } else {
        return this._response(0, "用户角色添加失败");
      }
    } catch (error) {
      this.handleServiceError("addRolesToUser", error);
      return this._response(0, "系统错误，请稍后重试");
    }
  }
}

module.exports = UserService;
