//深拷贝1
export const deepClone1: any = (obj: any) => {
  if (obj instanceof Object !== true) {
    return obj
  }
  if (obj instanceof Array) {
    const copy = []
    for (let i = 0; i < obj.length; i++) {
      copy.push(deepClone1(obj[i]))
    }
    return copy
  }

  const copy: any = {}
  for (const key in obj) {
    copy[key] = deepClone1(obj[key])
  }
  return copy
}
