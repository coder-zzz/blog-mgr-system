import axios from 'axios';
import { getToken } from '@/helpers/token';

axios.defaults.headers['Authorization'] = `Bearer ${getToken()}`;

// 添加分类
export const add = (title) => {
  return axios.post('http://localhost:3000/blogClassify/add',{
    title
  },
  );
}

// 获取分类列表
export const list = () => {
  return axios.get('http://localhost:3000/blogClassify/list');
}

// 删除分类
export const remove = (id) => {
  return axios.delete(`http://localhost:3000/blogClassify/${id}`);
}

// 修改分类
export const updateTitle = (id,title) => {
  return axios.post(
    `http://localhost:3000/blogClassify/update/title`,
    {
      id,
      title,
    }
  );
}
