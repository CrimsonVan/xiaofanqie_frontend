import type { GlobalResponseData } from './global'
//评论数据类型
export type commentData = {
  avatar: string
  child_length?: number
  comment_id?: number
  content: string
  nick_name: string
  parent_comment_id: number
  post_id: number | string
  reply_comment_id: number
  reply_nickname: string
  reply_username: string
  username: string
  father_length?: number | string
}

//多个评论返回数据类型
export type commentDataAllRes = GlobalResponseData<commentData[]>
//评论携带参数的ts类型
export type commentsQuery = {
  avatar?: string
  child_length?: number
  comment_id?: number
  content?: string
  nick_name?: string
  parent_comment_id?: number
  post_id?: number | string
  reply_comment_id?: number
  reply_nickname?: string
  reply_username?: string
  username?: string
  id?: number | string
  father_length?: number
}
//父子评论组件子传父类型声明
export type commentsSonToFather = {
  parent_comment_id: number
  reply_nickname: string
  father_length: number
  reply_comment_id?: number
  reply_username?: string
}
// //单个评论的类型信息
// export interface commentSingleData {
//   avatar: string
//   child_length: number
//   comment_id: number
//   content: string
//   nick_name: string
//   parent_comment_id: number
//   post_id: number
//   reply_comment_id: number
//   reply_nickname: string
//   reply_username: string
//   username: string
// }

// //定义获取评论接口返回数据类型
// export interface commentsResponseData {
//   data: {
//     code: number
//     message: string
//     data: commentSingleData | commentSingleData[]
//   }
// }
