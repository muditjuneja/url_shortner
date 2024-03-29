module.exports = function (app) {
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // // error handler
    app.use(function (err, req, res, next) {
        // console.log('Here in error handler');
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        return res.send(err);
        // res.render('../../views/error');
    });
}