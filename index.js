const Koa = require('koa');
const { applyMiddlewares } = require('./middleware');

const app = new Koa();

applyMiddlewares(app);

app.listen(3000, function() {
  console.log('Loftschool Node.js HW4 — Koa.js app running on https://localhost:3000')
});