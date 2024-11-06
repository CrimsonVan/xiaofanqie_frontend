import request from '../utils/request'
// 登录接口
export const getChatMsg = ({ fromUsername, toUsername }: any) =>
  request.post('/msg/get', { fromUsername, toUsername })
