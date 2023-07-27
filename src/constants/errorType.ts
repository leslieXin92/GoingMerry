interface ErrorTypeItem {
  status: number
  message: string
}

export type ErrorTypeKey =
  | 'name_or_password_is_required'
  | 'user_has_already_exists'
  | 'user_does_not_exists'
  | 'password_is_incorrect'
  | 'unauthorized'
  | 'you_do_not_have_access'

export const errorType: Record<ErrorTypeKey, ErrorTypeItem> = {
  name_or_password_is_required: {
    status: 400, // Bad Request
    message: 'Username Or Password Cannot Be Empty!'
  },
  user_has_already_exists: {
    status: 409, // Conflict
    message: 'User Has Already Exists!'
  },
  user_does_not_exists: {
    status: 400,
    message: 'User Does Not Exists!'
  },
  password_is_incorrect: {
    status: 400,
    message: 'Password Is Incorrect!'
  },
  unauthorized: {
    status: 401, // Unauthorized
    message: 'Unauthorized!'
  },
  you_do_not_have_access: {
    status: 401,
    message: 'You Do Not Have Access!'
  }
}
