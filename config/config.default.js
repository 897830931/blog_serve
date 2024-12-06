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
  // 生成token的密钥，用于生成token
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
  //数据库配置 如果链接不上项目无法启动，注释掉就行
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
        message: err.message,
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


  // 中间件
  config.middleware = ['httpError', 'jwtAuth'];
  config.httpError = {
    match: '/',
  };
   // jwtAuth 中间件的配置，定义哪些路由需要校验 JWT Token
  config.jwtAuth = {
    enable: true,
    match: ["/admin", "/api/private"], // 所有以 "/admin" 或 "/api/private" 开头的接口都需要校验
    // ignore: ["/admin/auth/login", "/api/public"], // 忽略特定接口，如登录接口、公开接口
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