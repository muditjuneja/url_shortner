module.exports = function (permission) {
    // console.log('In the authorization middleware');

    return function (req, res, next) {
        let permissions = req.permissions;
        // console.log(req.permissions, permission);
        if (permissions) {
            let index = permissions.indexOf(permission);
            if (index > -1) {
                next();
            } else {
                let isAdmin = true ? permissions.indexOf('*') > -1 : false;
                // console.log(permissions.indexOf('*'));
                if (!isAdmin) {
                    return res.json(403, {
                        message: 'Not enough permission to access the service.'
                    });
                } else {
                    next();
                }
            }
        } else {
            return res.json(403, {
                message: 'Not enough permission to access the service.'
            });
        }
    }
}