export class ApiError extends Error {
  private errors: Record<string, string[]>

  constructor(
    public status: number,
    message: string,
    errors: Record<string, string[]>,
    cause?: unknown
  ) {
    super(message, { cause })
    this.name = 'ApiError'
    this.errors = errors
  }

  getErrors(): Record<string, string[]> {
    return this.errors
  }

  isNetworkError(): boolean {
    return this.status === 0
  }

  isBadRequest(): boolean {
    return this.status === 400
  }

  isUnauthorized(): boolean {
    return this.status === 401
  }

  isForbidden(): boolean {
    return this.status === 403
  }

  isNotFound(): boolean {
    return this.status === 404
  }

  isConflict(): boolean {
    return this.status === 409
  }

  isUnprocessableEntity(): boolean {
    return this.status === 422
  }

  isTooManyRequests(): boolean {
    return this.status === 429
  }

  isServerError(): boolean {
    return this.status >= 500
  }

  isClientError(): boolean {
    return this.status >= 400 && this.status < 500
  }
}
