import request from '../utils/request'
import type { friendDataAllRes, friendsQuery } from '@/type/friends'
export const getFriendsService = ({ username }: friendsQuery) =>
  request.post<any, friendDataAllRes>('/friends/get', { username })

export const getSearchFriendsService = ({ query, username }: friendsQuery) =>
  request.post<any, friendDataAllRes>('/friends/getSearch', { query, username })
