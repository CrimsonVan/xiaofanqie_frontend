import type { GlobalResponseData } from './global'
//用户信息类型
export type userInfoData = {
  id?: number
  username: string
  password: string
  avatar: string
  nick_name: string
  signature: string
  birthday: string
  gender: string
  fans_num?: number
  follow_num?: number
  like_num?: number
}
//单个用户信息返回数据类型
export type userInfoDataAllRes = GlobalResponseData<userInfoData>

//用户登录接口携带参数的ts类型
export interface loginFormData {
  username: string
  password: string
}
//所有接口
export type ResponseData<T> = {
  data: {
    code: number
    message: string
    data: T
  }
}
//修改用户信息携带参数的ts类型
export interface userQuery {
  username: string
  avatar?: string | Blob
  nickname?: string
  nick_name?: string
  signature?: string
  birthday?: string
}
//单个用户的类型信息
export type userInfoSingleData = {
  id?: number
  username: string
  password: string
  avatar: string
  nick_name: string
  signature: string
  birthday: string
}

//定义获取用户信息接口返回数据类型
export interface userInfoResponseData {
  data: {
    code: number
    message: string
    data: userInfoSingleData
  }
}

//修改关注信息携带参数的ts类型
export interface followQuery {
  username: string
  followUsername?: string
  followNickname?: string
  followAvatar?: string
}

//定义获取关注信息返回数据类型
export interface followResponseData {
  data: {
    code: number
    message: string
    data: {
      id: number
      username: string
      followUsername: string
      followNickname: string
      followAvatar: string
    }
  }
}
