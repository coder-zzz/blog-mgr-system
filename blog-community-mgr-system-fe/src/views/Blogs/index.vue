<template>
  <div>
    <a-card>
      <h2>博客列表</h2>

      <a-divider></a-divider>

      <space-between>
        <div class="search">
          <a-input-search placeholder="根据博客名搜索" enter-button/>
        </div>

        <a-button>添加一条</a-button>
      </space-between>

      <a-divider></a-divider>
      
      <a-table :dataSource="dataSource" :columns="columns" />
    </a-card>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import './index.scss';
</style>
