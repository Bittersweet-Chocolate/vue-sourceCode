(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function initMixin(Vue) {
    // vue 初始化
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options;
      console.log(options);
    };
  }

  function Vue(options) {
    this._init(options);
  } // 插件形式 对原型拓展


  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
