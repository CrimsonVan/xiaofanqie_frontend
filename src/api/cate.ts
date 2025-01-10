import request from '../utils/request'
import type { cateAllDataRes } from '@/type/cate'
//获取所有帖子分类
export const getPostCateService = (obj: { pagenum: number }) =>
  request.post<cateAllDataRes, any>('/cate/getClient', obj)
//新增分类
export const addPostCateService = (obj: {
  cate_name: string
  creater: string
  creater_username: string
  creater_avatar: string
}) => request.post<any>('/cate/add', obj)
//获取单个分类
export const getOnePostCateService = ({ cate_name }: { cate_name: any }) =>
  request.post<any>('/cate/getOne', { cate_name })
