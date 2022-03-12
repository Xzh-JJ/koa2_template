export const COMMON_ERROR_STATUS = 500;
export const PARAM_ERROR_STATUS = 400;

export class CommonError extends Error {
  constructor(status = COMMON_ERROR_STATUS, message="服务器异常") {
    super();
    this.status = status;
    this.message = message;
  }
}

export class ParamError extends CommonError {
  constructor(message = '参数异常') {
    super(PARAM_ERROR_STATUS, message);
  }
}