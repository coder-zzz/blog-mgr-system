const mongoose = require('mongoose');
const {getMeta} = require('../helpers')

const UserSchema = new mongoose.Schema({
  account:String,
  password:String,
  character:String,

  meta:getMeta(),
})

mongoose.model('User',UserSchema)