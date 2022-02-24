import { defineComponent,reactive} from "vue";
import { message } from "ant-design-vue";
import { blog } from "../../../services";
import { result,deepClone} from "../../../helpers/utils";

const defaultFormData = {
  title:'',
  author:'',
  publishDate:0,
  classfiy:'',
}

export default defineComponent({
  props:{
    show:Boolean,
  },
  setup(props,context){
    const addForm = reactive(
        deepClone(defaultFormData)
    )

    const submit = async () => {
      const form = deepClone(addForm);
      form.publishDate = addForm.publishDate.valueOf();
      const res = await blog.add(form);

      result(res)
      .success((d,{data}) => {
        Object.assign(addForm,defaultFormData);
        message.success(data.msg);
      })
    }

    const close = () => {
      context.emit("update:show",false);
    }

    return {
      addForm,
      submit,
      props,
      close,
    }
  }
})
