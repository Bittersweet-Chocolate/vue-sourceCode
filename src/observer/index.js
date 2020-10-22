import {
  arrayMethods
} from './array'
class Observer {
  constructor(value) {

    // 判断一个对象有没有被观测过，看有没有__ob__这个属性
    Object.defineProperty(value, '__ob__', {
      enumerable: false, // 设置不可枚举，不能被循环
      configurable: false,
      value: this
    })


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
    let keys = Object.keys(data)
    // 循环监听属性
    keys.forEach(item => {
      defineReactive(data, item, data[item]);
    })
  }
}

function defineReactive(data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
    get() {
      console.log('取值')
      return value
    },
    set(newValue) {
      console.log('设置值')
      if (newValue === value) return
      observe(newValue) //用户将值改为对象继续监控
      value = newValue
    }
  })
}
export function observe(data) {
  if (typeof data !== 'object' && data !== null) {
    return data
  }
  if (data.__ob__) {
    return data
  }
  return new Observer(data)
}