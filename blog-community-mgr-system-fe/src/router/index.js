import { createRouter, createWebHashHistory } from 'vue-router';
import store from '../store';

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
      {
        path:'/logs',
        name:'Log',
        component: () => import(/* webpackChunkName: "Log" */ '../views/Log/index.vue'),
      },
      {
        path:'/invite-code',
        name:'InviteCode',
        component: () => import(/* webpackChunkName: "InviteCode" */ '../views/InviteCode/index.vue'),
      },
      {
        path:'/blogClassify',
        name:'BlogClassify',
        component: () => import(/* webpackChunkName: "BlogClassify" */ '../views/BlogClassify/index.vue'),
      },
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to,from,next) => {
  // const reqArr = [];

  if(!store.state.characterInfo.length){
    await store.dispatch('getCharacterInfo');
  }

  if(!store.state.userInfo.account){
    await store.dispatch('getUserInfo');
  }

    await store.dispatch('getBlogClassify');


  // await Promise.all(reqArr);

  next();
});

export default router;
