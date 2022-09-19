import Koa from 'koa'

const app = new Koa()
// response
app.use(ctx => {
    ctx.body = 'Hello Koa';
  });
  
  app.listen(3000, () => {
    console.log('Start aerver at 3000 port ...')
  });
