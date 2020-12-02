const sessionStorage = window.sessionStorage
const JSON = window.JSON
/**
 * @summary 获取session
 * @param {*} name
 */
export function getSession (name) {
  let value = sessionStorage.getItem(name)
  try {
    value = JSON.parse(value)
    return value
  } catch (error) {
    return value
  }
}
/**
 * @summary 设置session
 * @param {*} name
 * @param {*} value
 */
export function setSession (name, value) {
  if (typeof value === 'object') value = JSON.stringify(value)
  return sessionStorage.setItem(name, value)
}
/**
 * @summary 移除某一个session
 * @param {*} name
 */
export function removeSession (name) {
  return sessionStorage.removeItem(name)
}
/**
 * @summary 清除全部session
 */
export function clearSession () {
  sessionStorage.clear()
}
/**
 * @summary 字符串截取
 * @param {*} str
 * @param {*} strLength
 */
export function subStringFn (str, strLength) {
  if (typeof str === 'string' && str.length > strLength) {
    return str.substring(0, strLength) + '...'
  }
  throw new Error(`${str} 不是字符串！`)
}
/**
 * @summary yyyy-MM-dd 转时间戳
 * @param {*} str
 */
export function formatTime (str) {
  return Number((new Date(str.replace(/[-\\/]/g, '/'))).getTime())
}
/**
 * @summary 天转时间戳
 * @param {*} str
 */
export function formatDay (str) {
  if (Number(str)) {
    return Number(str * 24 * 60 * 60 * 1000)
  }
}
/**
 * @summary 时间戳转yyyy-MM-dd
 * @param {*} str
 */
export function formatYMD (str) {
  var date = new Date(str)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var year = date.getFullYear()
  var month = String(date.getMonth() + 1).padStart(2, 0)
  var dateT = String(date.getDate()).padStart(2, 0)
  var hour = String(date.getHours()).padStart(2, 0)
  var minute = String(date.getMinutes()).padStart(2, 0)
  var second = String(date.getSeconds()).padStart(2, 0)
  return year + '-' + month + '-' + dateT + ' ' + hour + ':' + minute + ':' + second
}
/**
 * @summary 时间格式化
 * @param {*} time
 * @param {*} format
 */
export function formatDate (time, format) {
  if (!time) {
    return ''
  }
  if (typeof time === 'number') {
    // 时间戳转YYYY-MM
    time = time.toString()
  }
  time = time.trim() // 清除前后空格
  const Reg = /^(\d{4})[-|/|年]([0][1-9]|[1][0-2])[-|/|月]([1-9]|[012]\d|3[01])\s*(\d{0,2}):(\d{0,2}):(\d{0,2})$/gi
  var timeArray = Reg.exec(time)
  var year, month, day
  year = timeArray[1]// 年
  month = timeArray[2]// 月
  day = timeArray[3]// 日
  if (format) {
    return year + format + month + format + day
  }
  return year + '-' + month + '-' + day
}
/**
 * @summary 深拷贝
 * @param {*} obj 拷贝对象
 * @param {*} weakMap 缓存
 */
export function deepCopy (obj, weakMap = new WeakMap()) {
  if (weakMap.has(obj)) { return weakMap.get(obj) }
  if (obj === null) { return null }
  if (obj instanceof RegExp) { return new RegExp(obj) }
  if (obj instanceof Date) { return new Date(obj) }
  if (typeof obj !== 'object') { return obj }
  const res = new obj.constructor()
  // 处理Symbol情况
  const symbolType = Object.getOwnPropertySymbols(obj)
  if (symbolType.length) {
    symbolType.forEach(item => {
      if (typeof obj[item] === 'object' && obj[item] != null) {
        res[item] = deepCopy(obj[item])
      } else {
        res[item] = obj[item]
      }
    })
  }
  weakMap.set(obj, res)
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      res[key] = deepCopy(obj[key], weakMap)
    }
  }
  return res
}
/**
 * @summary 对象数据去重
 * @param {*} arr 数据源
 * @param {*} uniqueFlag 属性
 */
export function uniqueArrObj (arr, uniqueFlag) {
  const tempArr = []
  const uniqueVal = []
  for (const item of arr) {
    if (uniqueVal.includes(item[uniqueFlag])) continue
    uniqueVal.push(item[uniqueFlag])
    tempArr.push(item)
  }
  return tempArr
}
/**
 * @summary 数组拆分
 * @param {*} arr
 * @param {*} size 把size个数拆分为一个数组
 */
export function arrSplit (arr = [], size = 1) {
  if (Object.prototype.toString.call('').slice(8, -1) === 'Array') {
    // eslint-disable-next-line
    return arr.length ? arr.reduce((t, v) => (t[t.length - 1].length === size ? t.push([v]) : t[t.length - 1].push(v), t), [[]]) : []
  }
  throw new Error("the data source isn't an array!")
}
/**
 * @summary 防抖
 * @param {*} fn 需要执行的函数
 * @param {*} wait 等待时间
 * @param {*} immediate 是否立即执行
 */
export function debounce (fn, immediate = false, wait = 3000) {
  let timeout, result
  const debounce = function () {
    const context = this
    const args = arguments
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      // 已经执行过了 则不在执行
      const callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) result = fn.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        fn.apply(context, args)
      }, wait)
    }
    return result
  }
  // 手动清除定时器
  debounce.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }
  return debounce
}
/**
 * @summary 千分符参数
 * @param {*} num 数据源
 */
export function thousands (num) {
  if (typeof num === 'string' || typeof num === 'number') {
    return (num.toString().indexOf('.') !== -1) ? Number(num).toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  }
  return num
}
/**
 * @summary 路径参数解析
 * @param {*} url 解析路径
 */
export function getQueryObject (url) {
  url = url == null ? window.location.href : url
  var search = url.substring(url.lastIndexOf('?') + 1)
  var obj = {}
  var reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, function (rs, $1, $2) {
    var name = decodeURIComponent($1)
    var val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}
/**
 * @summary 下载文件
 * @param {*} name 文件下载名称
 * @param {*} data 数据源
 * @param {*} type 数据下载类型
 */
export function download (name, data, type) {
  const element = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
  const ev = document.createEvent('MouseEvents')
  const urlObject = window.URL || window.webkitURL || window
  const exportBlob = new Blob([data], { type: type || '' })
  element.href = urlObject.createObjectURL(exportBlob)
  element.download = name
  ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  element.dispatchEvent(ev)
  urlObject.revokeObjectURL(element.href) // 释放实例
  element.href = ''
}
/**
 * @summary 树型数据遍历
 * @param {*} tree  树形结构数据
 * @param {*} fn 执行函数
 */
export function treeForeach (fn, tree = []) {
  tree.forEach(item => {
    item.children && treeForeach(item.children, fn)
    fn(item)
  })
}
/**
 * @summary 列表数据转树型结构
 * @param {*} id 对象属性ID
 * @param {*} parentId 对象属性对应的父级ID
 * @param {*} list 数据源
 */
export function listToTree (list = [], id = null, parentId = null) {
  // eslint-disable-next-line
    const info = list.reduce((t, v) => (t[v[id]] = v, v.children = [], t), {})
  return list.filter(node => {
    info[node[parentId]] && info[node[parentId]].children.push(node)
    return !node[parentId]
  })
}
/**
 * @summary 树形数据转列表
 * @param {*} tree
 * @param {*} result
 * @param {*} level
 */
export function treeToList (tree = [], isRecursion = true, result = [], level = 0) {
  /**
    *递归模式
    */
  if (isRecursion) {
    tree.forEach(node => {
      result.push(node)
      node.level = level + 1
      node.children && treeToList(node.children, result, level + 1)
    })
    return result
  }
  /**
    * 循环模式
    */
  // eslint-disable-next-line
    const res = tree.map(node => (node.level = 1, node))
  for (let i = 0; i < res.length; i++) {
    if (!res[i].children) continue
    // eslint-disable-next-line
        const list = res[i].children.map(node => (node.level = res[i].level + 1, node))
    res.splice(i + 1, 0, ...list)
  }
  return res
}
/**
 * @summary 筛选
 * @param {*} tree 数据源
 * @param {*} fn 执行函数
 */
export function treeFilter (fn, tree = []) {
  return tree.map(node => ({ ...node })).filter(node => {
    node.children = node.children && treeFilter(node.children, fn)
    return fn(node) || (node.children && node.children.length)
  })
}
/**
 * @summary 查找树节点
 * @param {*} tree
 * @param {*} fn
 */
export function treeFind (fn, tree = []) {
  for (const item of tree) {
    if (fn(item)) return item
    if (item.children) {
      return treeFind(item.children, fn) || []
    }
  }
  return []
}
/**
 * @summary 数组扁平化
 * @param {*} arr
 */
export function Flat (arr = []) {
  return arr.reduce((t, v) => t.concat(Array.isArray(v) ? Flat(v) : v), [])
}
/**
 * @summary 对字符串进行加密
 * @param {*} code
 */
export function compileStr (code) {
  var c = String.fromCharCode(code.charCodeAt(0) + code.length)
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
  }
  return escape(c)
}
/**
   * @summary 字符串进行解密
   * @param {*} code
   */
export function unCompileStr (code) {
  code = unescape(code)
  var c = String.fromCharCode(code.charCodeAt(0) - code.length)
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1))
  }
  return c
}
