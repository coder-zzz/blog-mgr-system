const Router = require('@koa/router');
const mongoose = require('mongoose');
const config = require('../../project.config');

const Character = mongoose.model('Character');

// 设置路由前缀
const router = new Router({
  prefix:'/character',
})

router.get('/list',async (ctx) => {
  const list = await Character.find().exec();

  ctx.body = {
    code:1,
    msg:'获取角色列表成功',
    data:list,
  }
})

//导出路由
module.exports = router;