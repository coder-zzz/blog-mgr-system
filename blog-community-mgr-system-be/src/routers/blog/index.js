const Router = require('@koa/router');
const mongoose = require('mongoose');
const {getRequestBody} = require('../../helpers/utils');

//获取Blog表中的model文档中的内容
const Blog = mongoose.model('Blog');

// 接口前缀
const router = new Router({
  prefix:'/blog',
})

// 添加博客信息接口
router.post('/add',async (ctx) =>{
  // 获取请求体数据信息
  const{
    title,
    author,
    publishDate,
    classfiy,
  } = getRequestBody(ctx);

  // 实例化请求体传过来的数据
  const blog = new Blog({
    title,
    author,
    publishDate,
    classfiy,
  });

  // 插入新数据到数据库中
  const res =  await blog.save();

  // 接口返回数据
  ctx.body = {
    code:1,
    msg:'添加博客成功',
    data:res,
  };
})

router.get('/list',async (ctx) =>{
  const {
    page = 1,
    keyword = '',
  } = ctx.query;

  let {
    size = 5,
  } = ctx.query;

  size = Number(size);

  const query = {};
  if(keyword){
    query.title = keyword;
  }

  const list = await Blog
  .find(query)
  .skip((page - 1) * size)
  .limit(size)
  .exec();

  const total = await Blog.countDocuments();

  // 接口返回数据
  ctx.body = {
    code:1,
    msg:'获取列表成功',
    data:{
      list,
      total,
      page,
      size,
    },
  };
})

router.delete('/:id', async (ctx) => {
  const {
    id
  } = ctx.params;

  const delMsg = await Blog.deleteOne({
    _id:id,
  })

  ctx.body = {
    code:1,
    msg:'删除成功',
    data:delMsg,
  }
})

router.post('/update',async (ctx) => {
  const {
    id,
    // title,
    // author,
    // publishDate, 
    // classfiy,
    ...others
  } = getRequestBody(ctx);

  const one = await Blog.findOne({
    _id:id,
  }).exec();

  // 没有找到博客
  if(!one){
    ctx.body = {
      code:0,
      msg:'没有找到博客',
    }
    return
  }

  const newQuery = {};
  // 找到了博客，就更新数据
  Object.entries(others).forEach(([key,value]) => {
    if(value){
      newQuery[key] = value;
    }
  })

  Object.assign(one,newQuery);

  const res = await one.save();

  ctx.body = {
    code:1,
    msg:'修改成功',
    data:res,
  }  
})

//导出路由
module.exports = router;