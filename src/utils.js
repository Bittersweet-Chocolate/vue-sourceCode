/*
 * @Author: zihao.chen
 * @Date: 2020-12-23 14:31:00
 * @LastEditors: czh
 * @LastEditTime: 2021-09-25 22:52:26
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
export function defineProperty(target, key, value) {
  // value.__ob__ = this 会无限递归
  Object.defineProperty(value, '__ob__', {
    enumerable: false, // 设置不可枚举，不能被循环，this.work就循环不到该属性
    configurable: false,
    value: this
  })
}

export const LIFECYCLE_HOOKS = [
  'beforeCreated',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
]

// 策略模式
const strats = {
  data(parentVal, childVal) {
    return childVal || parentVal
  },
  watch() {},
  computed() {}
}

function mergeHook(parentVal, childVal) {
  let val = parentVal
  if (childVal) {
    // 子级 && 父级 合并
    // 子级有，父级没有，返回子级
    val = parentVal ? parentVal.concat(childVal) : [childVal]
  }
  // 子级没有默认返回父级
  return val
}
LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})
// 默认合并
const defaultStrat = function(parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal
}
export function mergeOptions(parent, child) {
  const options = {}
  // 合并字段
  function mergeField(key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key])
  }
  //  遍历父级，处理父子都有的
  for (let key in parent) {
    console.log('1', key)
    mergeField(key)
  }
  // 遍历子级，处理仅子级有的
  for (let key in child) {
    if (!parent.hasOwnProperty(key)) {
      console.log('2', key)
      mergeField(key)
    }
  }
  console.log(options)
  return options
}