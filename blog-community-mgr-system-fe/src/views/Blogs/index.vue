<template>
  <div>
    <a-card>
      <h2>博客列表</h2>

      <a-divider></a-divider>

      <space-between>
        <div class="search">
          <a-input-search v-model:value="keyword" @search="onSearch" placeholder="根据博客标题搜索" enter-button/>
          <a v-if="isSearch" class="back" href="javascript:;" @click="backAll">返回</a>
        </div>

        <a-button @click="show = true">添加一条</a-button>
      </space-between>

      <a-divider></a-divider>

      <a-table :columns="columns" :dataSource="list" :pagination="false">
        <template #publishDate="data">
          {{formatTimeStamp(data.record.publishDate)}}
        </template>
        <template #actions="record">
          <a href="javascript:;" @click="update(record)">修改</a>
          &nbsp;
          <a href="javascript:;" @click="remove(record)">删除</a>
        </template>
      </a-table>

      <space-between>
        <div></div>
        <a-pagination class="pagination" v-model:current="curPage" :total="total" :page-size="5" @change="setPage"></a-pagination>
      </space-between>
    </a-card>

    <add-one v-model:show="show"></add-one>
    <update v-model:show="showUpdateModal" :blog="curEditBlog" @update="updateCurBlog"></update>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import './index.scss';
</style>
