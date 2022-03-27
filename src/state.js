/*
 * @Author: zihao.chen
 * @Date: 2020-09-18 16:11:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-26 17:35:01
 * @Description: vue 数据初始化
 */

import { observe } from "./observer/index"
import { nextTick, proxy } from './utils'
export function initState(vm) {
  const opts = vm.$options
  if (opts.props) {
    initProps(vm)
  }
  if (opts.methods) {
    initMethods(vm)
  }
  if (opts.data) {
    initData(vm)
  }
  if (opts.computed) {
    initComputed(vm)
  }
  if (opts.watch) {
    initWatch(vm)
  }
}

function initProps(vm) {}

function initMethods(vm) {}

function initData(vm) {
  let data = vm.$options.data
  vm._data = data = typeof data === 'function' ? data.call(vm) : data
  // 数据劫持方案  object.defineProperty
  // 数组单独处理

  // 代理数据，vm.arr 代理为 vm._data.arr
  for (let key in data) {
    proxy(vm, '_data', key);
  }
  observe(data)
}

function initComputed(vm) {}

function initWatch(vm) {}

export function stateMixin(Vue) {
  Vue.prototype.$nextTick = function(cb) {
    nextTick(cb)
  }
}