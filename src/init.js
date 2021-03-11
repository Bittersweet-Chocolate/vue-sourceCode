/*
 * @Author: zihao.chen
 * @Date: 2020-09-18 16:02:00
 * @LastEditors: zihao.chen
 * @LastEditTime: 2021-03-11 16:56:52
 * @Description: vue 初始化
 */

import {
  initState
} from "./state"

import {compileToFunction} from './compiler/index.js'
import {mountComponent} from './lifecycle'

export function initMixin(Vue) {
  // vue 初始化
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options
    // 初始化状态 （初始化劫持数据，改变数据时更新视图）
    // 添加状态
    initState(vm)

    // 如果当前有el属性说明要渲染模板
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
  Vue.prototype.$mount = function (el) {
    // 挂载操作
    const vm = this;
    const options = vm.$options
    el = document.querySelector(el)
    // 获取传递的el，dom节点

    if (!vm.$options.render) {
      // 获取当前模板
      let template = options.template;
      if (!template && el) {
        template = el.outerHTML
      }
      // 将模板编译成 render函数
      const render = compileToFunction(template);
      // 绑定render
      options.render=render
    }
    // 渲染时都需要render 方法

    // 挂载当前组件
    mountComponent(vm,el)
  }
}