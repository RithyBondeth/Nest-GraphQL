export class ICustomResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: T;
  code?: number;

  constructor(message: string, data: T, error?: T, code?: number) {
    this.success = error ? false : true;
    this.message = message;
    this.data = data;
    this.error = error;
    this.code = code;
  }
}
