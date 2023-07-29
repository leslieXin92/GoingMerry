export const useReturn = <Data = null>(code: number, data: Data, msg: string) => {
  return { code, data, msg }
}

export const useSuccessReturn = <R = unknown>(result: R, message: string) => {
  return useReturn(0, result, message)
}

export const useErrorReturn = (message: string) => {
  return useReturn(1, null, message)
}
