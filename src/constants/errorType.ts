import type { ErrorTypeKey } from '@/types'

interface ErrorTypeItem {
  status: number
  message: string
}

export const errorType: Record<ErrorTypeKey, ErrorTypeItem> = {
  name_or_password_is_required: {
    status: 400, // Bad Request
    message: 'Username Or Password Cannot Be Empty!'
  },
  user_does_not_exists: {
    status: 400,
    message: 'User Does Not Exists!'
  },
  password_is_incorrect: {
    status: 400,
    message: 'Password Is Incorrect!'
  },
  password_is_not_same: {
    status: 400,
    message: 'Password Is Not Same!'
  },
  user_has_already_exists: {
    status: 409, // Conflict
    message: 'User Has Already Exists!'
  },
  unauthorized: {
    status: 401, // Unauthorized
    message: 'Unauthorized!'
  },
  network_error: {
    status: 500,
    message: 'Network Error!'
  },
  title_content_type_is_required: {
    status: 400,
    message: 'Title, Content And Type Cannot Be Empty!'
  },
  type_is_invalid: {
    status: 400,
    message: 'Type Is Invalid!'
  },
  page_or_type_is_required: {
    status: 400,
    message: 'Page And Type Cannot Be Empty!'
  },
  id_is_required: {
    status: 400,
    message: 'Id Cannot Be Empty!'
  },
  id_is_invalid: {
    status: 400,
    message: 'Id Is Invalid!'
  },
  blog_not_exists: {
    status: 400,
    message: 'Blog Dose Not Exists!'
  },
  no_change: {
    status: 400,
    message: 'No Change!'
  }
}
