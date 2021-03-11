/*
 * @Author: zihao.chen
 * @Date: 2021-03-01 16:52:36
 * @LastEditors: zihao.chen
 * @LastEditTime: 2021-03-11 17:30:01
 * @Description: 
 */
export function renderMixin(Vue) {
  Vue.prototype._c = function () { //创建元素
    return createElement(...arguments)
  }
  Vue.prototype._v = function (val) { // Stringify
    return val === null ? '' : (typeof val === 'object') ? JSON.stringify(val) : val
  }
  Vue.prototype._s = function (text) { //创建虚拟dom文本元素
    return createTextVnode(text)
  }
  Vue.prototype._render = function () {
    const vm = this
    const render = vm.$options.render
    console.log(render)
    let vnode = render.call(vm)
    return vnode
  }
}

function createElement() { console.log(arguments) }
function createTextVnode(text) { console.log(text,'****') }