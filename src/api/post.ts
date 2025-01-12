import request from '../utils/request'
import type { postAllDataRes, postQuery, postOneDataRes } from '@/type/post'
// 帖子接口
//获取所有帖子
export const getPostService = ({ pagenum, cate_id }: { pagenum: any; cate_id?: any }) =>
  request.post<any, postAllDataRes>('/post/get', { pagenum, cate_id, status: '通过' })
//获取客户端所有帖子
export const getClientPostService = ({ pagenum, cate_id }: { pagenum: any; cate_id?: any }) =>
  request.post<any, postAllDataRes>('/post/getClient', { pagenum, cate_id, status: '通过' })
//获取关注的所有帖子
export const getFollowPostService = ({ username, pagenum }: any) =>
  request.post<any, postAllDataRes>('/post/getFollow', { username, pagenum })
//获取单个帖子
export const getSinglePostService = ({ id }: postQuery) =>
  request.post<postOneDataRes, any>('/post/getOne', { id })
//获取单个要编辑的帖子
export const getEditOneService = ({ id }: postQuery) =>
  request.post<postOneDataRes, any>('/post/getEditOne', { id })
//添加帖子
export const addPostService = (formdata: any) => request.post<any, any>('/post/add', formdata)
//获取某用户所有帖子
export const getUserPostService = ({ username }: postQuery) =>
  request.post<any, postAllDataRes>('/post/getUser', { username })
//搜索帖子
export const getSearchPostService = ({ query }: postQuery) =>
  request.post<any, postAllDataRes>('/post/getSearch', { query })
//删除帖子
export const delPostService = ({ id }: postQuery) => request.post<any, any>('/post/del', { id })
//编辑帖子
export const editPostService = (obj: any) => request.post<any, any>('/post/edit', obj)
