const Router = require('@koa/router');
const mongoose = require('mongoose');
const config = require('../../project.config');
const {getRequestBody} = require('../../helpers/utils/index.js')
const {verify,getToken} = require('../../helpers/token');

const User = mongoose.model('User');

// 设置路由前缀
const router = new Router({
  prefix:'/profile',
})

router.post('/update/password',async (ctx) => {
  const {
    password,   
    confirmPassword,
  } = getRequestBody(ctx);

  const {_id} = await verify(getToken(ctx));

  const one = await User.findOne({_id}).exec();

  if(!one){
    ctx.body = {
      code:0,
      msg:'用户不存在',
    }
    return
  }

  if(!password && !confirmPassword){
    ctx.body = {
      code:0,
      msg:'请输入密码！',
    }
    return
  }

  if(!confirmPassword){
    ctx.body = {
      code:0,
      msg:'请确认密码！',
    }
    return
  }

  if(password !== confirmPassword){
    ctx.body = {
      code:0,
      msg:'两次输入密码不一致！',
    }
    return
  }

  one.password = password;
  await one.save();

  ctx.body = {
    code:1,
    msg:'修改密码成功',
  }

})

//导出路由
module.exports = router;