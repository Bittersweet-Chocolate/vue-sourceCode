/*
 * @Author: zihao.chen
 * @Date: 2021-01-21 16:49:20
 * @LastEditors: zihao.chen
 * @LastEditTime: 2021-01-21 17:13:22
 * @Description: 转化ast树
 */
const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
//  vue 中 html-parser的正则
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/ // 匹配属性
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*` // 标签名
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`) // 标签开头的正则 捕获标签名
const startTagClose = /^\s*(\/?)>/ // 匹配标签结束的 /> <br/>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i
// #7298: escape - to avoid being passed as HTML comment when inlined in page
const comment = /^<!\--/
const conditionalComment = /^<!\[/

// vue 中 text-parser的正则
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
const regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g

let root;
let currentParent;
let stack = [] // 校验标签是否正确  

export function parseHTML(html) {

  function createASTElement(tag, attrs) {
    return {
      tag, // 标签名
      type: 1, // 元素类型
      attrs, //属性集合
      children: [],
      parent: null
    }
  }

  function start(tagName, attrs) {
    // console.log('开始标签',tagName, attrs)
    let element = createASTElement(tagName, attrs)
    if (!root) {
      root = element
    }
    currentParent = element // 存储当前解析的标签
    stack.push(element)
  }

  function end(tagName) {
    let element = stack.pop() // 取出栈中的最后一个
    currentParent = stack[stack.length - 1]
    if (currentParent) { // 标签闭合，添加标签的父亲
      element.parent = currentParent
      currentParent.children.push(element)
    }
    // console.log('结束标签：', tagName)
  }

  function chars(text) {
    if (text.trim()) {
      currentParent.children.push({
        type: 3, // 文本类型
        text
      })
    }
  }

  //  删除每次解析后的html
  function advance(n) {
    html = html.substring(n)
  }

  function parseStartTag() {
    const start = html.match(startTagOpen)
    if (start) {
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length) // 删除开始标签
      // 获取属性 
      //  html.match(startTagClose) 需要判断是否存在闭合标签  即 <br/>
      //  html.match(attribute) 是否为结尾标签，并且能匹配到属性
      let end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        let value = attr[3] || attr[4] || attr[5]
        match.attrs.push({
          name: attr[1],
          value
        })
        advance(attr[0].length)
      }
      if (end) { // >
        advance(end[0].length)
        return match
      }
    }
  }

  // 解析html
  while (html) {
    let textEnd = html.indexOf('<')
    if (textEnd === 0) {
      // console.log('开始解析标签')
      const startTagMatch = parseStartTag() //开始标签匹配的结果
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs)
        continue
      }
      // 处理结束标签
      const endTagMatch = html.match(endTag)
      if (endTagMatch) {
        advance(endTagMatch[0].length)
        end(endTagMatch[1])
        continue
      }
    }
    let text;
    // 处理完标签后，查看文本
    if (textEnd >= 0) {
      text = html.substring(0, textEnd)
    }
    // 处理文本内容
    if (text) {
      advance(text.length)
      chars(text)
    }
  }

  return root
}