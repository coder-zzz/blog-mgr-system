const mongoose = require('mongoose');
const {getMeta} = require('../helpers')

const CharacterSchema = new mongoose.Schema({
  name:String,// admin superAdmin
  title:String,//管理员 超级管理员
  power:Object,

  meta:getMeta(),
})

mongoose.model('Character',CharacterSchema)