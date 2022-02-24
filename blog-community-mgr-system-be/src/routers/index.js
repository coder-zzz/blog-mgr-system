const auth = require('./auth');
const inviteCode = require('./inviteCode');
const blog = require('./blog');

// 在routers中局部注册中间件
module.exports = (app) => {
  app.use(auth.routes());
  app.use(inviteCode.routes());
  app.use(blog.routes());
}