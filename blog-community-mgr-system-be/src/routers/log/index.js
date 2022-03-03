const Router = require('@koa/router');
const mongoose = require('mongoose');
const {getRequestBody} = require('../../helpers/utils')

const Log = mongoose.model('Log');

// 设置路由前缀
const router = new Router({
  prefix:'/log',
})

//获取日志列表
router.get('/list', async (ctx) => {
  let {
    page,
    size,
  } = ctx.query;

  page = Number(page);
  size = Number(size);

  const list = await Log
  .find({
    show:true,
  })
  .sort({
    _id:-1,
  })
  .skip((page - 1) * size)
  .limit(size)
  .exec();

  const total = await Log.countDocuments().exec();
  
  ctx.body = {
    code:1,
    msg:'获取日志列表成功',
    data:{
      list,
      page,
      size,
      total,
    },
  }
})

// 删除日志
router.post('/delete', async (ctx) => {
  const {
    id
  } = getRequestBody(ctx);

  const one = await Log.findOne({
    _id:id
  }).exec();

  if(!one){
    ctx.body = {
      code:0,
      msg:'删除成功'
    }
    return
  }

  one.show = false;

  await one.save();

  ctx.body = {
    code:1,
    msg:'删除日志成功',
  }
})

//导出路由
module.exports = router;