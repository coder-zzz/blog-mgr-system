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
      <a-card>
        <space-between>
          <h3>博客内容</h3>
          <div>
            <a-button size="samll" type="primary" @click="editContent">编辑</a-button>
          </div>
        </space-between>
        <a-divider></a-divider>
        <mavon-editor
          class="mavon-editor"
          v-model="detailInfo.content"
          :subfield="subfield"
          :defaultOpen="defaultOpen"
          :toolbarsFlag="toolbarsFlag"
          :editable="editable"
          :scrollStyle="true"
        >
       </mavon-editor>
       <div class="save">
         <a-button size="samll" type="primary" @click="save" v-show="subfield">保存</a-button>
       </div>
      </a-card>
    </div>
    <update v-model:show="showUpdateModal" :blog="detailInfo" @update="update"></update>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
