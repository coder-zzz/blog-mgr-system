import axios from 'axios';

export const add = (form) => {
  return axios.post('http://localhost:3000/blog/add',
    form
  );
}

export const list = (data) => {
  return axios.get('http://localhost:3000/blog/list',
  {
    params:data,
  },
  );
}

export const remove = (id) => {
  return axios.delete(
    `http://localhost:3000/blog/${id}`
  );
}

export const update = (data = {}) => {
  return axios.post(
    `http://localhost:3000/blog/update`,
    data,
  );
}

export const detail = (id) => {
  return axios.get(`http://localhost:3000/blog/detail/${id}`);
}
