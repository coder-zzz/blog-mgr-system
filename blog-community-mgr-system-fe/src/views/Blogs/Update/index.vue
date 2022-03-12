<template>
  <div>
    <a-modal :visible="props.show" title="添加博客" @ok="submit" @cancel="close">
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
          <a-input v-model:value="editForm.title" />
        </a-form-item>
        <a-form-item label="作者">
          <a-input v-model:value="editForm.author" />
        </a-form-item>
        <a-form-item label="发表日期">
            <a-date-picker v-model:value="editForm.publishDate"/>
        </a-form-item>
        <a-form-item label="分类">
          <a-select v-model:value="editForm.classfiy">
            <a-select-option
              v-for="item in store.blogClassify"
              :key="item._id"
              :value="item.title"
            >
              {{item.title}}
            </a-select-option>
          </a-select>
        </a-form-item>
        </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import './index.scss';
</style>
