import request from '../utils/request'
import type { commentsQuery, commentDataAllRes } from '@/type/comments'
export const getCommentService = ({ id }: commentsQuery) =>
  request.post<any, commentDataAllRes>('/comments/get', { id })
export const getSecondCommentService = ({ post_id, parent_comment_id }: commentsQuery) =>
  request.post<any, commentDataAllRes>('/comments/getSecond', { post_id, parent_comment_id })
export const addCommentService = (obj: commentsQuery) => request.post('/comments/add', obj)
