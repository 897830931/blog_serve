"use strict";

module.exports = (app) => {
  require("./admin/index")(app); // admin 后台相关的路由
  require("./pc/index")(app); // pc 端相关的路由
  // 如果有更多模块，可以继续引入
};
