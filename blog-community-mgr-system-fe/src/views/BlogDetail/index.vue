<template>
  <div>
    <a-card>
      <space-between>
        <h2>{{detailInfo.title}}</h2>
        <div>
          <a-button size="samll" type="primary" @click="showUpdateModal = true">编辑</a-button>
          &nbsp;
          <a-button size="samll" type="danger" @click="remove">删除</a-button>
        </div>
      </space-between>

      <a-divider></a-divider>

    <div class="base-info">
      <div class="items">
        <div class="item">
          <div class="title">作者</div>
          <div class="content">{{detailInfo.author}}</div>
        </div>
        <div class="item">
          <div class="title">分类</div>
          <div class="content">{{detailInfo.classfiy}}</div>
        </div>
        <div class="item">
          <div class="title">发表时间</div>
          <div class="content">{{formatTimeStamp(detailInfo.publishDate)}}</div>
        </div>
      </div>
    </div>
    </a-card>

    <div class="blog-content">
      <a-card title="博客内容">博客内容</a-card>
    </div>

    <update v-model:show="showUpdateModal" :blog="detailInfo" @update="update"></update>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
