import { defineComponent } from "vue";

export default defineComponent ({
  setup(){
    const dataSource = [
      {
        name:'小明',
        age:2,
      }
    ];

    const columns = [
      {
        title:'姓名',
        dataIndex:'name',
      },
      {
        title:'年龄',
        dataIndex:'age',
      },
    ];

    return{
      dataSource,
      columns,
    }
  }
})
