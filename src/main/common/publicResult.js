export const SUCCESS_STATUS = 200;
export const FAIL_LOGIN = 401.1;
export const SUCCESS_NOTUSE = 204;

export class PublicResult {
  constructor(data, message="调用成功", status = SUCCESS_STATUS) {
    this.data = data;
    this.message = message;
    this.status = status;
  }
}

export class FailLogin extends PublicResult {
  constructor(message="登录失败") {
    super(null,message,FAIL_LOGIN)
  }
}