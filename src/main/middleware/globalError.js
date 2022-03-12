import { CommonError } from "../common/globalError";

export default () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (err instanceof CommonError) {
        console.log(err)
        ctx.body = err;
      } else {
        console.log(err)
        ctx.body = new CommonError();
      }
    }
  }
}