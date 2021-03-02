/*
 * @Author: zihao.chen
 * @Date: 2020-09-18 15:16:40
 * @LastEditors: zihao.chen
 * @LastEditTime: 2021-03-01 16:57:29
 * @Description: vue加载
 */

import {initMixin} from './init'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from './vnode/index'
function Vue(options) {
  this._init(options)
}

// 插件形式 对原型拓展
initMixin(Vue)
lifecycleMixin(Vue) //混合生命周期 渲染
renderMixin(Vue)




export default Vue