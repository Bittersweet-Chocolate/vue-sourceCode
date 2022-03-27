/*
 * @Author: czh
 * @Date: 2022-03-20 11:35:21
 * @Description: 
 */
import { pushTarget, popTarget } from './dep'
import { nextTick } from '../utils'
let id = 0
class Watcher {
  // exprOrFn 重新渲染
  // options:true 标识是个渲染watcher
  constructor(vm, exprOrFn, cb, options) {
    this.vm = vm
    this.exprOrFn = exprOrFn
    this.cb = cb
    this.options = options
    this.user = options.user // 用户watcher
    this.id = id++ //watcher 唯一标识
    this.deps = [] // 记录有多少dep依赖当前watcher
    this.depsId = new Set() // set避免放入重复的dep，因为渲染页面可能存在多个相同的属性
    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn
    } else {
      // exprOrFn 可能是一个字符串a
      this.getter = function() {
        let path = exprOrFn.split('.') // 分割设定的变量 obj.a.a
        let obj = vm
        for (let i = 0; i < path.length; i++) {
          obj = obj[path[i]] // vm.obj.a.a
        }
        return obj
      }
    }
    // 默认会先调用一次get方法，进行取值，讲结果保留
    this.value = this.get()
  }
  addDep(dep) {
    if (!this.depsId.has(dep.id)) {
      this.deps.push[dep]
      this.depsId.add(dep.id)
    }
  }
  get() {
    pushTarget(this) // 当前watcher实例
    let res = this.getter()
    popTarget()
    return res
  }
  run() {
    let newValue = this.get() // 重新渲染
    let oldValue = this.value
    this.value = newValue
    if (this.user) {
      console.log(123)
      this.cb.call(this, newValue, oldValue)
    }
  }
  update() {
    // 这里不每次都调用get方法
    queueWatcher(this) // 暂存的概念
  }
}

// 将需要批量更新的watcher，存到一个队列里面
let queue = []
let has = {}
let pending = false

function flushSchedulerQueue() {
  queue.forEach(watcher => {
    watcher.run()
    if (!watcher.user) {
      watcher.cb()
    }
  })
  queue = []
  has = {}
  pending = false
}

function queueWatcher(watcher) {
  const id = watcher.id
  if (!has[id]) {
    queue.push(watcher)
    has[id] = true
    // 等所有的同步代码执行完
    if (!pending) {
      pending = true
      nextTick(flushSchedulerQueue)
    }
  }
}
export default Watcher