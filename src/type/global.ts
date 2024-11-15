//所有返回数据类型
export type GlobalResponseData<T> = {
  data: {
    code: number
    message: string
    data: T
  }
}
