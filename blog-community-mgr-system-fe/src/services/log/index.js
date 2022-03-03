import axios from "axios";

// 获取日志列表
export const list = (page,size) => {
  return axios.get('http://localhost:3000/log/list',{
    params:{
      page,
      size,
    }
  })
}

// 删除（隐藏）日志列表
export const remove = (id) => {
  return axios.post(`http://localhost:3000/log/delete`,{
    id
  })
}
