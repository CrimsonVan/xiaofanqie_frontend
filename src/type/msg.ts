import type { GlobalResponseData } from './global'
//聊天信息数据类型
export type msgData = {
  id?: number
  fromAvatar: string
  fromNickname: string
  fromUsername: string
  msg: string
  sent_time?: any
  state?: any
  toAvatar: string
  toNickname: string
  toUsername: string
}
//多个聊天信息返回数据类型
export type msgDataAllRes = GlobalResponseData<msgData[]>

//聊天信息携带参数的ts类型
export interface msgQuery {
  fromUsername?: string
  toUsername?: string
}

//定义获取聊天信息接口返回数据类型
export interface msgResponseData {
  data: {
    code: number
    message: string
    data: {
      id: number
      fromAvatar: string
      fromNickname: string
      fromUsername: string
      msg: string
      sent_time?: any
      state?: any
      toAvatar: string
      toNickname: string
      toUsername: string
    }
  }
}

// //socket.io传递信息类型声明
// export interface msgSend {
//   fromAvatar: string
//   fromNickname: string
//   fromUsername: string
//   msg: string
//   toAvatar: string
//   toNickname: string
//   toUsername: string
//   id?: number
//   sent_time?: any
//   state?: any
// }
