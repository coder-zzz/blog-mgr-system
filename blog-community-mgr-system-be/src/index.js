const Koa = require('koa');
const koaBody = require('koa-body');
const {connect} = require('./db')
const registerRoutes = require('./routers');
const cors = require('@koa/cors');
const {middleware:koaJwtMiddleware,catchTokenError} = require('./helpers/token');
const {logMiddleware} = require('./helpers/log');

const app = new Koa();

// 等待数据库连接成功，再开启服务，以免发送请求时数据库还未连接成功，导致无法返回数据
connect().then(() => {
    // 全局注册中间件
    app.use(koaBody());
    app.use(cors());

    // 捕获token错误
    app.use(catchTokenError);
    
    // jwt验证中间件
    koaJwtMiddleware(app);

    // 日志中间件
    app.use(logMiddleware);

    //触发路由
    registerRoutes(app);

    // 开启一个http服务
    // 接收http请求并做处理，处理完成后响应
    app.listen(3000,() => {
      console.log('服务启动成功');
    })
})