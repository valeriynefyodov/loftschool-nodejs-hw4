function registerGETHandlers(router) {
  router.get('/index', async (ctx, next) => {
    const flashStatus = ctx.flash('indexStatus');

    ctx.render('index', { 
      msgemail: flashStatus.length ? flashStatus : null 
    });
  });
  
  router.get('/login', async (ctx, next) => {
    const flashStatus = ctx.flash('loginStatus');

    ctx.render('login', { 
      msglogin: flashStatus.length ? flashStatus : null 
    });
  });
  
  router.get('/admin', async (ctx, next) => {
    const flashSkillsStatus = ctx.flash('skillsStatus');
    const flashUploadStatus = ctx.flash('uploadStatus');

    ctx.render('admin', { 
      msgskill: flashSkillsStatus.length ? flashSkillsStatus : null,
      msgfile: flashUploadStatus.length ? flashUploadStatus : null
    });
  });
}

module.exports = {
  registerGETHandlers
}