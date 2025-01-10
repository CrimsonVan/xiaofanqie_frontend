//获取当前日期函数
export function getNowFormatDate() {
  const date = new Date()
  const year = date.getFullYear() //获取完整的年份(4位)
  const month = date.getMonth() + 1 //获取当前月份(0-11,0代表1月)
  const strDate = date.getDate() // 获取当前日(1-31)
  const hour = date.getHours() // 获取当前小时
  const minutes = date.getMinutes() // 获取当前分钟
  const seconds = date.getSeconds() // 获取当前秒数

  return `${year}-${month}-${strDate} ${hour}:${minutes}:${seconds}`
}
