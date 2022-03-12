const mongoose = require('mongoose');
const {getMeta} = require('../helpers')

const BlogSchema = new mongoose.Schema({
  //博客标题
  title:String,
  // 作者
  author:String,
  // 发表日期
  publishDate:String, 
  // 分类
  classfiy:String,
  //博客内容
  content:String,

  meta:getMeta(),
})

mongoose.model('Blog',BlogSchema)