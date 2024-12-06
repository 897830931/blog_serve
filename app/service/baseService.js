"use strict";
const Service = require("egg").Service;
const Joi = require('joi');

class BaseService extends Service {
  /**
   * 通用响应方法
   * @param {boolean} code - 是否成功
   * @param {string} [message=""] - 消息
   * @param {Object} [data=null] - 数据
   * @returns {Object} 响应结果
   */
  _response(code, message = "", data = null) {
    return {
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
    this.app.logger.error(`[Service ${this.constructor.name}.${methodName}] Error: ${error.message}`);
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
   * 校验 get 参数
   * @param {Object} param - 传入的查询参数
   */
  validateGetParams(param) {
    const getSchema = Joi.object().keys({
      id: Joi.number().integer().required(),
    });
    this.validateParams(getSchema, param);
  }

  /**
   * 校验 update 参数
   * @param {Object} param - 传入的更新参数
   * @param {Object} where - 更新条件
   */
  validateUpdateParams(param, where) {
    const updateSchema = Joi.object().keys({
      param: Joi.object().required(),
      where: Joi.object().required(),
    });
    this.validateParams(updateSchema, { param, where });
  }
}

module.exports = BaseService;
