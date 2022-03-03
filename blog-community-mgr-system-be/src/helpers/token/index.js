const jwt = require('jsonwebtoken');
const config = require('../../project.config');
const koajwt = require('koa-jwt');

// 获取token 
const getToken = (ctx) => {
  let {authorization} = ctx.header;

  return authorization.replace('Bearer ','').replace('bearer ','');
}

// 解析token
const verify = (token) => {
  return new Promise((resolve,reject) => {
    jwt.verify(token,config.JWT_SECRET,(err,payload) => {
      if(err){
        reject(err)
        return
      }
      
      resolve(payload);
    })
  })
}

// 服务端验证token是否正常存在
const middleware = (app) => {
  app.use(koajwt({
    secret:config.JWT_SECRET,
  }).unless({
    // 登录注册接口不需要验证token
    path:[
      /^\/auth\/login/,
      /^\/auth\/register/,
    ]
  })
  )
}

const catchTokenError = async (ctx,next) => {
  // 捕获下一个中间件的错误
  return next().catch((error) => {
    if(error.status === 401){
      ctx.status = 401;

      ctx.body = {
        code:0,
        msg:'token error',
      }
    }else{
      throw error;
    }
  })
}

module.exports = {
  getToken,
  verify,
  middleware,
  catchTokenError
}