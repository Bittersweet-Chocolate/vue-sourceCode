/*
 * @Author: zihao.chen
 * @Date: 2021-01-21 17:12:42
 * @LastEditors: zihao.chen
 * @LastEditTime: 2021-02-03 17:13:12
 * @Description: 根据ast树生成代码
 */
//   <div id="app" class="test">hello{{name}}<span>hello</span><div>
//  render(){
//  return _c('div',{id:'app',class:'test',_v('hello'+_s(name)),_c('span',null,_v('hello')))
// }
// 语法层转义
function genProps(attrs) {
  let str = ''
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i]
    if (attr.name === 'style') { // style需要特殊处理 举例： style="color:red;display:flex"
      let obj = {}
      attr.value.split(';').forEach(item => {
        let [key, value] = item.split(':')
        obj[key] = value
      });
      attr.value = obj
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0,-1)}}`
}

function gen(node){

}

function getChildren(el) {
  const children = el.children
  if (children) { // 所有子元素用，拼接
    return children.map(child=>gen(child)).join(',')
  }
}

export function generate(el) {
  let children = getChildren(el)
  let code = `_c('${el.tag}',${el.attrs.length ? `${genProps(el.attrs)}`:'undefined'}
              ${children ? `,${children}` : '' }
              )}`
  return code
}