<template>
  <div>
    <a-modal :visible="props.show" title="添加一个用户" @ok="submit" @cancel="close">
      <a-form :label-col="{span:6}" :wrapper-col="{span:12}">
        <!-- //博客标题
        title:String,
        // 作者
        author:String,
        // 发表日期
        publishDate:String,
        // 分类
        classfiy:String, -->
        <a-form-item label="账号">
          <a-input v-model:value="addForm.account" />
        </a-form-item>

        <a-form-item label="密码">
          <a-input v-model:value="addForm.password" />
        </a-form-item>

        <a-form-item label="角色">
          <a-select v-model:value="addForm.character">
            <a-select-option v-for="item in characterInfo" :key="item._id" :value="item._id">
              {{ item.title }}
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
