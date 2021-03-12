/*
 * @Author: zihao.chen
 * @Date: 2021-01-14 14:41:12
 * @LastEditors: zihao.chen
 * @LastEditTime: 2021-03-12 09:47:59
 * @Description: 编译html
 */
import { parseHTML } from './parse'
import { generate } from './generate'
export function compileToFunction(template) {
  // html模板->ast语法树，即ast描述语言本书
  // 虚拟dom 是用对象描述 dom节点
  let ast = parseHTML(template)

  // 2.优化静态节点

  // 3.ast数重新生成代码 
  // 类似 render函数中return的代码
  let code = generate(ast)

  // 将字符串转成函数 限制取值范围，通过with取值，调用render函数，改变this让函数内部取到结果
  let render = new Function(`with(this){ return ${code}}`)
  
  return render
}