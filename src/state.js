/*
 * @Author: zihao.chen
 * @Date: 2020-09-18 16:11:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-27 16:00:17
 * @Description: vue 数据初始化
 */

import Dep from "./observer/dep"
import { observe } from "./observer/index"
import Watcher from "./observer/watcher"
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

function initComputed(vm) {
  let computed = vm.$options.computed
  // 1.需要又watcher 2.需要defineProperty 3.dirty
  // 存放计算属性的watcher
  const watchers = vm._computedWatchers = {}
  for (let key in computed) {
    const useDef = computed[key]
    // watcher使用
    const getter =
      typeof useDef === 'function' ? useDef : useDef.get;
    // lazy 默认不执行
    watchers[key] = new Watcher(vm, getter, () => {}, { lazy: true })
    defineComputed(vm, key, useDef)
  }
}

function defineComputed(target, key, useDef) {
  const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get() {},
    set() {}
  }
  if (typeof useDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key)
  } else {
    // 需要加缓存
    sharedPropertyDefinition.get = createComputedGetter(key)
    sharedPropertyDefinition.set = useDef.set
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

function createComputedGetter(key) {
  // 包装的方法给计算属性
  return function() {
    // 拿到这个属性对应的watcher
    const watcher = this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) { // 判断要不要执行用户传递的方法
        console.log('我执行了')
        watcher.evaluate()
      }
      // 证明又渲染watcher
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value // 默认返回wacher上的值
    }
  }
}


function initWatch(vm) {
  let watch = vm.$options.watch
  for (let key in watch) {
    const handler = watch[key] // handler 可能是数组、对象、字符串、函数
    if (Array.isArray(handler)) {
      handler.forEach(handle => createWatcher(vm, key, handle))
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

/**
 * 描述
 * @author czh
 * @date 2022-03-27
 * @param {any} vm
 * @param {any} exprOrFn
 * @param {any} handler
 * @param {any} options 用来表示是否用户定义的
 * @returns {any}
 */
function createWatcher(vm, exprOrFn, handler, options = {}) {
  if (typeof handler === 'object' && handler !== null) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler] // 实例的方法作为handler
  }
  return vm.$watch(exprOrFn, handler, options)
}

export function stateMixin(Vue) {
  Vue.prototype.$nextTick = function(cb) {
    nextTick(cb)
  }
  Vue.prototype.$watch = function(exprOrFn, cb, options) {
    // 数据依赖这个watcher，数据变化后应该让wathcer从新执行
    let watcher = new Watcher(this, exprOrFn, cb, { ...options, user: true })
    if (options.immediate) {
      cb()
    }
  }
}