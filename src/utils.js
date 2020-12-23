/*
 * @Author: zihao.chen
 * @Date: 2020-12-23 14:31:00
 * @LastEditors: zihao.chen
 * @LastEditTime: 2020-12-23 14:44:30
 * @Description: 
 */

// 设置代理方便取值
 export function proxy(vm, data, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[data][key]
    },
    set(newValue) {
      vm[data][key] = newValue
    }
  })
}

// 判断一个对象有没有被观测过，看有没有__ob__这个属性
export function defineProperty(target,key,value){
    // value.__ob__ = this 会无限递归
    Object.defineProperty(value, '__ob__', {
      enumerable: false, // 设置不可枚举，不能被循环，this.work就循环不到该属性
      configurable: false,
      value: this
    })
}