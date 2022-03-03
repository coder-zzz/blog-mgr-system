import { defineComponent,reactive} from "vue";
import { message } from "ant-design-vue";
import { blog } from "../../../services";
import { result,deepClone} from "../../../helpers/utils";
import store from "../../../store";

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

    if(store.state.blogClassify.length){
      addForm.classfiy = store.state.blogClassify[0].title;
    }

    const submit = async () => {
      const form = deepClone(addForm);
      form.publishDate = addForm.publishDate.valueOf();
      const res = await blog.add(form);

      result(res)
      .success((d,{data}) => {
        Object.assign(addForm,defaultFormData);
        message.success(data.msg);

        // 调用父组件传递过来的函数
        context.emit('getList');
        
        close();
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
      store:store.state,
    }
  }
})
