import { defineComponent,reactive,watch} from "vue";
import { message } from "ant-design-vue";
import { blog } from "../../../services";
import { result,deepClone} from "../../../helpers/utils";
import moment from 'moment';
import store from "../../../store";

export default defineComponent({
  props:{
    show:Boolean,
    blog:Object,
  },
  setup(props,context){
    const editForm = reactive({
      title:'',
      author:'',
      publishDate:0,
      classfiy:'',
    })

    // 关闭模态框
    const close = () => {
      context.emit("update:show",false);
    }

    // 监听响应式数据的变化并给模态框赋值已有内容
    watch(() => props.blog ,(current) => {
      Object.assign(editForm,current);
      editForm.publishDate = moment(Number(editForm.publishDate));
    })

    // 提交修改
    const submit = async () => {
      const res = await blog.update({
        id:props.blog._id,
        title:editForm.title,
        author:editForm.author,
        publishDate:editForm.publishDate.valueOf(),
        classfiy:editForm.classfiy,
      });

      result(res)
      .success(({data}) => {
        context.emit('update',data);
        message.success('修改成功');
        close();
      })
    }

    return {
      props,
      close,
      editForm,
      submit,
      store:store.state,
    }
  }
})
