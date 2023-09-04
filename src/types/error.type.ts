export type UserErrorTypeKey =
  | 'name_or_password_is_required'
  | 'user_does_not_exists'
  | 'password_is_incorrect'
  | 'password_is_not_same'
  | 'user_has_already_exists'
  | 'unauthorized'

export type BlogErrorTypeKey =
  | 'page_is_required'
  | 'page_is_invalid'
  | 'type_is_invalid'
  | 'title_content_type_is_required'
  | 'id_is_required'
  | 'id_is_invalid'
  | 'blog_not_exists'
  | 'no_change'
  | 'unauthorized'

export type ProjectErrorTypeKey =
  | 'page_is_required'
  | 'page_is_invalid'
  | 'status_is_invalid'
  | 'title_or_status_is_required'
  | 'id_is_invalid'
  | 'project_not_exists'
  | 'no_change'
  | 'unauthorized'

export type FileErrorTypeKey =
  | 'image_is_required'
  | 'image_format_is_invalid'

export type ErrorTypeKey =
  | UserErrorTypeKey
  | BlogErrorTypeKey
  | ProjectErrorTypeKey
  | FileErrorTypeKey

  | 'network_error'

  | 'time_is_required'
  | 'invalid_time'
  | 'title_category_is_required'
  | 'task_not_exists'
