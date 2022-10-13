export interface ErrorResponse {
  errorCode: number;
  message: string;
}

class HttpError extends Error {
  constructor(public message: string, public errorCode: number) {
    super(message);
  }
}

export default HttpError;
