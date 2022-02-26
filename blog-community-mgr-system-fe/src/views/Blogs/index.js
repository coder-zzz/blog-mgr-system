import { defineComponent,ref,onMounted} from "vue";
import { useRouter } from "vue-router";
import { blog } from "../../services";
import { result,formatTimeStamp} from "../../helpers/utils";
import AddOne from "./AddOne/index.vue";
import Update from "./Update/index.vue";
import { message } from "ant-design-vue";

export default defineComponent ({
  components:{
    AddOne,
    Update,
  },
  setup(){
    const router = useRouter();

    const columns = [
      {
        title:'博客标题',
        dataIndex:'title',
      },
      {
        title:'作者',
        dataIndex:'author',
      },
      {
        title:'发表日期',
        dataIndex:'publishDate',
        slots:{
          customRender:'publishDate',
        },
      },
      {
        title:'分类',
        dataIndex:'classfiy',
      },
      {
        title:'操作',
        slots:{
          customRender:'actions',
        },
      },
    ];

    const show = ref(false);
    const showUpdateModal = ref(false);
    const list = ref([]);
    const total = ref(0);
    const curPage = ref(1);
    const keyword = ref('');
    const isSearch = ref(false);
    const curEditBlog = ref({});

    // 获取博客列表
    const getList = async () => {
      const res = await blog.list(
        {
          page:curPage.value,
          size:5,
          keyword:keyword.value,
        }
      );

      result(res)
      .success(({data}) => {
        const {list:l,total:t} = data;
        list.value = l;
        total.value = t;
      })
    }

    onMounted(async () => {
      getList()
    })

    // 设置页码、切页
    const setPage = (page) => {
      curPage.value = page;
      getList();
    }

    //搜索指定博客
    const onSearch = () => {
      getList();

      // 当其他类型的变量赋值给Boolean类型的变量时会做隐式转换，
      // 如果有值则为真，没有值就为假
      isSearch.value = keyword.value;
    }

    // 返回全部博客列表
    const backAll = () => {
      keyword.value = '';
      getList();
      isSearch.value = false;
    }

    //删除一条博客记录
    const remove = async ({text : record}) => {
      console.log(record);
      const {_id} = record;

      const res = await blog.remove(_id);

      result(res)
      .success(({msg}) => {
        message.success(msg);
      })

      // 纯前端删除，不会发起http请求，不会删除数据库里的博客记录
      // const idx = list.value.findIndex((item) => {
      //   return item._id = _id;
      // })

      // list.value.splice(idx,1);

      //会发起http请求，同时会删除数据库里相应的博客记录
      getList();
    }

    // 显示修改模态框
    const update = (({record}) => {
      showUpdateModal.value = true;
      curEditBlog.value = record;
    })

    // 显示列表的某一行数据
    const updateCurBlog = (newData) => {
      Object.assign(curEditBlog.value,newData);
    }

    // 进入博客详情页
    const toDetail = ({record}) => {
      router.push(`/blogs/${record._id}`);
    }

    return{
      columns,
      show,
      list,
      formatTimeStamp,
      curPage,
      total,
      setPage,
      keyword,
      onSearch,
      backAll,
      isSearch,
      remove,
      showUpdateModal,
      update,
      curEditBlog,
      updateCurBlog,
      toDetail,
    }
  }
})
