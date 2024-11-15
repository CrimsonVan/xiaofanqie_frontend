// 节流方法
export const throttle = (func: any, delay: number) => {
  let timer: any = null
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        func()
        timer = null
      }, delay)
    }
  }
}
