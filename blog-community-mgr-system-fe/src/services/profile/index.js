import axios from 'axios';

// 修改密码
export const resetPassword = (password,confirmPassword) => {
  return axios.post('http://localhost:3000/profile/update/password',{
    password,
    confirmPassword,
  })
}



