"use strict";
const BaseService = require("./baseService");

class RoleCodesService extends BaseService {
  /**
   * 获取用户权限 Key 列表（角色权限 + 用户直接权限）
   * @param {number} userId - 用户 ID
   * @returns {Promise<string[]>} 返回权限 key 数组
   */
  async getUserPermissions(userId) {
    const { app } = this;

    try {
      // Step 1: 获取用户直接的权限
      const userCodes = await app.mysql.select("user_codes", {
        where: { user_id: userId },
        columns: ["code_id"], // 获取权限 ID
      });

      // 提取用户直接的权限 code_id
      const userCodeIds = userCodes.map((item) => item.code_id);

      // Step 2: 获取用户所属角色的权限
      const userRoles = await app.mysql.select("user_roles", {
        where: { user_id: userId },
        columns: ["role_id"], // 获取角色 ID
      });

      const roleIds = userRoles.map((item) => item.role_id);

      // 如果用户没有任何角色，角色权限为空
      let roleCodeIds = [];
      if (roleIds.length > 0) {
        const roleCodes = await app.mysql.select("role_codes", {
          where: { roles_id: roleIds },
          columns: ["code_id"], // 获取角色对应的权限 ID
        });
        roleCodeIds = roleCodes.map((item) => item.code_id);
      }

      // Step 3: 合并用户权限和角色权限的 code_id，并去重
      const allCodeIds = Array.from(new Set([...userCodeIds, ...roleCodeIds]));

      // Step 4: 根据所有的权限 ID 查询权限的 key
      const authorityCodes = await app.mysql.select("authority_codes", {
        where: { id: allCodeIds },
        columns: ["key"], // 获取权限 key
      });

      // 提取权限 key
      const keys = authorityCodes.map((item) => item.key);

      return this._response(1, "查询成功", keys);
    } catch (error) {
      app.logger.error(`Error fetching user permissions: ${error}`);
      return this._response(0, "系统错误，请稍后重试", []);
    }
  }
}

module.exports = RoleCodesService;
