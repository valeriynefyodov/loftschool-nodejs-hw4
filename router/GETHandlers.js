const db = require('../db-controller');

async function indexGetHandler(ctx, next) {
  const flashStatus = ctx.flash('indexStatus');
  const products = db.getProducts();
  const skills = db.getSkills();
  const isUserAuth = db.isUserAuth();

  ctx.render('index', {
    products,
    skills,
    userauth: isUserAuth, 
    msgemail: flashStatus.length ? flashStatus : null 
  });
}

function registerGETHandlers(router) {
  router.get('/', indexGetHandler);
  router.get('/index', indexGetHandler);
  
  router.get('/login', async (ctx, next) => {
    const flashStatus = ctx.flash('loginStatus');
    const isUserAuth = db.isUserAuth();

    if (isUserAuth) {
      return ctx.redirect('/admin');
    }

    ctx.render('login', { 
      msglogin: flashStatus.length ? flashStatus : null 
    });
  });

  router.get('/logout', async (ctx, next) => {
    db.logoutUser();

    ctx.flash('loginStatus', 'Всего хорошего! :)');
    return ctx.redirect('/login');
  })
  
  router.get('/admin', async (ctx, next) => {
    const flashLoginStatus = ctx.flash('loginStatus');
    const flashSkillsStatus = ctx.flash('skillsStatus');
    const flashUploadStatus = ctx.flash('uploadStatus');
    const isUserAuth = db.isUserAuth();

    if (!isUserAuth) {
      ctx.flash('loginStatus', 'Пожалуйста, авторизируйтесь!');
      return ctx.redirect('/login');
    }

    ctx.render('admin', {
      msgauth: flashLoginStatus.length ? flashLoginStatus : null,
      msgskill: flashSkillsStatus.length ? flashSkillsStatus : null,
      msgfile: flashUploadStatus.length ? flashUploadStatus : null
    });
  });
}

module.exports = {
  registerGETHandlers
}