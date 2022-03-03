<template>
  <div>
    <a-spin :spinning="loading">
      <a-card>
      <h2>操作日志</h2>

      <a-divider></a-divider>

      <div>
        <a-table
          bordered
          :data-source="list"
          :columns="columns"
          :pagination="false"
        >
          <template #createdAt="{record}">
            {{formatTimeStamp(record.meta.createAt)}}
          </template>

          <template #actions="{record}">
            <a href="JavaScript:;" @click="remove(record)">删除</a>
          </template>
        </a-table>
      </div>

    <flex-end style="margin-top:24px">
      <a-pagination
        v-model:current="curPage"
        :pagesize="10"
        :total="total"
        @change="setPage"
      ></a-pagination>
    </flex-end>
    </a-card>
    </a-spin>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
