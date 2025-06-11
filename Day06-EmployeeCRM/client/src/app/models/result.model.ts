export class Result<T> {
  successMessage?: string;
  errorMessages?: string[] = [];
  data?: T;
  accessToken?: string;
  isSuccess: boolean = false;

  constructor(
    successMessage?: string,
    errorMessages?: string[],
    data?: T,
    accessToken?: string,
    isSuccess: boolean = false
  ) {
    this.successMessage = successMessage;

    if (errorMessages) {
      this.errorMessages = errorMessages;
    }

    this.data = data;
    this.accessToken = accessToken;
    this.isSuccess = isSuccess;
  }

  addErrorMessages(message: string) {
    this.errorMessages?.push(message);
  }
}
