const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema({
  nickname:String,
  password:String,
  age:Number,
})

const UserModal = mongoose.model('user',UserSchema)

const connect = () => {
  // 连接数据库
  mongoose.connect('mongodb://127.0.0.1:27017/blog-mgr');

  // 检测数据库是否连接成功
  mongoose.connection.on('open',()=>{
    console.log('连接成功');

    // 创建文档
    const user = new UserModal({
      nickname:'小明',
      password:'123456',
      age:18,
    });

    // 保存同步到MongoDB
    user.save();
  })
}

connect();