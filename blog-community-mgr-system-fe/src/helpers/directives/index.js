import { isSuperAdmin } from "../character";

// 注册自定义指令
export const regDirectives = (app) => {
  // directive方法的第一个参数是自定义指令名字，第二个参数是调用指令的回调函数，里面包含一些配置项
  app.directive('only-superAdmin',{
    // 当前元素父组件被挂载的时候调用会mounted
    // el参数是当前绑定的dom元素
    // value是从mounted的参数binding中解构出来的值，value值是自定义指令使用是传递过来的参数
    mounted(el,{value = true}){
      // 判断当前用户是否是超级管理员
      const res = isSuperAdmin();

      if(!res && value){
        // 不是超级管理员时隐藏某些功能
        el.style.display = 'none';
      }
    }
  })
}

