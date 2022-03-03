const Router = require('@koa/router');
const mongoose = require('mongoose');
const config = require('../../project.config');
const {getRequestBody} = require('../../helpers/utils');

const BlogClassify = mongoose.model('BlogClassify');

// 设置路由前缀
const router = new Router({
  prefix:'/blogClassify',
})

// 获取分类列表
router.get('/list',async (ctx) => {
  const list = await BlogClassify.find().sort({_id:-1}).exec();

  ctx.body = {
    code:1,
    msg:'获取分类列表成功',
    data:list,
  }
})

// 添加分类
router.post('/add',async (ctx) => {
  const {
    title,
  } = getRequestBody(ctx);

  const one = await BlogClassify.findOne({
    title,
  }).exec();

  if(one){
    ctx.body = {
      code:0,
      msg:'博客分类已存在',
    }
    return
  }
  
  const blogClassify = new BlogClassify({
    title,
  })

  const res = await blogClassify.save();

  ctx.body = {
    code:1,
    msg:'添加分类成功',
    data:res,
  }
})

// 删除分类
router.delete('/:id',async (ctx) => {
  const {
    id,
  } = ctx.params;

  const one = await BlogClassify.findOne({
    _id:id,
  });

  if(!one){
    ctx.body = {
      code:0,
      msg:'该分类不存在',
    }
    return
  }
  
  const res = await BlogClassify.deleteOne({
    _id:id,
  }).exec();

  ctx.body = {
    code:1,
    msg:'删除成功',
    data:res,
  }
})

// 修改分类
router.post('/update/title',async (ctx) => {
  const {
    id,
    title,
  } = getRequestBody(ctx);
  
  const one = await BlogClassify.findOne({
    _id:id,
  }).exec();

  if(!one){
    ctx.body = {
      code:0,
      msg:'该分类不存在',
    }
    return
  }

  one.title = title;

  const res = await one.save();

  ctx.body = {
    code:1,
    msg:'修改分类成功',
    data:res,
  }
})

//导出路由
module.exports = router;