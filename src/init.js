/*
 * @Author: zihao.chen
 * @Date: 2020-09-18 16:02:00
 * @LastEditors: czh
 * @LastEditTime: 2021-09-25 23:00:16
 * @Description: vue 初始化
 */

import { initState } from "./state"

import { compileToFunction } from './compiler/index.js'
import { callHook, mountComponent } from './lifecycle'
import { mergeOptions } from "./utils"

export function initMixin(Vue) {
  // vue 初始化
  Vue.prototype._init = function(options) {
    const vm = this
    // options和全局的options进行合并
    vm.$options = mergeOptions(vm.constructor.options, options)
    callHook(vm, 'beforeCreat')
    // 初始化状态 （初始化劫持数据，改变数据时更新视图）
    initState(vm)
    callHook(vm, 'created')
    // 如果当前有el属性说明要渲染模板
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
  // 挂载操作
  Vue.prototype.$mount = function(el) {
    const vm = this;
    const options = vm.$options
    el = document.querySelector(el)
    // 获取传递的el，dom节点
    vm.$el = el
    if (!vm.$options.render) {
      // 获取当前模板
      let template = options.template;
      if (!template && el) {
        template = el.outerHTML
      }
      // 将模板编译成 render函数
      const render = compileToFunction(template);
      // 绑定render
      options.render = render
    }
    // 渲染时都需要render 方法

    // 挂载当前组件
    mountComponent(vm, el)
  }
}