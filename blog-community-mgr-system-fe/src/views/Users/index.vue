<template>
  <div>
    <a-card>
      <h2>用户管理</h2>

      <a-divider></a-divider>

      <space-between>
        <div class="search">
          <a-input-search v-model:value="keyword" @search="onSearch" placeholder="根据用户账号搜索" enter-button/>
          <a v-if="isSearch" class="back" href="javascript:;" @click="backAll">返回</a>
        </div>

        <a-button @click="showAddModal = true">添加用户</a-button>
      </space-between>

      <a-divider></a-divider>

      <div>
         <a-table bordered :pagination="false" :columns="columns" :data-source="list">
           <template #createdAt="{record}">
             {{ formatTimeStamp(record.meta.createAt)}}
           </template>

           <template #character="{record}">
             <a href="JavaScript:;" @click="onEdit(record)"><FormOutlined/></a>
             &nbsp;
             {{getCharacterInfoById(record.character).title}}
           </template>

           <template #actions="{record}">
             <a href="JavaScript:;" @click="resetPassword(record)">重置密码</a>
             &nbsp;
             <a href="JavaScript:;" @click="remove(record)">删除</a>
           </template>
         </a-table>
         <flex-end style="margin-top:24px">
           <a-pagination v-if="!isSearch" class="pagination" v-model:current="curPage" :total="total" :page-size="5" @change="setPage"></a-pagination>
         </flex-end>
      </div>
    </a-card>

        <add-one v-model:show="showAddModal" @getList="getUser"></add-one>

        <a-modal @ok="updateCharacter" title="修改角色" v-model:visible="showEditCharacterModal">
          <a-select v-model:value="editForm.character" style="width: 220px;">
            <a-select-option v-for="item in characterInfo" :key="item._id" :value="item._id">
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-modal>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
