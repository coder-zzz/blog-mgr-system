const mongoose = require('mongoose');
const {getMeta} = require('../helpers');

const BlogClassifySchema = new mongoose.Schema({
  title:String,

  meta:getMeta(),
})

mongoose.model('BlogClassify',BlogClassifySchema)
