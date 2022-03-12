<template>
  <div>
    <a-card title="邀请码列表">
      <div v-only-superAdmin>
        <a-input-number v-model:value="count" :min="1" :max="20" />
        &nbsp;
        <a-button type="primary" @click="add(count)">添加邀请码</a-button>
      </div>

      <a-divider v-only-superAdmin></a-divider>

      <div>
        <a-table
          bordered
          :columns="columns"
          :data-source="list"
          :pagination="false"
        >
          <template #status="{record}">
            {{record.user?'已使用':'未使用'}}
          </template>
          <template #actions="{record}">
            <a-button type="danger" :size="small" @click="remove(record)">删除</a-button>
          </template>
        </a-table>
      </div>

      <flex-end style="margin-top:24px">
        <a-pagination :current="curPage" :total="total" :page-size="10" @change="setPage"></a-pagination>
      </flex-end>
    </a-card>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
