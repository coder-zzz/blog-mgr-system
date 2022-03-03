const mongoose = require('mongoose');
const {connect} = require('../src/db/index.js');
const {defalutCharacters} = require('../src/helpers/character/index.js');

const Character = mongoose.model('Character');

connect()
  .then(async () => {
    console.log('开始初始化 角色 集合');

    await Character.insertMany(defalutCharacters);

    console.log('角色集合初始化完成');
  })
