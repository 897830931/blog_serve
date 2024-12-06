# egg

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[egg]: https://eggjs.org

### 项目结构

- app
  - controller - 控制器，接口使用的方法，处理请求，返回数据
  - router - 路由，接口的请求地址，找接口的入口
  - service - 业务逻辑，处理数据库的操作
  - middleware - 中间件，处理请求和响应的中间件，如验证token，日志记录等
  - extend - 扩展，自定义的工具类，如加密，解密等
- config - 配置文件，如数据库配置，日志配置等
- db - 数据库文件，如数据库的表结构，字段等
- logs - 日志文件