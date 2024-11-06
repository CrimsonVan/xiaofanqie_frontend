import request from '../utils/request'
// 登录接口
export const userLoginService = ({ username, password }: any) =>
  request.post('/api/login', { username, password })
// 获取用户基本信息
export const userGetInfoService = ({ username }: any) => request.post('/my/userinfo', { username })
