/*
 * @Author: zihao.chen
 * @Date: 2020-09-18 15:16:40
 * @LastEditors: zihao.chen
 * @LastEditTime: 2021-03-02 15:54:50
 * @Description: vue加载
 */

import {initMixin} from './init'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from './vDom/index'
function Vue(options) {
  this._init(options)
}

// 插件形式 对原型拓展
initMixin(Vue)
lifecycleMixin(Vue) //混合生命周期 渲染
renderMixin(Vue)




export default Vue