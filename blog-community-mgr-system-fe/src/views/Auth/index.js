import {defineComponent,reactive} from 'vue';
import {UserOutlined,LockOutlined,GiftOutlined} from '@ant-design/icons-vue';
import {auth} from '@/services';
import { result } from '../../helpers/utils';
import {message} from 'ant-design-vue'

export default defineComponent({
  components:{
    UserOutlined,
    LockOutlined,
    GiftOutlined
  },
  setup(){
    message.config({
      top: `200px`,
      duration: 1,
      maxCount: 3,
    });

    // 获取注册用的响应式数据
    const regForm = reactive({
      account:'',
      password:'',
      inviteCode:'',
    })

    // 调用axios封装的register请求接口
    const register = async () => {
      //验证账号
      if(regForm.account === ''){
        message.error('请输入账号')
        return
      }

      //验证密码
      if(regForm.password === ''){
        message.error('请输入密码')
        return
      }

      //验证邀请码
      if(regForm.inviteCode === ''){
        message.error('请输入邀请码')
        return
      }

      // 调用register接口
      const res = await auth.register(regForm.account,regForm.password,regForm.inviteCode);

      result(res)
      .success((data) => {
        message.success(data.msg);
      })
    }

    // 获取登录用的响应式数据
    const loginForm = reactive({
      account:'',
      password:'',
    })

    // 调用axios封装的login请求接口
    const login = async () => {
      //验证账号
      if(loginForm.account === ''){
        message.error('请输入账号')
        return
      }

      //验证密码
      if(loginForm.password === ''){
        message.error('请输入密码')
        return
      }

      // 调用login接口
      const res = await auth.login(loginForm.account,loginForm.password);

      result(res)
      .success((data) => {
        message.success(data.msg);
      })
    }

    return{
      // 注册相关数据
      regForm,
      register,

      // 登录相关数据
      loginForm,
      login,
    }
  },
})
