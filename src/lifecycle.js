/*
 * @Author: zihao.chen
 * @Date: 2021-03-01 16:43:09
 * @LastEditors: czh
 * @LastEditTime: 2021-09-25 22:59:50
 * @Description: 生命周期
 */

import { patch } from "./vDom/patch"
export function lifecycleMixin(Vue) {
  Vue.prototype._update = function(vnode) {
    const vm = this
    patch(vm.$el, vnode)
  }
}

export function mountComponent(vm, el) {
  callHook(vm, 'beforeMount')
  // 调用render方法去渲染 el属性
  // 先调用render方法创建虚拟节点，再将虚拟节点渲染到页面上
  vm._update(vm._render())
  callHook(vm, 'mounted')
}

export function callHook(vm, hook) {
  const handlers = vm.$options[hook]
  if (handlers) {
    handlers.forEach(item => {
      item.call(vm) // 执行 hanlers中的 [creared1,creared2....]
    })
  }
}