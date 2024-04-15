export type UserPermissionType = 'normal' | 'admin' | 'superAdmin'

export interface UserInfo {
  id: number
  username: string
  password: string
  permission: UserPermissionType
}

export interface LoginParams {
  username: string
  password: string
}

export interface RegisterParams {
  username: string
  password: string
  confirmPassword: string
  permission?: UserPermissionType
}

export interface AutoLoginParamsParams {
  id: number
  username: string
  permission: UserPermissionType
}
