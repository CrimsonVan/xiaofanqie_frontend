import type { GlobalResponseData } from './global'
//分类的信息类型
export type cateData = {
  cate_id?: number
  cate_name: string
  use_times?: number
}
//多个帖子返回数据类型
export type cateAllDataRes = GlobalResponseData<cateData[]>
