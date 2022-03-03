const auth = require('./auth');
const inviteCode = require('./inviteCode');
const blog = require('./blog');
const user = require('./user');
const character = require('./character');
const log = require('./log');
const blogClassify = require('./blogClassify');

// 在routers中局部注册中间件
module.exports = (app) => {
  app.use(auth.routes());
  app.use(inviteCode.routes());
  app.use(blog.routes());
  app.use(user.routes());
  app.use(character.routes());
  app.use(log.routes());
  app.use(blogClassify.routes());
}