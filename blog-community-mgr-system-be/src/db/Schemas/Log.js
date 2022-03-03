const mongoose = require('mongoose');
const {getMeta} = require('../helpers')

const LogSchema = new mongoose.Schema({
  user:{
    account:String,
    id:String,
  },

  request:{
    method:String,
    url:String,
    status:Number,
  },

  startTime:Number,
  endTime:Number,

  show:Boolean,

  meta:getMeta(),
})

mongoose.model('Log',LogSchema)