<template>
  <div>
    <a-card title="修改密码">
      <a-form style="width:400px" :label-col="{span:8}" :wrapper-col="{span:16}">
        <a-form-item label="新密码">
          <a-input v-model:value="password"/>
        </a-form-item>
        <a-form-item label="确认密码">
          <a-input v-model:value="confirmPassword" />
          <div style="margin-top:32px">
            <a-button type="primary" @click="resetPassword">确认修改</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
