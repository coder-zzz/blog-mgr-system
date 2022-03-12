import { defineComponent,ref,onMounted} from "vue";
import { useRoute,useRouter} from "vue-router";
import { blog } from "../../services";
import { result,formatTimeStamp} from "../../helpers/utils";
import { message } from "ant-design-vue";
import Update from '@/views/Blogs/Update/index.vue'

import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default defineComponent({
  components:{
    Update,
    mavonEditor
  },
  setup(){
    const route = useRoute();
    const router = useRouter();

    const {id} = route.params;
    const detailInfo = ref({});
    const showUpdateModal = ref(false);
    const subfield = ref(false);
    const defaultOpen = ref('preview');
    const toolbarsFlag = ref(false);
    const editable = ref(false);


    const getDetail = async () => {
      const res = await blog.detail(id);

      result(res)
        .success(({data}) => {
          detailInfo.value = data;
          console.log(detailInfo.value.content);
        })
    }

    // 删除博客
    const remove = async () => {
      const res = await blog.remove(id);

      result(res)
        .success(({msg}) => {
          message.success(msg);

          // push是往路由栈中新增路由，通过浏览器的上一页按钮可以回到旧页面，replace是直接替换路由，不能通过上一页按钮回到当旧面
          router.replace('/blogs')
        })
    }

    // 修改博客
    const update = (newData) => {
      // 合并原数据和新修改的数据
      Object.assign(detailInfo.value,newData);
    }

    // 显示编辑框
    const editContent = () => {
       subfield.value = true;
       defaultOpen.value = 'edit';
       toolbarsFlag.value = true;
       editable.value = true;
    }

      // 保存博客修改后的内容
    const save = async () => {
      const res = await blog.update({
        id,
        content:detailInfo.value.content,
      });

      result(res)
      .success(({msg}) => {
        message.success(msg);
      })
    }

    onMounted(() => {
      getDetail();
    })

    return{
      detailInfo,
      formatTimeStamp,
      remove,
      showUpdateModal,
      update,
      subfield,
      defaultOpen,
      toolbarsFlag,
      editable,
      editContent,
      save,
    }
  }
})
