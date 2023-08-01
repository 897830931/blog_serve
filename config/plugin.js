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
  }
};