import {defineComponent,reactive} from 'vue';
import {UserOutlined,LockOutlined,GiftOutlined} from '@ant-design/icons-vue';
import {auth} from '@/services';

export default defineComponent({
  components:{
    UserOutlined,
    LockOutlined,
    GiftOutlined
  },
  setup(){
    const regForm = reactive({
      account:'',
      password:'',
    })

    const register = () => {
      auth.register(regForm.account,regForm.password)
    }

    return{
      regForm,
      register,
    }
  },
})
