import uuid from 'node-uuid';
const jwt = require('jsonwebtoken');
const Redis = require('ioredis');
const secret = process.env.SECRET;
const redis = new Redis({
  port: 6379,
  host: '127.0.0.1',
  family: 4,
  db: 0,
})
import UserService from '@main/service/userService';
// const router = require('koa-router')()
import Router from 'koa-router';
import koaBodyparser from 'koa-bodyparser';
import { SUCCESS_NOTUSE } from '@main/common/publicResult';
import { isNull } from '@main/util/validate' 

let router = new Router({
  prefix: '/users'
});

// router.post('/register',koaBodyparser(),async (ctx, next) => {

// })

router.post('/login',koaBodyparser(), async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const user = await UserService.login({ username, password });
  if (user && user.length > 0) {
    const User = {
      username,
      password,
    }
    const token = jwt.sign(User, secret, { expiresIn: '3h' })
    redis.set(User.username,token);
    ctx.success({token},'登录成功')
  } else {
    ctx.failLogin('登录失败,用户名或密码不对');
  }
})

router.get('/getUserList',koaBodyparser(),async (ctx, next) => {
  const list = await UserService.findAll();
  if (list) {
    ctx.success(list,'查询成功');
  }
})

router.post('/checkRepeat', koaBodyparser(), async (ctx, next) => {
  const {username} = ctx.request.body;
  const user = await UserService.checkRepeat(username);
  if (user && user.length > 0) {
    ctx.success(null,'用户已被注册',SUCCESS_NOTUSE);
  } else {
    ctx.success(null,'恭喜,该用户可以被注册')
  }
})

router.post('/register',koaBodyparser(), async (ctx,next) => {
  const userData = ctx.request.body;
  const { username, password, telephone } = userData;
  if (isNull(username)) {
   await ctx.nullParams('username')
   return;
  }
  if (isNull(password)) {
   await ctx.nullParams('password')
   return;
  }
  if (isNull(telephone)) {
   await ctx.nullParams('telephone')
   return;
  }
  try{
    await UserService.register(Object.assign(userData,{id:uuid.v1()}));
    ctx.success(null,'注册成功！')
  } catch(error) {
    ctx.success(error,'注册失败,该用户已存在！',204);
  }
})

router.put('/updateById',koaBodyparser(), async (ctx, next) => {
  const user = ctx.request.body;
  const { id } = user;
  if (isNull(id)) {
    await ctx.nullParams('id');
    return;
  }
  try {
    await UserService.updateById(user);
    ctx.success(null,'更新成功')
  } catch (error) {
    console.log(error,'?')
    ctx.success(error,'服务异常,更新失败!', 204);
  }
})

router.delete('/delete/:id',koaBodyparser(),async (ctx,next) => {
  const id = ctx.params.id;
  if (isNull(id)) {
    await ctx.nullParams('id')
    return
  }
  try {
    await UserService.delete(id);
    ctx.success(null,'删除用户成功')
  } catch (error) {
    ctx.success(err,'服务异常,删除用户失败！',204);
  }
})

export default router;