export class ApiError {
  constructor(code: number, name: string, message: string) {
    this.code = code;
    this.name = name;
    this.message = message;
  }
  code: number;
  name: string;
  message: string;
}

export class InvalidBodyApiError extends ApiError {
  constructor(message: string) {
    super(400, 'Invalid body', message);
  }
}

export class AuthorizationApiError extends ApiError {
  constructor(message: string) {
    super(401, 'Authorization error', message);
  }
}
