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

export type ErrorTypeKey =
  | UserErrorTypeKey
  | BlogErrorTypeKey

  | 'network_error'
  | 'title_status_is_required'
  | 'status_is_invalid'
  | 'project_not_exists'
  | 'time_is_required'
  | 'invalid_time'
  | 'title_category_is_required'
  | 'task_not_exists'
