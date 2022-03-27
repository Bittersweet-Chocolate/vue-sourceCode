/*
 * @Author: zihao.chen
 * @Date: 2021-03-01 16:43:09
 * @Description: 生命周期
 */

import Watcher from "./observer/watcher"
import { patch } from "./vDom/patch"
export function lifecycleMixin(Vue) {
  Vue.prototype._update = function(vnode) {
    // 一个组件上避免多次更新，使用异步更新
    const vm = this
    // 用新创建的元素，替换掉老的vm.$el
    vm.$el = patch(vm.$el, vnode)
  }
}

export function mountComponent(vm, el) {
  // 获取传递的el，dom节点
  vm.$el = el
  callHook(vm, 'beforeMount')
  // 调用render方法去渲染 el属性
  // 先调用render方法创建虚拟节点，再将虚拟节点渲染到页面上
  // vm._update(vm._render())
  let updateComponent = () => {
    vm._update(vm._render())
  }
  // 这个watcher用于渲染
  let watcher = new Watcher(vm, updateComponent, () => {
    callHook(vm, 'updated')
  }, { user: false })
  // 把属性和watcher绑定在一起
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