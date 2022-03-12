import { defineComponent, ref,reactive} from "vue";

import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

import store from "../../store";
import { deepClone,result} from "../../helpers/utils";
import { blog } from "../../services";
import { message } from "ant-design-vue";

export default defineComponent({
  components:{
    mavonEditor,
  },
  setup(){
    const defaultFormData = {
      title:'',
      author:'',
      publishDate:0,
      classfiy:'',
      content:'',
    }

    const addForm = reactive(
      deepClone(defaultFormData)
  )

  if(store.state.blogClassify.length){
    addForm.classfiy = store.state.blogClassify[0].title;
  }


    // 获取编辑器内容
    const getContent = (value,render) => {
      addForm.content = render;
    }


    const publish = async () => {
      const form = deepClone(addForm);
      form.publishDate = addForm.publishDate.valueOf();
      const res = await blog.add(form);

      result(res)
      .success(({msg}) => {
        Object.assign(addForm,defaultFormData);
        message.success(msg);
      })
    }

    return{
      // content,
      getContent,
      store,
      addForm,
      publish,
    }
  }
})
