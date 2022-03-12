import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 第三方UI库
import Antd, { Modal } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// 全局组件
import SpaceBetween from './components/SpaceBetween/index.vue'
import FlexEnd from './components/FlexEnd/index.vue'
import ConfirmModal from './components/ConfirmModal/index.vue'

// 自定义指令
import { regDirectives } from './helpers/directives';

const app = createApp(App);

// 注册自定义指令
regDirectives(app);

app
.use(store)
.use(router)
.use(Antd)
.component('space-between',SpaceBetween)
.component('flex-end',FlexEnd)
.component('confirm-modal',ConfirmModal)
.mount('#app');
