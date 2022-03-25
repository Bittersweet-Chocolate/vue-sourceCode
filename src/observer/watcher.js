/*
 * @Author: czh
 * @Date: 2022-03-20 11:35:21
 * @Description: 
 */
import { pushTarget, popTarget } from './dep'
let id = 0
class Watcher {
  // exprOrFn 重新渲染
  // options:true 标识是个渲染watcher
  constructor(vm, exprOrFn, cb, options) {
    this.vm = vm
    this.exprOrFn = exprOrFn
    this.cb = cb
    this.options = options
    this.id = id++ //watcher 唯一标识
    this.deps = [] // 记录有多少dep依赖当前watcher
    this.depsId = new Set() // set避免放入重复的dep，因为渲染页面可能存在多个相同的属性
    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn
    }
    this.get()
  }
  addDep(dep){
    if(!this.depsId.has(dep.id)){
      this.deps.push[dep]
      this.depsId.add(dep.id)
    }
  }
  get() {
    pushTarget(this) // 当前watcher实例
    this.getter()
    popTarget()
  }
  update() {
    this.get() // 重新渲染
  }
}
export default Watcher