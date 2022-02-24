require('./Schemas/User');
require('./Schemas/InviteCode');
require('./Schemas/Blog');

const mongoose = require('mongoose');

const connect = () => {
  return new Promise((resolve) => {
    // 连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/blog-mgr');

    // 检测数据库是否连接成功
    mongoose.connection.on('open',()=>{
      console.log('连接数据库成功');

      resolve();
    })
  })
}

module.exports = {
  connect
}