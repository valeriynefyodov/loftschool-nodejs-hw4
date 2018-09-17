const serve = require('koa-static');
const session  = require('koa-generic-session');
const flash = require('koa-connect-flash');
const Pug = require('koa-pug');
const koaBody = require('koa-body');
const router = require('../router');
const { UPLOAD_PATH } = require('../config');

function applyMiddlewares(app) {
  // static files middleware
  app.use(serve('./public'));

  // session middleware
  app.keys = ['keys'];
  app.use(session());

  // flash middleware
  app.use(flash());

  // body parser middleware
  app.use(koaBody({ 
    multipart: true,
    formidable: {
      uploadDir: UPLOAD_PATH,
      keepExtensions: true
    }
  }));

  // router middleware
  app.use(router.routes());

  // connect pug middleware
  const pug = new Pug({
    viewPath: './template/pages',
    basedir: './template/pages',
    app: app
  });
}

module.exports = {
  applyMiddlewares
}