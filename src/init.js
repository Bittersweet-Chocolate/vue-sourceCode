/*
 * @Author: zihao.chen
 * @Date: 2020-09-18 16:02:00
 * @LastEditors: zihao.chen
 * @LastEditTime: 2020-12-25 09:50:56
 * @Description: vue 初始化
 */

import { initState } from "./state"

export function initMixin(Vue) {
  // vue 初始化
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options
    // 初始化状态 （初始化劫持数据，改变数据时更新视图）
    // 添加状态
    initState(vm)
    
    // 如果当前有el属性说明要渲染模板
    if(vm.$options.el){
        vm.$mount(vm.$options.el)
    }
  }
  Vue.prototype.$mount = function (el) { 
    // 挂载操作
    const vm = this;
    const vm = this;
    el = document.querySelector(el)
    console.log(el)

    if(vm.$options.render){
      
    }
  }
}