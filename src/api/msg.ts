import request from '../utils/request'
import type { msgQuery, msgDataAllRes } from '@/type/msg'
// 获取聊天信息接口
export const getChatMsg = ({ fromUsername, toUsername }: msgQuery) =>
  request.post<any, msgDataAllRes>('/msg/get', { fromUsername, toUsername })
