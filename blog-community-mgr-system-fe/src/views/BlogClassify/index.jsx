import { defineComponent,ref,onMounted} from "vue";
import {blogClassify} from '@/services'
import {result} from '@/helpers/utils';
import { message,Modal,Input} from "ant-design-vue";

export default defineComponent({
  setup(){
    const columns = [
      {
        title:'博客分类',
        dataIndex:'title',
      },
      {
        title:'操作',
        slots:{
          customRender:'actions',
        },
      },
    ];

    const classify = ref('');
    const list = ref([]);
    const classifyUpdate = ref('');

    // 获取分类列表
    const getBlogClassifyList = async () => {
      const res = await blogClassify.list();

      result(res)
      .success(({data}) => {
        list.value = data;
      })
    }

    onMounted(() => {
      getBlogClassifyList();
    })


    // 添加分类
    const add = async () => {
      const res = await blogClassify.add(classify.value);

      result(res)
      .success(({msg}) => {
        message.success(msg);
        getBlogClassifyList();
      })

      classify.value = '';
    }

    // 删除分类
    const remove = async ({_id}) => {
      const res = await blogClassify.remove(_id);

      result(res)
      .success(({msg}) => {
        message.success(msg);
        getBlogClassifyList();
      })
    }

    // 修改分类
    const updateTitle = async ({_id}) => {
      Modal.confirm({
        title:'请输入新的分类名称',
        content:(
          <div>
            <Input class="__blog_classify_new_title"/>
          </div>
        ),
        onOk:async () => {
          const title = document.querySelector('.__blog_classify_new_title').value;

          const res = await blogClassify.updateTitle(_id,title);

          result(res)
          .success(({msg}) => {
            message.success(msg);

            list.value.forEach((item) => {
              if(item._id === _id){
                item.title = title;
              }
            })
          })
        }
      })
    }


    return{
      classify,
      list,
      columns,
      add,
      remove,
      updateTitle,
    }
  }
})
