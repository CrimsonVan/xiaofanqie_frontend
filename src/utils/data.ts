//获取当前日期函数
export function getNowFormatDate() {
  const date = new Date()
  // const year = date.getFullYear() //获取完整的年份(4位)
  const month = date.getMonth() + 1 //获取当前月份(0-11,0代表1月)
  const strDate = date.getDate() // 获取当前日(1-31)
  return `${month}-${strDate}`
}
