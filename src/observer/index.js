class Observer {
  constructor(value) {
    // denfineProperty 重新定义属性
    this.walk(value)
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
      return value
    },
    set(newValue) {
      if (newValue === value) return
      observe(newValue) //用户将值改为对象继续监控
      value = newValue
    }
  })
}
export function observe(data) {
  if (typeof data !== 'object' && data !== null) {
    return
  }
  return new Observer(data)
}