/*
 * @Author: zihao.chen
 * @Date: 2021-01-21 17:12:42
 * @LastEditors: zihao.chen
 * @LastEditTime: 2021-03-12 10:28:12
 * @Description: 根据ast树生成代码
 */
//   <div id="app" class="test">hello{{name}}<span>hello</span><div>
//  render(){
//  return _c('div',{id:'app',class:'test'},_v('hello'+_s(name)),_c('span',null,_v('hello')))
// }

// vue 中 text-parser的正则
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
const regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g
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

function gen(node) {
  // 判断类型是否走元素生成
  if (node.type === 1) {
    return generate(node) //生成元素节点的字符串
  } else {
    // 文本获取
    let text = node.text
    // 需要考虑 是否普通文本 不带{{}}

    if (!defaultTagRE.test(text)) {
      return `_v(${JSON.stringify(text)})` // _v('hello {{name}}) => _v('hello'+_s(name))
    }
    let tokens = [] // 存放每一段代码
    let lastIndex = defaultTagRE.lastIndex = 0 // 正则匹配会将字符串lastIndex ++
    let match,index
    while (match = defaultTagRE.exec(text)) { // 匹配是否存在{{}} 结果为数组["{{arr}}","arr",index 所在位置下标]
      index = match.index // 保存匹配的索引
      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)))
      }
      tokens.push(`_s(${match[1].trim()})`)
      lastIndex = index+match[0].length
    }
    if(lastIndex < text.length){
      tokens.push(JSON.stringify(text.slice(lastIndex)))
    }
    return `_v(${tokens.join('+')})`
  }
}

function getChildren(el) {
  const children = el.children
  if (children) { // 所有子元素用，拼接
    return children.map(child => gen(child)).join(',')
  }
}

export function generate(el) {
  let children = getChildren(el)
  let code = `_c('${el.tag}',${el.attrs.length ? `${genProps(el.attrs)}`:'undefined'}${children ? `,${children}` : '' })`;
  return code
}