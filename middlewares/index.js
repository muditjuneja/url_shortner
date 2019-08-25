const beforeRouter = require('./modules/beforeRouter');
const router = require('./modules/router');
const afterRouter = require('./modules/afterRouter');

// console.log(permissions);

module.exports = {
    beforeRouter,
    router,
    afterRouter,
}