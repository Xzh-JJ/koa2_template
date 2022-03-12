import { ParamError } from "../common/globalError";
import { FailLogin, PublicResult } from "../common/publicResult";

export default () => {
  return async (ctx,next) => {
    ctx.success = function (data,message,status) {
      ctx.body = new PublicResult(data, message, status)
    }

    ctx.failLogin = function (message) {
      ctx.body = new FailLogin(message)
    }

    ctx.nullParams = function(message) {
      ctx.body = new ParamError(message+'参数为空, 导致请求异常');
    }

    await next();
  }
}