import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'basicLayout',
    component: () => import(/* webpackChunkName: "basicLayout" */ '../layout/basicLayout/index.vue'),
    children:[
      {
        path:'/blogs',
        name:'Blogs',
        component: () => import(/* webpackChunkName: "blogs" */ '../views/Blogs/index.vue'),
      },
      {
        path:'/blogs/:id',
        name:'BlogDetail',
        component: () => import(/* webpackChunkName: "BlogDetail" */ '../views/BlogDetail/index.vue'),
      },
      {
        path:'/users',
        name:'Users',
        component: () => import(/* webpackChunkName: "Users" */ '../views/Users/index.vue'),
      },
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
