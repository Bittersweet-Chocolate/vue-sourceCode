/*
 * @Author: zihao.chen
 * @Date: 2021-03-12 14:42:25
 * @LastEditors: zihao.chen
 * @LastEditTime: 2021-03-12 15:31:11
 * @Description: 
 */
export function patch(oldVnode,vnode) {
  // 虚拟节点转化为真实节点
  let el = createElm(vnode) //产生真实dom
  let parentElm = oldVnode.parentNode // 获取老的节点父亲
  parentElm.insertBefore(el,oldVnode.nextSibing) // 真实节点插入
  parentElm.removeChild(oldVnode)  //删除老节点
}

function createElm(vnode){
  let {tag,children,key,data,text} = vnode
  if(typeof tag === 'string'){ // 创建元素放到vnode上
    vnode.el = document.createElement(tag)
    setAttr(vnode.el,data) // 设置dom属性
    children.forEach(child=>{ // 遍历儿子，渲染完成后扔到父亲上
      vnode.el.appendChild(createElm(child))
    })
  }else{ // 创建文件 放到vnode.el
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}

function setAttr(el,data){
  if(Object.keys(data).length){
    for(let i in data){
      if(data[i] === undefined) continue;
      if(i === 'style'){
        for(let style in data[i]){
          el.setAttribute(i,`${style}:${data[i][style]};`)
        }
      }else{
        el.setAttribute(i,data[i])
      }
    }
  }
}