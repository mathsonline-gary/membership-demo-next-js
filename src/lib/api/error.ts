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
    const responseData = error.response?.data;
    const status = error.response?.status || 0;

    // If we have a response with data, use it
    if (responseData) {
      return new ApiError(
        responseData.message || "Invalid request",
        status,
        responseData.errors
      );
    }

    // If we have a response but no data, use the status text
    if (error.response?.statusText) {
      return new ApiError(error.response.statusText, status);
    }

    // If we have no response at all, it's likely a network error
    return new ApiError("Network error occurred", status);
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
