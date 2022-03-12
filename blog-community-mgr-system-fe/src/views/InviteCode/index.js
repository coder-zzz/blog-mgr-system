import { defineComponent,ref,onMounted} from "vue";
import {inviteCode} from '@/services'
import {result,isAction} from '@/helpers/utils';
import { message } from "ant-design-vue";
import store from "../../store";

export default defineComponent({
  setup(){
    const columns = [
      {
        title:'邀请码',
        dataIndex:'code',
      },
      {
        title:'使用状态',
        slots:{
          customRender:'status',
        },
      },
    ];

    const count = ref(1);
    const curPage = ref(1);
    const total = ref(0);
    const list = ref([]);

    // 获取邀请码列表
    const getInviiteCodeList = async () => {
      const res = await inviteCode.list(curPage.value,10);

      result(res)
        .success(({data}) => {
          const {list:l,total:t} = data;
          list.value = l;
          total.value = t;
        })
    }

    onMounted(async () => {
      await isAction(columns);
      getInviiteCodeList();
    })

    // 跳转对应页码
    const setPage = (page) => {
      curPage.value = page;
      getInviiteCodeList();
    }

    // 添加邀请码
    const add = async () => {
      const res = await inviteCode.add(count.value);

      result(res)
      .success(() => {
        message.success(`成功添加 ${count.value} 条邀请码`);
        getInviiteCodeList();
      })
    }

    // 删除邀请码
    const remove = async ({_id}) => {
      const res = await inviteCode.remove(_id);

      result(res)
      .success(({msg}) => {
        message.success(msg);
        getInviiteCodeList();
      })
    }


    return{
      count,
      curPage,
      total,
      list,
      columns,
      setPage,
      add,
      remove,
    }
  }
})
