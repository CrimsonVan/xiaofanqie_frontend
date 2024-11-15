import type { GlobalResponseData } from './global'
//聊天好友的类型
export type friendData = {
  id?: number
  friendAvatar: string
  friendName: string
  friendNickname: string
  lastMsg: string
  userAvatar: string
  userNickname: string
  username: string
}
//多个好友返回数据类型
export type friendDataAllRes = GlobalResponseData<friendData[]>
//聊天信息携带参数的ts类型
export type friendsQuery = {
  query?: string
  username: string
}

// //定义获取聊天信息接口返回数据类型
// export interface friendsResponseData {
//   data: {
//     code: number
//     message: string
//     data: {
//       id: number
//       friendAvatar: string
//       friendName: string
//       friendNickname: string
//       lastMsg: string
//       userAvatar: string
//       userNickname: string
//       username: string
//     }
//   }
// }

// // //定义获取聊天信息接口返回数据类型
// export interface friendsSingleData {
//   id?: number
//   friendAvatar: string
//   friendName: string
//   friendNickname: string
//   lastMsg: string
//   userAvatar: string
//   userNickname: string
//   username: string
// }
