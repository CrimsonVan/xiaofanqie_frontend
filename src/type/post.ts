import type { GlobalResponseData } from './global'
//帖子的类型信息
export type postData = {
  avatar: string
  comments_length: number
  content: string
  content_img: string
  id: number
  nick_name: string
  pub_time: string
  title: string
  username: string
  comment_count: number
  comment_num?: number
  status: string
  cate_id: number
  cate_name?: string
  like_num?: number
}
//单个帖子返回数据类型
export type postOneDataRes = GlobalResponseData<postData>
//多个帖子返回数据类型
export type postAllDataRes = GlobalResponseData<postData[]>
//帖子携带参数的ts类型
export type postQuery = {
  avatar?: string
  comments_length?: number
  content?: string
  content_img?: string
  id?: number | string
  nick_name?: string
  pub_time?: string
  title?: string
  username?: string
  query?: string
  pagenum?: string | number
}
