import {defineComponent,ref,onMounted} from "vue";
import menu from "../../../config/menu";
import {useRouter,useRoute} from 'vue-router';

export default defineComponent({
  setup(){
    const router = useRouter();
    const route = useRoute();

    const openKeys = ref(['杂项']);
    const selectedKeys = ref([]);

    onMounted(() => {
      selectedKeys.value = [route.path];
    })

    const to = (url) => {
      menu.forEach((item) => {
        let childrenUrl = [];

        if(item.children){
          item.children.forEach((childrenItem) => {
            childrenUrl.push(childrenItem.url);
          })

          if(childrenUrl.indexOf(url) === -1){
            openKeys.value = [];
          }else{
            openKeys.value = [item.title];
          }
        }
      })

      router.push(url);
    }

    return{
      openKeys,
      selectedKeys,
      menu,
      to
    }
  }
})
