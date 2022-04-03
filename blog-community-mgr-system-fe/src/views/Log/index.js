import { defineComponent,ref,onMounted} from "vue";
import {log} from '@/services';
import {result,formatTimeStamp,isAction} from '@/helpers/utils';
import { getLogInfoByPath } from "../../helpers/log";
import {message} from 'ant-design-vue'

// const columns = [
//   {
//     title:'用户名',
//     dataIndex:'user.account',
//   },
//   {
//     title:'动作',
//     dataIndex:'action',
//   },
//   {
//     title:'记录时间',
//     slots:{
//       customRender:'createdAt',
//     },
//   },
// ];

export default defineComponent({
  setup(){
    const columns = [
      {
        title:'用户名',
        dataIndex:'user.account',
      },
      {
        title:'动作',
        dataIndex:'action',
      },
      {
        title:'记录时间',
        slots:{
          customRender:'createdAt',
        },
      },
    ];

    const curPage = ref(1);
    const total = ref(0);
    const list = ref([]);
    const loading = ref(true);

    const getLogList = async () => {
      const res = await log.list(curPage.value,10);
      loading.value = false;

      result(res)
        .success(({data:{list:l,total:t}}) => {
          l.forEach((item) => {
            item.action = getLogInfoByPath(item.request.url);
          })

          list.value = l;
          total.value = t;
        })
    }

    onMounted(async () => {
      // 根据用户角色判断能否有操作功能
      await isAction(columns);
      getLogList();
    })

    const setPage = (page) => {
      curPage.value = page;
      getLogList();
    }

    const remove = async ({_id}) => {
      const res = await log.remove(_id);

      result(res)
        .success(({msg}) => {
          message.success(msg);
          getLogList();
        })
    }

    return{
      columns,
      curPage,
      list,
      total,
      setPage,
      loading,
      formatTimeStamp,
      remove,
    }
  }
})
