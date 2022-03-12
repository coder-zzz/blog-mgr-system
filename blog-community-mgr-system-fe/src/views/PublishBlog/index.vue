<template>
  <div>
    <a-card title="发表博客">
      <a-form :label-col="{span:6}" :wrapper-col="{span:12}">
        <!-- //博客标题
        title:String,
        // 作者
        author:String,
        // 发表日期
        publishDate:String,
        // 分类
        classfiy:String, -->
        <a-form-item label="博客标题">
          <a-input v-model:value="addForm.title" />
        </a-form-item>
        <a-form-item label="作者">
          <a-input v-model:value="addForm.author" />
        </a-form-item>
        <a-form-item label="发布日期">
            <a-date-picker v-model:value="addForm.publishDate"/>
        </a-form-item>
        <a-form-item label="分类">
          <a-select v-model:value="addForm.classfiy">
            <a-select-option
              v-for="item in store.state.blogClassify"
              :key="item._id"
              :value="item.title"
            >
              {{item.title}}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
        <a-divider></a-divider>
        <h3>内容</h3>
      <mavon-editor class="mavon-editor" v-model="addForm.content" @change="getContent"></mavon-editor>

      <div class="publish">
        <a-button type="primary" @click="publish">发布</a-button>
      </div>
    </a-card>
 </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
