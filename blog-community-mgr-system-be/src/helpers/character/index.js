`
  -1 无任何权限
  0 超级管理员权限
  1 增加权限
  2 删除权限
  3 查找权限
  4 修改权限
`;

const defalutCharacters = [
  {
    title:'管理员',
    name:'admin',
    power:{
      blog:[0],
      user:[-1]
    },
  },
  {
    title:'超级管理员',
    name:'superAdmin',
    power:{
      blog:[0],
      user:[0]
    },
  },
];

module.exports = {
  defalutCharacters,
}

