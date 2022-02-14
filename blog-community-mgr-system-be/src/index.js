const Koa = require('koa');

const app = new Koa();



// 开启一个http服务
// 接收http请求并做处理，处理完成后响应
app.listen(3000,() => {
  console.log('服务启动成功');
})