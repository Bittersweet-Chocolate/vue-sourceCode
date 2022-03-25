/*
 * @Author: czh
 * @Date: 2022-03-20 11:45:01
 * @Description: 
 */
// 多对多的关系，一个属性有一个dep是用来收集watcher的
// dep 可以存多个watcher vm.$watch('name')
// 一个watcher可以有多个dep
let id = 0
class Dep {
  constructor() {
    this.subs = []
    this.id = id++
  }
  depend() {
    // 这里需要watcher存放dep
    Dep.target.addDep(this)
    // this.subs.push(Dep.target)
  }
  notify() {
    this.subs.forEach(wather => wather.update())
  }
}
Dep.target = null
export function pushTarget(watcher) {
  Dep.target = watcher
}
export function popTarget() {
  Dep.target = null
}
export default Dep