const mongoose = require('mongoose');
const {getMeta} = require('../helpers')

const LogResponseSchema = new mongoose.Schema({
  logId:String,
  data:String,

  meta:getMeta(),
})

mongoose.model('LogResponse',LogResponseSchema)