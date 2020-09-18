import { initState } from "./state"

export function initMixin(Vue) {
  // vue 初始化
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options
    // 初始化状态 （初始化劫持数据，改变数据时更新视图）
    // 添加状态
    initState(vm)
    console.log(options)
  }
}