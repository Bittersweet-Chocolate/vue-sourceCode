# vue-sourceCode

## vue 更新策略

`vm._update(vm._render())`

- `vue`是以组件为单位，给每个组件都增加了一个`watcher`，属性变化后会重新调用这个`watcher`

## 依赖收集

- 数据劫持的时候，定义`defineProperty`的时候，已经给属性都加上了一个`dep`

1. 先把渲染`watcher`放到`Dep.target`属性上
1. 开始渲染，取值会调用`get`方法，需要让这个属性的`dep`，存储当前的`watcher`
1. 页面上所需要的属性都会将这个`watcher`存在自己的`dep`中
