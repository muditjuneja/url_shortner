module.exports = {
    "development": {
        "datastore": {
            "username": "root",
            "password": "root",
            "host": "localhost",
            "port": "8889",
            "dialect": "mysql",
            "database": "url_shortner",
            "timezone": "+05:30",
            "define": {
                "underscored": true,
                "timestamps": true,
                "freezeTableName": true
            }
        }
    },

    "production": {
        "datastore": {
            "username": process.env.db_user,
            "password": process.env.db_pass,
            "host": process.env.db_host,
            "port": "3306",
            "dialect": "mysql",
            "database": process.env.db,
            "timezone": "+05:30",
            "define": {
                "underscored": true,
                "timestamps": true,
                "freezeTableName": true
            }
        }
    }

}