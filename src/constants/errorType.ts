import type { UserErrorTypeKey, BlogErrorTypeKey, ProjectErrorTypeKey, FileErrorTypeKey, ErrorTypeKey } from '@/types'

interface ErrorTypeItem {
  status: number
  message: string
}

/**
 * @description
 * 400: Bad Request
 * 401: Unauthorized
 * 403: Forbidden
 * 409: Conflict
 * 500: Internal Server Error
 */

const userErrorType: Record<UserErrorTypeKey, ErrorTypeItem> = {
  name_or_password_is_required: {
    status: 400,
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
    status: 409,
    message: 'User Has Already Exists!'
  },
  unauthorized: {
    status: 401,
    message: 'Unauthorized!'
  }
}

const blogErrorType: Record<BlogErrorTypeKey, ErrorTypeItem> = {
  page_is_required: {
    status: 400,
    message: 'Page Cannot Be Empty!'
  },
  page_is_invalid: {
    status: 400,
    message: 'Page Is Invalid!'
  },
  type_is_invalid: {
    status: 400,
    message: 'Type Is Invalid!'
  },
  title_content_type_is_required: {
    status: 400,
    message: 'Title, Content And Type Cannot Be Empty!'
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
  },
  unauthorized: {
    status: 401,
    message: 'Unauthorized!'
  }
}

const projectErrorType: Record<ProjectErrorTypeKey, ErrorTypeItem> = {
  page_is_required: {
    status: 400,
    message: 'Page Cannot Be Empty!'
  },
  page_is_invalid: {
    status: 400,
    message: 'Page Is Invalid!'
  },
  title_or_status_is_required: {
    status: 400,
    message: 'title And Status Cannot Be Empty!'
  },
  status_is_invalid: {
    status: 400,
    message: 'Status Is Invalid!'
  },
  id_is_invalid: {
    status: 400,
    message: 'Id Is Invalid!'
  },
  project_not_exists: {
    status: 400,
    message: 'Project Dose Not Exists!'
  },
  no_change: {
    status: 400,
    message: 'No Change!'
  },
  unauthorized: {
    status: 401,
    message: 'Unauthorized!'
  }
}

const fileErrorType: Record<FileErrorTypeKey, ErrorTypeItem> = {
  image_is_required: {
    status: 400,
    message: 'Image Cannot Be Empty!'
  },
  image_format_is_invalid: {
    status: 400,
    message: 'Image Format Is Invalid!'
  }
}

export const errorType: Record<ErrorTypeKey, ErrorTypeItem> = {
  ...userErrorType,
  ...blogErrorType,
  ...projectErrorType,
  ...fileErrorType,

  network_error: {
    status: 500,
    message: 'Network Error!'
  },

  time_is_required: {
    status: 400,
    message: 'Time Cannot Be Empty!'
  },
  invalid_time: {
    status: 400,
    message: 'Invalid Time!'
  },
  title_category_is_required: {
    status: 400,
    message: 'Title And Category Cannot Be Empty!'
  },
  task_not_exists: {
    status: 400,
    message: 'Task Dose Not Exists!'
  }
}
