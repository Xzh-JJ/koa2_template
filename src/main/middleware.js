import config from './config';

export default (app) => {
  if (config.middlewares) {
    let middleware;
    config.middlewares.forEach((item) => {
      middleware = require(`./middleware/${item}`).default;
      app.use(middleware());
    })
  }
}