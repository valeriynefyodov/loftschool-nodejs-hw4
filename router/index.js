const Router = require('koa-router');
const { registerGETHandlers } = require('./GETHandlers');
const { registerPOSTHandlers } = require('./POSTHandlers');

const router = new Router();

registerGETHandlers(router);
registerPOSTHandlers(router);

module.exports = router;