import { message } from "ant-design-vue";
import { defineComponent,ref} from "vue";
import { result } from "../../helpers/utils";
import { profile } from "../../services";

export default defineComponent({
  setup(){
    const password = ref('');
    const confirmPassword = ref('');

    const resetPassword = async () => {
      const res = await profile.resetPassword(password.value,confirmPassword.value);
      console.log(res);

      result(res)
        .success(({msg}) => {
          message.success(msg);
          password.value = '';
          confirmPassword.value = '';
        })
    }

    return{
      password,
      confirmPassword,
      resetPassword,
    }
  }
})
