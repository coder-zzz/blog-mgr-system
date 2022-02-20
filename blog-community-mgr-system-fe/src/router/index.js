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
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
