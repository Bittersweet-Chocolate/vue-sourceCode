<!--
 * @Author: zihao.chen
 * @Description: 
-->
# vue-sourceCode

- `vue`的初始化都会执行`_init`方法。将用户的属性存放在`vm.$options`上
- `lifecycleMixin`主要是更新`update`

1. `vue`的初始化都会执行`_init`方法。将用户的属性存放在`vm.$options`上。首先合并options，将各个对象合并成数组，方便之前依次执行。

1. 执行`beforeCreate`阶段，`initState`初始化状态，看合并之后的对象存在哪些属性。例如有`data`，则执行`initData`对data里面的数据进行劫持等等。

1. 观测数据使用`object.defineProperty`进行数据劫持
   1. 如果`data`为非对象||`null`则直接返回，如果这个对象被观测过，则也直接返回。观测标识`data.__ob__`
   1. `Observer`中去劫持对象，判断`data`类型数组还是对象。
      - 数组采用的是继承数组的原型链，重写数组一些会改变原数组的方法。比如`push/splice/pop/shift`，在对数组中的值进行观测。但是普通类型不做观测。当操作完数组之后，在进行`observeArray`进行观测。
      - 对象则直接`get`，`set`。使用递归观测每一层对象

1. 通过`object.defineProperty`劫持的时候，在`get`阶段会进行依赖收集，实例化一个`dep`类，并且在`dep`上绑定一个`target`用于判断当前属性是否存在`watcher`。如果有的话则，直接插入到`dep`类的数组中去，在数据的`set`阶段去执行依赖更新的操作，即通过`dep`类中`subs`数组存储的`watcher`依次执行更新方法。

1. 执行`created`方法，判断当前`options`上是否存在`el`，则进行挂载操作，通过`el`找到节点，同时判断当前`options`对象是否存在`render`，如果没有，则取`el.outerHTML`，将节点编译成`render`函数。

1. `render`函数过程
## vue 更新策略

`vm._update(vm._render())`
- 一个组件一个`watcher`
- `vue`是以组件为单位，给每个组件都增加了一个`watcher`，属性变化后会重新调用这个`watcher`

## 依赖收集

- 数据劫持的时候，定义`defineProperty`的时候，已经给属性都加上了一个`dep`

1. 先把渲染`watcher`放到`Dep.target`属性上
1. 开始渲染，取值会调用`get`方法，需要让这个属性的`dep`，存储当前的`watcher`
1. 页面上所需要的属性都会将这个`watcher`存在自己的`dep`中


dep 可以有多个watcher。比如渲染watcher、vm.$watcher
watcher 可以对应多个dep，一个组件上有多个属性，每个属性都有一个dep。所以一个watcher有多个dep

把属性和watcher绑定在一起，这样watcher上的更新方法才会随属性变化而更新页面。从而引入dep类。每个属性都有一个dep。
页面取值的时候，就进行watcher的收集。重新设定set值的时候就进行watcher的循环更新。
watcher中存有dep，dep中也存有watcher

_render 调用 vm上的render函数过程，将传入的html先转换成ast语法树，然后解析ast语法生成用于解析的`new Function`，然后将解析过后的代码重新生成ast语法树，在由_update进行重新生成dom节点插入到页面绑的el中去