const Koa = require('koa');
const koaBody = require('koa-body');
const {connect} = require('./db')
const registerRoutes = require('./routers');
const cors = require('@koa/cors');

const app = new Koa();

// 等待数据库连接成功，再开启服务，以免发送请求时数据库还未连接成功，导致无法返回数据
connect().then(() => {
    // 全局注册中间件
    app.use(koaBody());
    app.use(cors());

    //触发路由
    registerRoutes(app);

    // 开启一个http服务
    // 接收http请求并做处理，处理完成后响应
    app.listen(3000,() => {
      console.log('服务启动成功');
    })
})