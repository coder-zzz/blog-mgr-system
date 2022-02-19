<template>
  <div class="auth">
    <div class="bg"></div>
    <div class="titie-info">
      <div class="logo">
        <img src="../../assets/img/logo.png" alt="">
      </div>
      <h2 class="title">博客信息后台管理系统</h2>
    </div>

    <div class="form">
      <a-tabs>
        <a-tab-pane key="1" tab="登录">
          <div class="item">
            <a-input v-model:value="loginForm.account" size="large" placeholder="账号">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a-input v-model:value="loginForm.password" size="large" placeholder="密码">
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input>
          </div>

          <div class="item forget">
            <a href="">忘记密码</a>
          </div>

          <div class="item">
            <a-button @click="login" size="large" type="primary">登录</a-button>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="注册">
          <div class="item">
            <a-input v-model:value="regForm.account" size="large" placeholder="账号">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a-input v-model:value="regForm.password" size="large" placeholder="密码">
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a-input v-model:value="regForm.inviteCode" size="large" placeholder="邀请码(选填)">
              <template #prefix>
                <GiftOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            <a-button @click="register" size="large" type="primary">注册</a-button>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scpoed>
 @import './index.scss'
</style>
