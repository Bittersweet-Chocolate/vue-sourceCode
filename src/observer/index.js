/*
 * @Author: zihao.chen
 * @Date: 2020-09-18 16:23:04
 * @Description: vue 观察属性，拦截对象
 */

import { arrayMethods } from './array'
import { defineProperty } from '../utils'
import Dep from './dep'

// 封装 继承
class Observer {
  constructor(value) {
    this.dep = new Dep()
    defineProperty(value, '__ob__', this)

    if (Array.isArray(value)) {
      // 函数劫持、切片编程
      value.__proto__ = arrayMethods
      // 观测数组中的对象类型，对象变化也需要观测
      this.observeArray(value)
      return
    }
    // denfineProperty 重新定义属性
    this.walk(value)
  }
  observeArray(value) {
    value.forEach(item => {
      observe(item)
    });
  }
  walk(data) {
    let keys = Object.keys(data) //拿到最外层的key
    // 循环监听属性
    keys.forEach(item => {
      defineReactive(data, item, data[item]);
    })
  }
}

function defineReactive(data, key, value) {
  // 获取到数组的dep
  let childDep = observe(value) // 如果值是对象类型继续观测,递归代理
  let dep = new Dep() // 每一个属性都有一个dep
  // 当页面取值时，说明这个值用来渲染了
  Object.defineProperty(data, key, {
    get() {
      // 依赖收集
      if (Dep.target) {
        dep.depend()
        if(childDep){
          childDep.dep.depend() // 给最外层存一个，方便后续数组处理，存储这个渲染watcher
        }
      }
      return value
    },
    set(newValue) {
      if (newValue === value) return
      observe(newValue) //用户将值改为对象继续监控
      value = newValue
      // 依赖更新
      dep.notify()
    }
  })
}
export function observe(data) {
  if (typeof data !== 'object' || data === null) {
    return data
  }
  if (data.__ob__) {
    return data
  }
  return new Observer(data)
}