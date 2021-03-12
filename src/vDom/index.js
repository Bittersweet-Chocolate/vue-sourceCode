/*
 * @Author: zihao.chen
 * @Date: 2021-03-01 16:52:36
 * @LastEditors: zihao.chen
 * @LastEditTime: 2021-03-12 14:45:42
 * @Description: 生成虚拟dom的结构
 */
export function renderMixin(Vue) {
  Vue.prototype._c = function () { //创建虚拟dom元素
    return createElement(...arguments)
  }
  Vue.prototype._s = function (val) { // Stringify
    return val === null ? '' : (typeof val === 'object') ? JSON.stringify(val) : val
  }
  Vue.prototype._v = function (text) { //创建虚拟dom文本元素
    return createTextVnode(text)
  }
  Vue.prototype._render = function () {
    const vm = this
    const render = vm.$options.render
    let vnode = render.call(vm)
    return vnode
  }
}

// _c(div,{},1,2,3)
function createElement(tag, data={},...children) { 
  return vnode(tag,data,data.key,children)
}
function createTextVnode(text) { 
  return vnode(undefined,undefined,undefined,undefined,text)
}

//  生成虚拟dom
function vnode(tag,data,key,children,text) {
  // 可以添加自定义属性
  return {
    tag,
    data,
    key,
    children,
    text
  }
}