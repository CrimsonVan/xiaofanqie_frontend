import request from '../utils/request'
// 登录接口
export const getPostService = () => request.get('/post/get')
export const getSinglePostService = ({ id }: any) => request.post('/post/getOne', { id })
