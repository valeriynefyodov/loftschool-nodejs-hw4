const path = require('path');
const { PRODUCTS_IMG_PATH } = require('../config');
const db = require('../db-controller');

db.init();

function registerPOSTHandlers(router) {
  router.post('/', async (ctx, next) => {
    const { name, email, message } = ctx.request.body;

    if (!name || !email) {
      ctx.flash('indexStatus', 'Пожалуйста, заполните обязательные поля.');

      ctx.response.status = 400;
      return  ctx.redirect('/');
    }

    db.addFeedback({ name, email, message });
    
    ctx.flash('indexStatus', 'Спасибо за Ваш отзыв! :)');
    
    ctx.response.status = 200;
    return ctx.redirect('/');
  });

  router.post('/login', async (ctx, next) => {
    const { email, password } = ctx.request.body;

    if (!email || !password) {
      ctx.flash('loginStatus', 'Введите все данные пользователя!');

      ctx.response.status = 400;
      return ctx.redirect('/login');
    }

    if (!db.checkUser({ email, password })) {
      ctx.flash('loginStatus', 'Неверный email и/или пароль');

      ctx.response.status = 400;
      return ctx.redirect('/login');
    }

    db.authUser({ email, password });

    ctx.flash('loginStatus', 'Вы успешно авторизированы!');

    ctx.response.status = 200;
    return ctx.redirect('/login');
  });

  router.post('/admin/skills', async (ctx, next) => {
    const { age, concerts, cities, years } = ctx.request.body;

    if (!age || !concerts || !cities || !years) {
      ctx.flash('skillsStatus', 'Пожалуйста, заполните все поля.');

      ctx.response.status = 400;
      return ctx.redirect('/admin');
    }

    db.updateSkills({ age, concerts, cities, years });

    ctx.flash('skillsStatus', 'Счётчики обновлены!');
    ctx.response.status = 200;
    return ctx.redirect('/admin');
  });

  router.post('/admin/upload', async (ctx, next) => {
    const { name, price } = ctx.request.body;
    const { photo } = ctx.request.files;

    if (!photo || !name || !price) {
      ctx.flash('uploadStatus', 'Пожалуйста, заполните все поля.');

      ctx.response.status = 400;  
      return ctx.redirect('/admin');
    }

    db.addProduct({ 
      src: `${PRODUCTS_IMG_PATH}/${path.basename(photo.path)}`,
      name, 
      price
    });
    
    ctx.flash('uploadStatus', 'Продукт успешно сохранён!');

    ctx.response.status = 200;
    return ctx.redirect('/admin');
  });
};

module.exports = {
  registerPOSTHandlers
};
