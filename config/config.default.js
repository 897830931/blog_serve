/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_asdfghjkldfsdf';
  // 全局常量
  config.CONST = {
    ROOT: '',
    UPLOAD_URL: 'http://127.0.0.1:7001',
    BOOK_SOURCE_MAP: {
      1: {
        url: 'https://www.qidian.com', // 主要是爬起点的免费章节，后续可以加入其它网站源
        name: '起点',
      },
    },
  }
  //数据库配置
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'egg',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }
  // 报错处理
  config.onerror = {
    errorPageUrl: (err, ctx) => ctx.errorPageUrl || '/500',
    json: (err, ctx) => {
      ctx.body = {
        code: err.status,
        msg: err.message,
      };
    },
  };
  // 跨域配置
  config.cors = {
    origin: ['*'],
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };
  config.security = {
    // csrf: false,
    csrf: {
      enable: false, // 前后端分离，post请求不方便携带_csrf
      ignoreJSON: true,
      headerName: 'authorization',
    },
    methodnoallow: {
      enable: false,
    },

  };
  // 上传文件
  config.multipart = {
    mode: 'stream',
  };


  // add your middleware config here
  config.middleware = ['httpError','verLogin'];
  config.httpError = {
    match: '/',
  };
  // 登录配置中间件
  config.verLogin = {
    match: '/token',
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };


  return {
    ...config,
    ...userConfig,
  };
};