import requireDirectory from 'require-directory'
import Router from "koa-router";

export default (app) => {
  requireDirectory(module, './controller',{
    visit:  (obj) => {
      if (obj.default instanceof Router) {
        app.use(obj.default.routes(),obj.default.allowedMethods());
      }
    }
  })
}
