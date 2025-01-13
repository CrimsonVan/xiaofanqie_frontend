import request from '../utils/request'

import type {
  loginFormData,
  userQuery,
  followQuery,
  followResponseData,
  userInfoDataAllRes
} from '@/type/user'

//登录
// 登录接口
export const userLoginService = ({ username, password }: loginFormData) =>
  request.post<any>('/api/login', { username, password })
// 注册接口
export const userRegisterService = ({ username, password }: any) =>
  request.post<any>('/api/reg', { username, password })
//用户信息
// 获取用户基本信息
export const userGetInfoService = ({ username }: userQuery) =>
  request.post<any, userInfoDataAllRes>('/my/userinfo', { username })
//获取对方用户基本信息
export const otherUserinfoGetService = ({ username }: { username: string }) =>
  request.post<any, userInfoDataAllRes>('/my/otherUserinfo', { username })
//修改用户头像
export const userUpdateAvatarService = (formdata: any) =>
  request.post<any>('/my/avatarUpdate', formdata)
//修改用户昵称
export const userUpdateNicknameService = ({ nickname, username }: userQuery) =>
  request.post<any>('/my/nicknameUpdate', { nickname, username })
//修改用户签名
export const userUpdateSignatureService = ({ signature, username }: userQuery) =>
  request.post<any>('/my/signatureUpdate', { signature, username })
//修改用户性别
export const userUpdateGenderService = ({
  gender,
  username
}: {
  gender: string
  username: string
}) => request.post<any>('/my/genderUpdate', { gender, username })
//修改用户生日
export const userUpdateBirthdayService = ({ birthday, username }: userQuery) =>
  request.post<any>('/my/birthdayUpdate', { birthday, username })
//测试获取用户信息
export const userTestGetService = ({ username }: any) =>
  request.post<any>('/my/getTest', { username })

//关注
//获取用户关注列表
export const userGetFollowService = ({ username }: followQuery) =>
  request.post<any, followResponseData>('/api/getFollows', { username })
//新增关注用户
export const userAddFollowService = (obj: followQuery) => request.post<any>('/api/addFollows', obj)
//删除关注用户
export const userDelFollowService = ({ username, followUsername }: followQuery) =>
  request.post<any>('/api/delFollows', { username, followUsername })

//粉丝
//获取粉丝列表
export const userGetFansService = ({ username }: any) =>
  request.post<any, userInfoDataAllRes>('/api/getFans', { username })

//点赞
//获取点赞列表
export const getLikesService = (obj: { username: string }) =>
  request.post<any, any>('/api/getLikes', obj)
//触发点赞
export const addLikesService = (obj: { username: string; like_id: number }) =>
  request.post<any, any>('/api/addLikes', obj)
//取消点赞
export const delLikesService = (obj: { username: string; like_id: number }) =>
  request.post<any, any>('/api/delLikes', obj)
//获取点赞过的列表
export const getLikesPostService = (obj: { username: string }) =>
  request.post<any, any>('/api/getLikesPost', obj)

//Test
export const userTestService = (obj: any) => request.post<any, any>('/my/getDataCount', obj)
