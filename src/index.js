/*
 * @Author: zihao.chen
 * @Date: 2020-09-18 15:16:40
 * @LastEditors: zihao.chen
 * @LastEditTime: 2020-12-22 14:16:32
 * @Description: vue加载
 */

import {initMixin} from './init'
function Vue(options) {
  this._init(options)
}

// 插件形式 对原型拓展
initMixin(Vue)




export default Vue