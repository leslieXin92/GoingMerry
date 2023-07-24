const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    ctx.body = 'Hello GoingMerry!';
});

app.listen(3000);