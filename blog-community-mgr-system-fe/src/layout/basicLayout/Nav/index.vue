<template>
  <div>
    <a-menu
      style="width:100%"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      v-for="(item,index) in menu"
      :key="index.url"
      v-only-superAdmin="item.onlySuperAdmin"
    >
      <a-sub-menu v-if="item.children" :key="item.title">
        <template #title>{{item.title}}</template>
        <a-menu-item-group style="background-color:white">
          <a-menu-item
            v-for="children in item.children"
            :key="children.url"
            @click="to(children.url)"
          >
            {{children.title}}
          </a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-menu-item @click="to(item.url)" :key="item.url" v-else>{{item.title}}</a-menu-item>
    </a-menu>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import './index.scss';
</style>
