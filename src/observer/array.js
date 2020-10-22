// 拿到数组原型的方法
let oldArrayProtMethods = Array.prototype;

// 继承该方法 arrayMethods.__proto__ = oldArrayProtMethods
export let arrayMethods = Object.create(oldArrayProtMethods)
let methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'sort',
  'splice',
  'reverse'
]
methods.forEach(method => {
  arrayMethods[method] = function (...args) {
    // 数组方法被调用了
    const res = oldArrayProtMethods[method].apply(this, args)
    let inserted;
    let ob = this.__ob__
    switch (method) {
      case 'push':
      case 'unshift': //数组添加，或许添加对象类型
        inserted = args
        break;
      case 'splice': //this.$set原理
        inserted = args.slice(2); //数组显示选取的元素。
      default:
        break;
    }
    if (inserted) ob.observeArray(inserted) // 给数组新增
    return res
  }
})