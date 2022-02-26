import { defineComponent,reactive} from "vue";
import { message } from "ant-design-vue";
import { user } from "../../../services";
import { result,deepClone} from "../../../helpers/utils";

const defaultFormData = {
  account:'',
  password:'',
}

export default defineComponent({
  props:{
    show:Boolean,
  },
  setup(props,context){
    const addForm = reactive(
        deepClone(defaultFormData)
    )

    const close = () => {
      context.emit("update:show",false);
    }

    const submit = async () => {
      const form = deepClone(addForm);
      const res = await user.add(form.account,form.password);

      result(res)
      .success((d,{data}) => {
        Object.assign(addForm,defaultFormData);
        message.success(data.msg);
        close();
        context.emit('getList');
    })
  }

    return {
      addForm,
      submit,
      props,
      close,
    }
  }
})
