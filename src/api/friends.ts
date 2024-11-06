import request from '../utils/request'

export const getFriendsService = ({ username }: any) => request.post('/friends/get', { username })
