const Router = require('@koa/router');
const mongoose = require('mongoose');
const config = require('../../project.config');
const {getRequestBody} = require('../../helpers/utils/index.js')
const {verify,getToken} = require('../../helpers/token');

const User = mongoose.model('User');
const Character = mongoose.model('Character');

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
    character,
  } = getRequestBody(ctx);

  const char = await Character.findOne({
    _id:character,
  }).exec();

  if(!char){
    ctx.body = {
      code:0,
      msg:'该角色不存在',
    }
    return
  }

  const one = await User.findOne({
    account,
  }).exec();

  if(one){
    ctx.body = {
      code:0,
      msg:'用户已存在',
    }
    return
  }

  const user = new User({
    account,
    password:password || '123456',
    character,
  })

  const res = await user.save();

  ctx.body = {
    code:1,
    msg:'添加用户成功',
    data:res,
  }
})

//重置密码
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

// 修改用户角色
router.post('/update/character',async (ctx) => {
  const {
    character,
    userId,
  } = getRequestBody(ctx);

  const char = await Character.findOne({
    _id:character,
  }).exec();

  if(!char){
    ctx.body = {
      code:0,
      msg:'该角色不存在',
    }
    return
  }

  const user = await User.findOne({
    _id:userId,
  }).exec();

  if(!user){
    ctx.body = {
      code:0,
      msg:'该用户不存在',
    }
    return
  }

  user.character = character;
  const res = await user.save();

  ctx.body = {
    code:1,
    msg:'修改角色成功',
    data:res,
  }
})

//获取token，方便通过token获取用户信息
router.get('/info',async (ctx) => {
  ctx.body = {
    code:1,
    msg:'获取成功',
    data:await verify(getToken(ctx)),
  }
})

//导出路由
module.exports = router;