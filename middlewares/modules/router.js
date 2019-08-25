module.exports = function (app) {
    // Loading different routers.
    const urlRouter = require('../../app/routes');
    app.use('/', urlRouter.url);

    // app.use('/', (req, res, next) => {
    //     return res.json({
    //         success: 1
    //     });
    // });
}