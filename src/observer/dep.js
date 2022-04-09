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
  }
  addSub(watch) {
    this.subs.push(watch)
  }
  notify() {
    // 这里有一个问题，视图更新，重新触发defineproperty的get会重新执行depend
    this.subs.forEach(wather => wather.update())
  }
}
Dep.target = null
let satck = []
export function pushTarget(watcher) {
  Dep.target = watcher
  satck.push(watcher)
  console.log(satck)
}
export function popTarget() {
  satck.pop()
  Dep.target = satck[satck.length - 1]
}
export default Dep