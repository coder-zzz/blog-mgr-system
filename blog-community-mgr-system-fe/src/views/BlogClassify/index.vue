<template>
  <div>
    <a-card title="分类管理">
      <a-input style="width:200px; margin-right:10px" placeholder="添加新分类" v-model:value="classify"></a-input>

      <a-button type="primary" @click="add">添加</a-button>

      <a-divider></a-divider>

      <div>
        <a-table
          bordered
          :pagination="false"
          :columns="columns"
          :data-source="list"
        >

          <template #actions="{record}">
            <a href="javascript:;" @click="updateTitle(record)">修改</a>
            &nbsp;
            <a href="JavaScript:;" @click="remove(record)">删除</a>
          </template>
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<script src="./index.jsx"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
