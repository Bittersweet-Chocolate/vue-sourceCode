import {initMixin} from './init'
function Vue(options) {
  this._init(options)
}

// 插件形式 对原型拓展
initMixin(Vue)




export default Vue