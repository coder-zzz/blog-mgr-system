import axios from "axios";

// 请求用户列表接口
export const list = (page = 1,size = 10,keyword ='') => {
  return axios.get('http://localhost:3000/user/list',
  {
    params:{
      page,
      size,
      keyword,
    },
  },
  );
}

// 删除用户接口
export const remove = (id) => {
  return axios.delete(`http://localhost:3000/user/${id}`)
}

// 添加用户接口
export const add = (account,password,character) => {
  return axios.post('http://localhost:3000/user/add',
  {
    account,
    password,
    character,
  })
}

// 重置密码接口
export const resetPassword = (id) => {
  return axios.post('http://localhost:3000/user/reset/password',{
    id,
  })
}

// 修改用户角色接口
export const editCharacter = (characterID,userId) => {
  return axios.post('http://localhost:3000/user/update/character',{
    character:characterID,
    userId,
  })
}

// 获取用户信息
export const info = () => {
  return axios.get('http://localhost:3000/user/info')
}
