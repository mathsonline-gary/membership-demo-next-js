export type ApiEmptyResponse = void

export interface ApiResponse<T> {
  message?: string
  data: T
}

export interface ApiPaginatedResponse<T> extends ApiResponse<T[]> {
  links?: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta?: {
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: number
    to: number
    total: number
  }
}

export interface ApiCursorPaginatedResponse<T> extends ApiResponse<T[]> {
  next_page_url: string | null
  prev_page_url: string | null
}

export interface ApiErrorResponse {
  message: string
  errors?: Record<string, string[]>
}
