const Router = require('@koa/router');
const mongoose = require('mongoose');
const config = require('../../project.config');

const User = mongoose.model('User');

// 设置路由前缀
const router = new Router({
  prefix:'/user',
})

// 获取用户列表
router.get('/list',async (ctx) => {
  let {
    page,
    size,
    keyword,
  } = ctx.query;

  page = Number(page);
  size = Number(size);

  const query = {};

  if(keyword){
    query.account = keyword;
  }

  const list = await User
    .find(query)
    .sort({_id:-1})
    .skip((page - 1 ) * size)
    .limit(size)
    .exec();

    const total = await User.countDocuments().exec();

    ctx.body = {
      code:1,
      msg:'获取用户列表成功',
      data:{
        list,
        page,
        size,
        total,
      },
    }
  })

// 删除用户
router.delete('/:id',async (ctx) => {
  const {id} = ctx.params;

  const delMsg = await User.deleteOne({
    _id:id,
  }).exec();

  ctx.body = {
    code:1,
    msg:'删除用户成功',
    data:delMsg,
  }
})

// 添加用户
router.post('/add',async (ctx) => {
  const {
    account,
    password,
  } = getRequestBody(ctx);

  const user = new User({
    account,
    password:password || '123456',
  })

  const res = await user.save();

  ctx.body = {
    code:1,
    msg:'添加用户成功',
    data:res,
  }
})

router.post('/reset/password',async (ctx) => {
  const {
    id,
  } = getRequestBody(ctx);

  const user = await User.findOne({
    _id:id,
  }).exec();

  if(!user){
    ctx.body = {
      code:0,
      msg:'用户不存在',
    }
    return
  }

  user.password = config.DEFAULT_PASSWORD;

  const res = await user.save();

  ctx.body = {
    code:1,
    msg:'重置密码成功',
    data:{
      account:res.account,
      _id:res._id,
    },
  }
})

//导出路由
module.exports = router;