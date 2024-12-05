/**
 * user数据库封装
 */
"use strict";
const Service = require("egg").Service;

class roleCodesService extends Service {
  async select(param) {
    const { app } = this;
    // 根据用户id查询用户权角色权限和用户权限进行并集
    return ["AC_1000001", "AC_1000001"];
  }
  // 修改用户权限  param ={}  修改的参数  where={} 修改的条件
  async update(param, where) {
    return true;
  }
}

module.exports = roleCodesService;
