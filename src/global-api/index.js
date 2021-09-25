/*
 * @Author: czh
 * @Date: 2021-09-25 21:46:24
 * @LastEditTime: 2021-09-25 22:29:10
 * @LastEditors: czh
 * @Description: 
 */

import { mergeOptions } from "../utils"

export function initGlobalApi(Vue) {
  Vue.options = {}
  Vue.mixin = function(mixin) {
    // 合并用户传入的属性  optins = { created:[a,b,c,d] }
    this.options = mergeOptions(this.options, mixin)
  }
}