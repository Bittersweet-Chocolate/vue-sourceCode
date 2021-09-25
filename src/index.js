/*
 * @Author: zihao.chen
 * @Date: 2020-09-18 15:16:40
 * @LastEditors: czh
 * @LastEditTime: 2021-09-25 21:47:03
 * @Description: vue加载
 */

import { initMixin } from './init'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from './vDom/index'
import { initGlobalApi } from './global-api/index'

function Vue(options) {
  this._init(options)
}

// 插件形式 对原型拓展
initMixin(Vue) // init方法
lifecycleMixin(Vue) //混合生命周期 渲染
renderMixin(Vue)


initGlobalApi(Vue)


export default Vue