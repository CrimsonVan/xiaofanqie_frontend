import request from '../utils/request'

export const getCommentService = ({ id }: any) => request.post('/comments/get', { id })
export const getSecondCommentService = ({ post_id, parent_comment_id }: any) =>
  request.post('/comments/getSecond', { post_id, parent_comment_id })
export const addCommentService = (obj: any) => request.post('/comments/add', obj)
