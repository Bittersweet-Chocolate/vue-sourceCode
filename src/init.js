export function initMixin(Vue) {
  // vue 初始化
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options
    console.log(options)
  }
}