export interface LoginParams {
  username: string
  password: string
}

export interface LoginResult {
  id: number
  username: string
  token: string
}
