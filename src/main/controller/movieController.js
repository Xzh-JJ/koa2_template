import koaBodyparser from 'koa-bodyparser';
import Router from 'koa-router';
import MovieService from '@main/service/movieService';
let router = new Router({
  prefix: '/movie'
});

router.get('/crawler',koaBodyparser(),async (ctx,next) => {
  try {
    await MovieService.crawler();
    ctx.success(null,'爬取成功')
  } catch (error) {
    console.log(error)
    ctx.success(error,'爬取失败',204);
  }
})

router.get('/getMovieList',koaBodyparser(),async (ctx, next) => {
  try {
    const list =  await MovieService.findAll();
    if (list) {
      ctx.success(list,'查询成功')
    }
  } catch (error) {
      ctx.success(error,'查询失败')
  }
})

export default router;
