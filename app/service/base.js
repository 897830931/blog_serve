"use strict";
const Service = require("egg").Service;
const Joi = require("joi");

class BaseService extends Service {
  /**
   * 通用响应方法
   * @param {boolean} code - 是否成功
   * @param {string} [message=""] - 消息
   * @param {Object} [data=null] - 数据
   * @returns {Object} 响应结果
   */
  /**
   * 通用响应方法
   * @param {Object} ctx - 上下文
   * @param {number} code - 状态码
   * @param {string} message - 响应消息
   * @param {Object|null} data - 数据，默认为 null
   */
  _response(ctx, code, message = "", data = null) {
    ctx.body = {
      code,
      message,
      data,
    };
  }

  /**
   * 处理服务层错误日志
   * @param {string} methodName - 方法名
   * @param {Error} error - 错误对象
   */
  handleServiceError(methodName, error) {
    this.app.logger.error(
      `[Service ${this.constructor.name}.${methodName}] Error: ${error.message}`
    );
  }

  /**
   * 通用的参数校验器
   * @param {Object} schema - Joi schema 对象
   * @param {Object} data - 需要校验的数据
   */
  validateParams(schema, data) {
    const validation = schema.validate(data);
    if (validation.error) {
      this.ctx.throw(400, validation.error.message);
    }
  }

  /**
   * 校验请求参数
   * 动态生成校验规则，根据接口的具体需求进行校验
   * @param {string} type - 请求类型，如 'get'、'update'、'login' 等
   * @param {Object} params - 请求参数
   */
  validateRequestParams(type, params) {
    let schema;

    switch (type) {
      case "get":
        schema = Joi.object().keys({
          id: Joi.number().integer().required().label("ID"),
        });
        break;

      case "update":
        schema = Joi.object().keys({
          param: Joi.object().required().label("更新参数"),
          where: Joi.object().required().label("更新条件"),
        });
        break;

      case "login":
        schema = Joi.object().keys({
          username: Joi.string().required().label("用户名"),
          password: Joi.string().required().label("密码"),
        });
        break;

      case "register":
        schema = Joi.object().keys({
          username: Joi.string().min(3).max(30).required().label("用户名"),
          password: Joi.string().min(6).max(100).required().label("密码"),
          email: Joi.string().email().required().label("邮箱"),
        });
        break;

      default:
        throw new Error("未知请求类型");
    }

    // 调用通用的参数校验方法
    this.validateParams(schema, params);
  }
}

module.exports = BaseService;
