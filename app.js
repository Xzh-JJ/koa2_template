import 'dotenv/config';
import 'module-alias/register';
const Koa = require('koa');
import router from '@main/router';
import middleware from '@main/middleware';
const app = new Koa();
// const json = require('koa-json')
// const bodyparser = require('koa-bodyparser') 
const jwtKoa = require('koa-jwt');
const secret = process.env.SECRET;

// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))

// app.use(json())
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , authorization');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  const start = new Date()
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next()
  }
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  console.log('有人连接了服务器')
})

app.use(jwtKoa({secret}).unless({
  path: [/^\/users\/login/,/^\/movie\/crawler/]
}))

app.context.publicResult = (data, message = '操作成功', code = 200) => {
  return {
    code,
    data,
    message
  }
}
//中间件处理
middleware(app);

// 注册所有路由 
router(app);                                    

app.listen(3000,() => {
  console.log(`后台启动完毕,启动端口为3000`)
})