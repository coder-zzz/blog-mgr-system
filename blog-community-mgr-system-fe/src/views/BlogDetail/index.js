import { defineComponent,ref,onMounted} from "vue";
import { useRoute,useRouter} from "vue-router";
import { blog } from "../../services";
import { result,formatTimeStamp} from "../../helpers/utils";
import { message } from "ant-design-vue";
import Update from '@/views/Blogs/Update/index.vue'

export default defineComponent({
  components:{
    Update,
  },
  setup(){
    const route = useRoute();
    const router = useRouter();

    const {id} = route.params;
    const detailInfo = ref({});
    const showUpdateModal = ref(false);

    const getDetail = async () => {
      const res = await blog.detail(id);

      result(res)
        .success(({data}) => {
          detailInfo.value = data;
          // detailInfo.value.publishDate = formatTimeStamp(detailInfo.value.publishDate);
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

    onMounted(() => {
      getDetail();
    })

    return{
      detailInfo,
      formatTimeStamp,
      remove,
      showUpdateModal,
      update,
    }
  }
})
