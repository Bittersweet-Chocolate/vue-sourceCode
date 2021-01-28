/*
 * @Author: zihao.chen
 * @Date: 2021-01-14 14:41:12
 * @LastEditors: zihao.chen
 * @LastEditTime: 2021-01-21 17:13:42
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
  let code = generate(ast)
  return ast
}