'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // config/plugin.js
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  jsonwebtoken: {
    enable: true,
    package: 'jsonwebtoken',
  },
  // 路由权限
  routerPlus : {
    enable: true,
    package: 'egg-router-plus',
  }
  
};