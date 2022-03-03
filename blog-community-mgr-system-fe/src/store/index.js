import { createStore } from 'vuex';
import {character,user,blogClassify} from '@/services';
import {result} from '@/helpers/utils';
import {getCharacterInfoById} from '@/helpers/character'

export default createStore({
  state: {
    characterInfo:[],
    userInfo:{},
    userCharacter:{},//存储的是角色的id而非角色名
    blogClassify:[],
  },
  mutations: {
    // 获取默认角色列表信息，并存到state中
    setBlogClassify(state,blogClassify){
      state.blogClassify = blogClassify;
    },

    // 获取默认角色列表信息，并存到state中
    setCharacterInfo(state,characterInfo){
      state.characterInfo = characterInfo;
    },

    // 获取用户信息（登录用），并存到state中
    setUserInfo(state,userInfo){
      state.userInfo = userInfo;
    },

    // 获取用户角色信息，并存到state中
    setUserCharacter(state,userCharacter){
      state.userCharacter = userCharacter;
    },

  },
  actions: {
    //获取分类列表信息
    async getBlogClassify(store){
      const res = await blogClassify.list();

      result(res)
        .success(({data}) => {
          store.commit('setBlogClassify',data);
        })
    },

    // 获取角色列表信息
    async getCharacterInfo(store){
      const res = await character.list();

      result(res)
        .success(({data}) => {
          store.commit('setCharacterInfo',data);
        })
    },

    // 获取用户信息
    async getUserInfo(store){
      const res = await user.info();

      result(res)
        .success(({data}) => {
          store.commit('setUserInfo',data);

          store.commit('setUserCharacter',getCharacterInfoById(data.character));
        });
    },

  },
  modules: {
  },
});
