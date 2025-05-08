import { AxiosError } from "axios";

export interface ApiErrorResponse {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export class ApiError extends Error {
  public readonly status: number;
  public readonly errors?: Record<string, string[]>;

  private constructor(
    message: string,
    status: number,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
    this.message = message;
    this.status = status;
    this.errors = errors;
  }

  static fromAxiosError(error: AxiosError<ApiErrorResponse>): ApiError {
    if (error.response?.status === 422) {
      return new ApiError(
        error.response?.data?.message || "Invalid request",
        error.response?.status || 0,
        error.response?.data?.errors
      );
    }

    return new ApiError(
      error.response?.data?.message || "Invalid request",
      error.response?.status || 0
    );
  }

  isNetworkError(): boolean {
    return this.status === 0;
  }

  isAuthError(): boolean {
    return this.status === 401;
  }

  isForbidden(): boolean {
    return this.status === 403;
  }

  isNotFound(): boolean {
    return this.status === 404;
  }

  isValidationError(): boolean {
    return this.status === 422;
  }

  isServerError(): boolean {
    return this.status >= 500;
  }

  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      errors: this.errors,
    };
  }

  toString(): string {
    return `[${this.name}] ${this.message} (Status: ${this.status})`;
  }
}
