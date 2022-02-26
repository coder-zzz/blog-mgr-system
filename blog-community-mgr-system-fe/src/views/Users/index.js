import { defineComponent,ref,onMounted} from "vue";
import { user } from "../../services";
import {result,formatTimeStamp} from '@/helpers/utils';
import { message } from "ant-design-vue";
import AddOne from "./AddOne/index.vue";

// 用户列表表格行信息
const columns = [
    {
      title:'账号',
      dataIndex:'account',
    },
    {
      title:'创建日期',
      slots:{
        customRender:'createdAt',
      },
    },
    {
      title:'操作',
      slots:{
        customRender:'actions',
      },
    },
];

export default defineComponent({
  components:{
    // 引入添加用户组件
    AddOne,
  },

  setup(){
    const list = ref([]);
    const total = ref(0);
    const curPage = ref(1);
    const showAddModal = ref(false);
    const keyword = ref('');
    const isSearch = ref(false);

    // 获取用户列表
    const getUser = async () => {
      const res = await user.list(curPage.value,5,keyword.value);


    result(res)
      .success(({data:{list:resList,total:resTotal}}) => {
        list.value = resList;
        total.value = resTotal;
      })
    }

    onMounted(() => {
      getUser();
    })

    // 删除用户
    const remove = async ({_id}) => {
      const res = await user.remove(_id);

      result(res)
        .success(({msg}) => {
          message.success(msg);
          getUser();
        })
    }

    // 跳转分页
    const setPage = (page) => {
      curPage.value = page;
      getUser();
    }

    // 重置密码
    const resetPassword = async ({_id}) => {
      const res = await user.resetPassword(_id);

      result(res)
        .success(({msg}) => {
          message.success(msg);
        })
    }

    //搜索用户
    const onSearch = () => {
      getUser();

      // 当其他类型的变量赋值给Boolean类型的变量时会做隐式转换，
      // 如果有值则为真，没有值就为假
      isSearch.value = keyword.value;
    }

    //返回所有用户列表
    const backAll = () => {
      isSearch.value = false;
      keyword.value = '';
      getUser();
    }


    return{
      list,
      total,
      curPage,
      columns,
      formatTimeStamp,
      remove,
      showAddModal,
      getUser,
      setPage,
      resetPassword,
      keyword,
      onSearch,
      backAll,
      isSearch,
    }
  }
})
