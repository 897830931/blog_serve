/**
 * user数据库封装
 */
"use strict";
const Service = require("egg").Service;

class UserService extends Service {
  // 获取用户权限
  async getRolesKeys(roles) {
    const { app } = this;
    //  遍历roles  获取角色key
    const promises = roles.map(async (item) => {
      return await app.mysql.get("roles", {
        id: item.role_id,
      });
    });
    return Promise.all(promises);
  }
  // 获取用户信息
  async get(param) {
    const { app } = this;
    const roles = await app.mysql.get("user_roles", param);
    return roles;
  }
  async select(param) {
    const { app } = this;
    // 根据用户id查询用户角色
    const roles = await app.mysql.select("user_roles", { where: param });
    // 根据角色id查询角色
    const results = await this.getRolesKeys(roles);
    // 使用示例
    results.forEach((item, index) => {
      results[index] = item.key;
    });

    return results;
  }
  // 修改user  param ={}  修改的参数  where={} 修改的条件
  async update(param, where) {
    const { app } = this;
    const options = {
      where,
    };
    const result = await app.mysql.update(
      "user",
      {
        ...param,
      },
      options
    );
    if (result.affectedRows !== 1) {
      app.throwError(500, "数据库错误");
    }
    return true;
  }
}

module.exports = UserService;
