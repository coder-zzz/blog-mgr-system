import { defineComponent,ref} from "vue";
import Nav from './Nav/index.vue'
import store from "../../store";
import { useRouter } from "vue-router";

export default defineComponent({
  components:{
    AppNav:Nav,
  },

  setup(){
    const router = useRouter();

    const userName = ref('');
    const show = ref(false);

    userName.value = store.state.userInfo.account;

    const logout = () => {
      localStorage.removeItem('_tt');
      router.replace('auth');
    }

    // 关闭模态框
    const close = () => {
      show.value = false;
    }

    return {
      userName,
      logout,
      show,
      close,
    }
  }
})
