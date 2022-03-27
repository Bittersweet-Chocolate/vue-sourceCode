/*
 * @Author: zihao.chen
 * @Date: 2020-09-18 15:16:40
 * @Description: vue加载
 */

import { initMixin } from './init'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from './vDom/index'
import { initGlobalApi } from './global-api/index'
import { stateMixin } from './state'

function Vue(options) {
  this._init(options)
}

// 插件形式 对原型拓展
initMixin(Vue) // init方法
lifecycleMixin(Vue) //混合生命周期 渲染
renderMixin(Vue)
stateMixin(Vue)

initGlobalApi(Vue)


export default Vue