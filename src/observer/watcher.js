/*
 * @Author: czh
 * @Date: 2022-03-20 11:35:21
 * @Description: 
 */
import { pushTarget, popTarget } from './dep'
let id = 0
class Watcher {
  constructor(vm, exprOrFn, cb, options) {
    this.vm = vm
    this.exprOrFn = exprOrFn
    this.cb = cb
    this.options = options
    this.id = id++ //watcher 唯一标识
    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn
    }
    this.get()
  }
  get() {
    pushTarget(this) // 当前watcher实例
    this.getter() // 渲染页面
    popTarget()
  }
  update() {
    this.get() // 重新渲染
  }
}
export default Watcher