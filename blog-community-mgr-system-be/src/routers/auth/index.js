const Router = require('@koa/router');
const mongoose = require('mongoose');
const {getRequestBody} = require('../../helpers/utils')
const jwt = require('jsonwebtoken');

//获取User表中的model文档中的内容
const User = mongoose.model('User');
const InviteCode = mongoose.model('InviteCode');

const router = new Router({
  prefix:'/auth',
})

router.post('/register',async (ctx) =>{
  // 获取请求体信息
  const {account,password,inviteCode} = getRequestBody(ctx);
  
  if(account === '' || password === '' || inviteCode === ''){
    ctx.body = {
      code:0,
      msg:"字段不能为空",
      data:null,
    };
    return
  }

  //查询数据库的文档里有没有对应的account，findOne返回的是promise对象，所以使用await等待查询结束
  const findUser = await User.findOne({
    account,
  }).exec();

  //通过查询结果判断是否已存在该用户
  if(findUser){
    ctx.body = {
      code:0,
      msg:"已存在该用户",
      data:null,
    };
    return
  }

  // 查询数据库里有没有对应的邀请码
  const findCode = await InviteCode.findOne({
    code:inviteCode
  }).exec();

  // 通过查询结果判断邀请码是否正确
  if(!findCode){
    ctx.body = {
      code:0,
      msg:"邀请码不正确",
      data:null,
    };
    return
  }

  //通过查询结果判断邀请码是否已被使用
  if(findCode.user){
    ctx.body = {
      code:0,
      msg:"邀请码已使用",
      data:null,
    };
    return
  }

  // 实例化新用户注册信息，方便以对象形式插入到数据库中
  const user = new User({
    account,
    password,
  })

  // 把新用户注册信息插入到 mongodb
  const res = await user.save();


  findCode.user = res._id;
  findCode.meta.updateAt = new Date().getTime();

  await findCode.save();
  
  // 返回请求数据
  ctx.body = {
    code:1,
    msg:"注册成功",
    data:res,
  };
})

router.post('/login',async (ctx) =>{
  // 获取请求体信息
  const {account,password} = getRequestBody(ctx);
  
  if(account === '' || password === ''){
    ctx.body = {
      code:0,
      msg:"字段不能为空",
      data:null,
    };
    return
  }

  //查询数据库的文档里有没有对应的account，findOne返回的是promise对象，所以使用await等待查询结束
  const one = await User.findOne({
    account,
  }).exec();

  // 账号信息找不到返回对应错误信息
  if(!one){
    ctx.body = {
      code:0,
      msg:"用户名或密码错误",
      data:null
    }

    return
  }

// 作jwt第一个参数使用
const user = {
  account:one.account,
  _id:one._id,
}

  // 当与数据库中的数据符合是返回登录成功等数据
  if(one.password === password){
    ctx.body = {
      code:1,
      msg:"登录成功",
      data:{
        user,
        token:jwt.sign(user,"blog-mgr")
      },
    };

    return
  }

  ctx.body = {
    code:0,
    msg:"用户名或密码错误",
    data:null
  }
})

//导出路由
module.exports = router;