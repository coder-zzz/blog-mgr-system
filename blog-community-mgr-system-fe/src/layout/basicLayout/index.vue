<template>
  <div class="basic-layout">
    <div class="app-header">
      <div class="left">
        <img src="../../assets/img/logo.png" alt="">
        <div class="title">博客社区信息管理系统</div>
      </div>
      <div class="right">
        <div class="hello-msg">你好,{{userName}}</div>
        <div class="logout" @click="show = true">退出</div>
      </div>
    </div>
    <div class="app-header-placeholder"></div>
    <div class="app-content">
      <div class="left">
        <app-nav></app-nav>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>

<!--  -->
  <confirm-modal :show="show" @close="close" @logout="logout">
    <p>确认退出</p>
  </confirm-modal>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
